import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../_data');
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

// Configuration
const API_HOST = 'https://api.music.apple.com';
const API_BASE = '/v1';
const ENDPOINT = '/me/library/playlists'; // Fetching from user's library
const LIMIT = 100; // Max limit per request

async function fetchPlaylists() {
  let allPlaylists = [];
  let nextUrl = `${API_HOST}${API_BASE}${ENDPOINT}?limit=${LIMIT}`;

  console.log('Starting playlist fetch...');

  while (nextUrl) {
    console.log(`Fetching: ${nextUrl}`);
    
    const headers = {
      'Authorization': `Bearer ${APPLE_MUSIC_TOKEN}`,
      'Music-User-Token': MUSIC_USER_TOKEN
    };

    try {
      const response = await fetch(nextUrl, { headers });

      if (!response.ok) {
        throw new Error(`API Error ${response.status}: ${response.statusText} - ${await response.text()}`);
      }

      const data = await response.json();
      
      if (data.data) {
        allPlaylists = allPlaylists.concat(data.data);
      }

      // Check for next page
      if (data.next) {
        // data.next is usually a path like /v1/me/library/playlists?offset=...
        if (data.next.startsWith('http')) {
            nextUrl = data.next;
        } else {
            nextUrl = API_HOST + data.next;
        }
      } else {
        nextUrl = null;
      }

    } catch (error) {
      console.error('Failed to fetch playlists:', error);
      process.exit(1);
    }
  }

  console.log(`Fetched ${allPlaylists.length} playlists.`);
  return allPlaylists;
}

function processPlaylists(playlists) {
  return playlists.map(p => ({
    id: p.id,
    name: p.attributes.name,
    description: p.attributes.description ? p.attributes.description.standard : null,
    url: p.attributes.url,
    artwork: p.attributes.artwork ? p.attributes.artwork.url.replace('{w}', '600').replace('{h}', '600') : null,
    lastModified: p.attributes.lastModifiedDate
  }));
}

async function main() {
  try {
    const rawPlaylists = await fetchPlaylists();
    const processed = processPlaylists(rawPlaylists);

    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(processed, null, 2));
    
    console.log(`Successfully wrote ${processed.length} playlists to ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('Script failed:', error);
    process.exit(1);
  }
}

main();

