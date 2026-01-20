import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', '..', '_data');
const OUTPUT_FILE = path.join(DATA_DIR, 'playlists.json');

const APPLE_MUSIC_TOKEN = process.env.APPLE_MUSIC_TOKEN;
const MUSIC_USER_TOKEN = process.env.MUSIC_USER_TOKEN;

if (!APPLE_MUSIC_TOKEN) {
  console.error('Error: APPLE_MUSIC_TOKEN environment variable is not set.');
  process.exit(1);
}

if (!MUSIC_USER_TOKEN) {
  console.error('Error: MUSIC_USER_TOKEN environment variable is not set. Required for accessing user library.');
  process.exit(1);
}

/* Configuration */
const API_HOST = 'https://api.music.apple.com';
const API_BASE = '/v1';
const ENDPOINT = '/me/library/playlists';
const LIMIT = 100; /* Max limit per request */
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; /* 1 second */

/* Utility function for exponential backoff retry */
async function fetchWithRetry(url, options, retries = MAX_RETRIES, context = '') {
  const headers = {
    'Authorization': `Bearer ${APPLE_MUSIC_TOKEN}`,
    'Music-User-Token': MUSIC_USER_TOKEN,
    ...options?.headers
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, { ...options, headers });

      if (!response.ok) {
        const errorText = await response.text();
        
        /* Retry on server errors (5xx) or rate limiting (429) */
        if (response.status >= 500 || response.status === 429) {
          if (attempt < retries) {
            const delay = INITIAL_RETRY_DELAY * Math.pow(2, attempt - 1);
            const contextMsg = context ? ` [${context}]` : '';
            console.log(`  ⚠️  ${response.status === 429 ? 'Rate limit (429)' : `Server error ${response.status}`}${contextMsg}, retrying in ${delay}ms... (attempt ${attempt}/${retries})`);
            console.log(`     URL: ${url}`);
            await sleep(delay);
            continue;
          } else {
            const contextMsg = context ? ` while fetching ${context}` : '';
            throw new Error(`Rate limit exceeded${contextMsg} after ${retries} attempts`);
          }
        }
        
        throw new Error(`API Error ${response.status}: ${response.statusText} - ${errorText}`);
      }

      return await response.json();

    } catch (error) {
      if (attempt < retries && error.name === 'TypeError') {
        /* Network error, retry */
        const delay = INITIAL_RETRY_DELAY * Math.pow(2, attempt - 1);
        const contextMsg = context ? ` [${context}]` : '';
        console.log(`  ⚠️  Network error${contextMsg}, retrying in ${delay}ms... (attempt ${attempt}/${retries})`);
        await sleep(delay);
        continue;
      }
      throw error;
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchPlaylists() {
  let allPlaylists = [];
  let nextUrl = `${API_HOST}${API_BASE}${ENDPOINT}?limit=${LIMIT}`;

  console.log('📋 Starting playlist fetch...');

  while (nextUrl) {
    console.log(`  Fetching: ${nextUrl}`);

    try {
      const data = await fetchWithRetry(nextUrl, {}, MAX_RETRIES, 'playlists list');
      
      if (data.data) {
        allPlaylists = allPlaylists.concat(data.data);
      }

      /* Check for next page */
      if (data.next) {
        if (data.next.startsWith('http')) {
          nextUrl = data.next;
        } else {
          nextUrl = API_HOST + data.next;
        }
      } else {
        nextUrl = null;
      }

    } catch (error) {
      console.error('❌ Failed to fetch playlists:', error.message);
      process.exit(1);
    }
  }

  console.log(`✓ Fetched ${allPlaylists.length} playlists.\n`);
  return allPlaylists;
}

async function fetchPlaylistTracks(playlistId, playlistName) {
  let allTracks = [];
  let nextUrl = `${API_HOST}${API_BASE}/me/library/playlists/${playlistId}/tracks?limit=${LIMIT}`;

  console.log(`  🎵 Fetching tracks for: "${playlistName}"`);

  while (nextUrl) {
    try {
      const data = await fetchWithRetry(nextUrl, {}, MAX_RETRIES, `tracks for playlist "${playlistName}"`);
      
      if (data.data) {
        allTracks = allTracks.concat(data.data);
      }

      /* Check for next page */
      if (data.next) {
        if (data.next.startsWith('http')) {
          nextUrl = data.next;
        } else {
          nextUrl = API_HOST + data.next;
        }
      } else {
        nextUrl = null;
      }

    } catch (error) {
      console.error(`  ⚠️  Failed to fetch tracks for "${playlistName}":`, error.message);
      /* Return what we have so far instead of failing completely */
      return allTracks;
    }
  }

  console.log(`     → ${allTracks.length} tracks`);
  return allTracks;
}

async function fetchCatalogTrack(playParams, trackTitle, artistName) {
  /* Fetch catalog track using playParams to get preview URL */
  if (!playParams || !playParams.catalogId) {
    return null;
  }
  
  try {
    const catalogUrl = `${API_HOST}${API_BASE}/catalog/us/songs/${playParams.catalogId}`;
    const context = `catalog track "${trackTitle}" by ${artistName} (ID: ${playParams.catalogId})`;
    const data = await fetchWithRetry(catalogUrl, {}, MAX_RETRIES, context);
    
    if (data.data && data.data.length > 0) {
      const catalogTrack = data.data[0];
      const catalogAttrs = catalogTrack.attributes || {};
      
      /* Return preview URL from catalog track */
      return catalogAttrs.previews && catalogAttrs.previews.length > 0 
        ? catalogAttrs.previews[0].url 
        : null;
    }
  } catch (error) {
    /* Log specific errors but don't fail */
    if (error.message.includes('429')) {
      console.error(`     ⚠️  Rate limit hit for "${trackTitle}" by ${artistName}`);
    }
    return null;
  }
  
  return null;
}

function processTrack(track) {
  const attrs = track.attributes || {};
  
  /* Extract all available metadata */
  return {
    id: track.id,
    type: track.type, /* library-songs or songs */
    title: attrs.name || 'Unknown Track',
    artist: attrs.artistName || 'Unknown Artist',
    album: attrs.albumName || 'Unknown Album',
    duration: attrs.durationInMillis || null,
    trackNumber: attrs.trackNumber || null,
    discNumber: attrs.discNumber || null,
    releaseDate: attrs.releaseDate || null,
    genres: attrs.genreNames || [],
    composer: attrs.composerName || null,
    isrc: attrs.isrc || null,
    explicit: attrs.contentRating === 'explicit',
    hasLyrics: attrs.hasLyrics || false,
    playParams: attrs.playParams || null,
    url: attrs.url || null,
    /* 30-second preview URL - will be fetched from catalog */
    previewUrl: null, /* To be populated later */
    /* Artwork - provide multiple sizes */
    artwork: attrs.artwork ? {
      url: attrs.artwork.url,
      small: attrs.artwork.url.replace('{w}', '200').replace('{h}', '200'),
      medium: attrs.artwork.url.replace('{w}', '400').replace('{h}', '400'),
      large: attrs.artwork.url.replace('{w}', '600').replace('{h}', '600')
    } : null
  };
}

async function fetchPreviewsForTracks(tracks, playlistName) {
  /* Fetch catalog preview URLs for tracks in batches */
  console.log(`     → Fetching preview URLs for ${tracks.length} tracks...`);
  
  let successCount = 0;
  
  for (let i = 0; i < tracks.length; i++) {
    const track = tracks[i];
    
    if (track.playParams && track.playParams.catalogId) {
      try {
        const previewUrl = await fetchCatalogTrack(track.playParams, track.title, track.artist);
        if (previewUrl) {
          track.previewUrl = previewUrl;
          successCount++;
        }
        
        /* Small delay to avoid rate limiting */
        if (i < tracks.length - 1 && i % 10 === 0) {
          await sleep(50);
        }
      } catch (error) {
        /* Continue on error - already logged in fetchCatalogTrack */
      }
    }
  }
  
  console.log(`     → Found ${successCount} preview URLs for "${playlistName}"`);
  return tracks;
}

async function processPlaylists(playlists, tracksMap) {
  const processed = [];
  
  for (const p of playlists) {
    const attrs = p.attributes || {};
    const playlistName = attrs.name || 'Untitled Playlist';
    const rawTracks = tracksMap[p.id] || [];
    
    /* Process tracks */
    let tracks = rawTracks.map(processTrack);
    
    /* Fetch preview URLs for tracks with catalog IDs */
    if (tracks.length > 0) {
      tracks = await fetchPreviewsForTracks(tracks, playlistName);
    }
    
    processed.push({
      id: p.id,
      name: playlistName,
      description: attrs.description?.standard || null,
      url: attrs.url || null,
      canEdit: attrs.canEdit || false,
      isPublic: attrs.isPublic || false,
      hasCatalog: attrs.hasCatalog || false,
      /* Artwork with multiple sizes */
      artwork: attrs.artwork ? {
        url: attrs.artwork.url,
        small: attrs.artwork.url.replace('{w}', '200').replace('{h}', '200'),
        medium: attrs.artwork.url.replace('{w}', '400').replace('{h}', '400'),
        large: attrs.artwork.url.replace('{w}', '600').replace('{h}', '600')
      } : null,
      lastModified: attrs.lastModifiedDate || null,
      dateAdded: attrs.dateAdded || null,
      trackCount: tracks.length,
      tracks: tracks
    });
  }
  
  return processed;
}

async function main() {
  try {
    console.log('🎵 Apple Music Playlist Fetcher\n');
    console.log('═'.repeat(50));
    
    /* Step 1: Fetch all playlists */
    const rawPlaylists = await fetchPlaylists();
    
    if (rawPlaylists.length === 0) {
      console.log('⚠️  No playlists found. Exiting.');
      process.exit(0);
    }
    
    /* Step 2: Fetch tracks for each playlist */
    console.log('═'.repeat(50));
    console.log('🎵 Fetching tracks for each playlist...\n');
    
    const tracksMap = {};
    let totalTracks = 0;
    
    for (let i = 0; i < rawPlaylists.length; i++) {
      const playlist = rawPlaylists[i];
      const playlistName = playlist.attributes?.name || 'Untitled';
      
      console.log(`[${i + 1}/${rawPlaylists.length}]`);
      
      try {
        const tracks = await fetchPlaylistTracks(playlist.id, playlistName);
        tracksMap[playlist.id] = tracks;
        totalTracks += tracks.length;
        
        /* Small delay to avoid overwhelming the API */
        if (i < rawPlaylists.length - 1) {
          await sleep(100);
        }
      } catch (error) {
        console.error(`  ⚠️  Error fetching tracks for "${playlistName}":`, error.message);
        tracksMap[playlist.id] = [];
      }
    }
    
    /* Step 3: Process and format data (including fetching preview URLs) */
    console.log('\n' + '═'.repeat(50));
    console.log('📝 Processing data and fetching preview URLs...\n');
    
    const processed = await processPlaylists(rawPlaylists, tracksMap);
    
    /* Count tracks with previews */
    let totalPreviews = 0;
    processed.forEach(playlist => {
      playlist.tracks.forEach(track => {
        if (track.previewUrl) totalPreviews++;
      });
    });
    
    /* Step 4: Write to file */
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(processed, null, 2));
    
    /* Summary */
    console.log('\n' + '═'.repeat(50));
    console.log('✅ SUCCESS!\n');
    console.log(`📋 Playlists: ${processed.length}`);
    console.log(`🎵 Total tracks: ${totalTracks}`);
    console.log(`🎧 Preview URLs: ${totalPreviews} (${Math.round(totalPreviews/totalTracks*100)}%)`);
    console.log(`📁 Output: ${OUTPUT_FILE}`);
    console.log('═'.repeat(50));
    
  } catch (error) {
    console.error('\n❌ Script failed:', error.message);
    console.error('\nStack trace:', error.stack);
    process.exit(1);
  }
}

main();

