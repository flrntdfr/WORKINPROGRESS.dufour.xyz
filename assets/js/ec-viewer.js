/* 
 * EC* Viewer - 3-Column Interactive Browser
 * With keyboard navigation and real-time filtering
 */

class ECViewer {
  constructor(data) {
    this.playlists = data || [];
    this.totalPlaylistCount = this.playlists.length;
    this.currentPlaylist = null;
    this.currentTrack = null;
    this.selectedPlaylistIndex = -1;
    this.selectedTrackIndex = -1;
    this.filterPlaylistTerm = '';
    this.filterTrackTerm = '';
    this.filteredPlaylists = [];
    this.filteredTracks = [];
    this.audioPlayer = new Audio();
    this.audioPlayer.muted = true; /* Muted by default */
    this.currentlyPlayingTrackIndex = -1;
    this.isPlaying = false;
    this.autoAdvanceTimer = null;
    this.autoAdvanceInterval = 30000; /* 30 seconds */
    
    /* Web Audio API for VU meters */
    this.audioContext = null;
    this.analyser = null;
    this.dataArray = null;
    this.animationFrame = null;
    
    if (this.playlists.length > 0) {
      this.init();
    }
  }
  
  init() {
    this.filteredPlaylists = [...this.playlists];
    this.updatePlaylistCounter();
    this.attachEventListeners();
    this.setupKeyboardNavigation();
    this.setupFilter();
    this.setupPlayer();
    this.setupArtworkLightbox();
    
    /* Set initial muted UI state */
    this.updateMuteUI();
    
    /* Select random track on page load */
    console.log('EC* Viewer: Initializing with random track selection...');
    if (this.playlists.length > 0) {
      this.selectRandomTrack();
      
      /* Auto-play after track is selected (muted) */
      setTimeout(() => {
        if (this.currentTrack && this.currentTrack.previewUrl) {
          console.log('EC* Viewer: Auto-playing track (muted)...');
          this.playCurrentTrack();
        }
      }, 800);
      
      /* Start 30-second auto-advance timer */
      this.startAutoAdvance();
    }
  }
  
  attachEventListeners() {
    /* Playlist clicks */
    document.querySelectorAll('.ec-playlist-row').forEach((row, index) => {
      row.addEventListener('click', () => {
        const playlistId = row.dataset.playlistId;
        const playlist = this.playlists.find(p => p.id === playlistId);
        if (playlist) {
          this.selectPlaylistById(playlistId);
        }
      });
    });
  }
  
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      /* Check if user is typing in filter */
      if (e.target.id === 'filter-playlists' || e.target.id === 'filter-tracks') {
        return;
      }
      
      switch(e.key) {
        case 'ArrowUp':
          e.preventDefault();
          this.navigateUp();
          break;
        case 'ArrowDown':
          e.preventDefault();
          this.navigateDown();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this.navigateLeft();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.navigateRight();
          break;
        case 'Enter':
          e.preventDefault();
          this.activateSelected();
          break;
        case 'Tab':
          e.preventDefault();
          if (e.shiftKey) {
            this.navigateLeft();
          } else {
            this.navigateRight();
          }
          break;
      }
    });
  }
  
  navigateUp() {
    if (this.selectedTrackIndex > 0) {
      /* Navigate within tracks */
      this.selectTrack(this.selectedTrackIndex - 1);
    } else if (this.selectedPlaylistIndex > 0) {
      /* Navigate to previous playlist */
      this.selectPlaylist(this.selectedPlaylistIndex - 1);
    }
  }
  
  navigateDown() {
    if (this.currentPlaylist && this.currentPlaylist.tracks && this.selectedTrackIndex < this.currentPlaylist.tracks.length - 1) {
      /* Navigate within tracks */
      this.selectTrack(this.selectedTrackIndex + 1);
    } else if (this.selectedPlaylistIndex < this.filteredPlaylists.length - 1) {
      /* Navigate to next playlist */
      this.selectPlaylist(this.selectedPlaylistIndex + 1);
    }
  }
  
  navigateLeft() {
    /* Focus on playlists column */
    if (this.selectedPlaylistIndex >= 0) {
      this.focusColumn('playlists');
    }
  }
  
  navigateRight() {
    /* Focus on tracks column if playlist is selected */
    if (this.currentPlaylist && this.currentPlaylist.tracks && this.currentPlaylist.tracks.length > 0) {
      this.focusColumn('tracks');
      if (this.selectedTrackIndex < 0) {
        this.selectTrack(0);
      }
    }
  }
  
  activateSelected() {
    /* Open in Apple Music if available */
    if (this.currentTrack && this.currentTrack.url) {
      window.open(this.currentTrack.url, '_blank');
    } else if (this.currentPlaylist && this.currentPlaylist.url) {
      window.open(this.currentPlaylist.url, '_blank');
    }
  }
  
  focusColumn(column) {
    /* Visual feedback for which column is focused */
    /* This could be enhanced with additional UI indicators */
  }
  
  selectPlaylist(index) {
    if (index < 0 || index >= this.filteredPlaylists.length) return;
    
    this.selectedPlaylistIndex = index;
    const playlist = this.filteredPlaylists[index];
    this.selectPlaylistById(playlist.id);
  }
  
  selectPlaylistById(playlistId, autoSelectFirstTrack = true) {
    /* Clear previous selection */
    document.querySelectorAll('.ec-playlist-row').forEach(row => {
      row.classList.remove('selected');
    });
    
    /* Find and select new playlist */
    const playlist = this.playlists.find(p => p.id === playlistId);
    if (!playlist) return;
    
    this.currentPlaylist = playlist;
    this.selectedPlaylistIndex = this.filteredPlaylists.findIndex(p => p.id === playlistId);
    
    /* Update UI */
    const playlistElement = document.querySelector(`.ec-playlist-row[data-playlist-id="${playlistId}"]`);
    if (playlistElement) {
      playlistElement.classList.add('selected');
      playlistElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    /* Load tracks */
    this.loadTracks(playlist);
    
    /* Select first track by default (unless explicitly disabled) */
    if (autoSelectFirstTrack && playlist.tracks && playlist.tracks.length > 0) {
      setTimeout(() => this.selectTrack(0), 100);
    }
  }
  
  loadTracks(playlist) {
    const tracksList = document.getElementById('tracks-list');
    const trackCounter = document.getElementById('track-counter');
    
    if (!playlist.tracks || playlist.tracks.length === 0) {
      tracksList.innerHTML = '<div class="ec-empty-state">No tracks found</div>';
      trackCounter.textContent = '0';
      return;
    }
    
    trackCounter.textContent = playlist.tracks.length;
    
    /* Build tracks table HTML */
    const tracksRows = playlist.tracks.map((track, index) => {
      const artwork = track.artwork && track.artwork.small ? 
        `<img src="${track.artwork.small}" alt="${this.escapeHtml(track.title)}" class="ec-track-thumb" loading="lazy">` :
        '<div class="ec-track-thumb ec-no-artwork"></div>';
      
      return `
        <tr class="ec-track-row" data-track-index="${index}">
          <td class="ec-track-num-cell">${index + 1}</td>
          <td class="ec-track-thumb-cell">${artwork}</td>
          <td class="ec-track-info-cell">
            <div class="ec-track-title">${this.escapeHtml(track.title)}</div>
            <div class="ec-track-artist">${this.escapeHtml(track.artist)}</div>
          </td>
          <td class="ec-track-duration-cell">${this.formatDuration(track.duration)}</td>
        </tr>
      `;
    }).join('');
    
    tracksList.innerHTML = `
      <table class="ec-table">
        <tbody>
          ${tracksRows}
        </tbody>
      </table>
    `;
    
    /* Attach click handlers to tracks */
    document.querySelectorAll('.ec-track-row').forEach((row, index) => {
      row.addEventListener('click', () => {
          this.selectTrack(index);
      });
    });
    
    /* Apply track filter if active */
    if (this.filterTrackTerm) {
      this.filterTracks();
    }
    
    /* Update preview button states when audio ends */
    this.audioPlayer.addEventListener('ended', () => {
      this.updatePreviewButtons();
    });
  }
  
  selectTrack(index) {
    if (!this.currentPlaylist || !this.currentPlaylist.tracks || index < 0 || index >= this.currentPlaylist.tracks.length) {
      return;
    }
    
    this.selectedTrackIndex = index;
    const track = this.currentPlaylist.tracks[index];
    this.currentTrack = track;
    
    /* Clear previous selection */
    document.querySelectorAll('.ec-track-row').forEach(row => {
      row.classList.remove('selected');
    });
    
    /* Select new track */
    const trackElement = document.querySelector(`.ec-track-row[data-track-index="${index}"]`);
    if (trackElement) {
      trackElement.classList.add('selected');
      trackElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    /* Display metadata */
    this.displayMetadata(track);
    
    /* Update player info */
    this.updatePlayerInfo();
    
    /* Start VU meters animation */
    this.startVUMeters();
  }
  
  displayMetadata(track) {
    const metadataContainer = document.getElementById('track-metadata');
    
    const hasArtwork = track.artwork && track.artwork.large;
    const artwork = hasArtwork ? 
      `<img src="${track.artwork.large}" alt="${this.escapeHtml(track.title)}" class="ec-metadata-artwork" onclick="window.ecViewer.openLightbox('${track.artwork.large}')">` :
      '<div class="ec-metadata-artwork no-artwork">♪</div>';
    
    const badges = [];
    if (track.explicit) {
      badges.push('<span class="ec-badge explicit">Explicit</span>');
    }
    if (track.hasLyrics) {
      badges.push('<span class="ec-badge lyrics">Lyrics</span>');
    }
    
    const metadataHTML = `
      <div class="ec-metadata-content">
        ${artwork}
        
        <div class="ec-metadata-section">
          <div class="ec-metadata-label">Title</div>
          <div class="ec-metadata-value large">${this.escapeHtml(track.title)}</div>
          ${badges.length > 0 ? `<div class="ec-metadata-badges">${badges.join('')}</div>` : ''}
        </div>
        
        <div class="ec-metadata-section">
          <div class="ec-metadata-label">Artist</div>
          <div class="ec-metadata-value">${this.escapeHtml(track.artist)}</div>
        </div>
        
        ${track.album ? `
        <div class="ec-metadata-section">
          <div class="ec-metadata-label">Album</div>
          <div class="ec-metadata-value">${this.escapeHtml(track.album)}</div>
        </div>
        ` : ''}
        
        ${track.duration ? `
        <div class="ec-metadata-section">
          <div class="ec-metadata-label">Duration</div>
          <div class="ec-metadata-value">${this.formatDuration(track.duration)}</div>
        </div>
        ` : ''}
        
        ${track.releaseDate ? `
        <div class="ec-metadata-section">
          <div class="ec-metadata-label">Release Date</div>
          <div class="ec-metadata-value">${this.formatDate(track.releaseDate)}</div>
        </div>
        ` : ''}
        
        ${track.genres && track.genres.length > 0 ? `
        <div class="ec-metadata-section">
          <div class="ec-metadata-label">Genres</div>
          <div class="ec-metadata-value">${this.escapeHtml(track.genres.join(', '))}</div>
        </div>
        ` : ''}
        
        ${track.isrc ? `
        <div class="ec-metadata-section">
          <div class="ec-metadata-label">ISRC</div>
          <div class="ec-metadata-value">${this.escapeHtml(track.isrc)}</div>
        </div>
        ` : ''}
        
        ${track.url ? `
        <a href="${track.url}" target="_blank" class="ec-metadata-link">
          Open in Apple Music →
        </a>
        ` : ''}
      </div>
    `;
    
    metadataContainer.innerHTML = metadataHTML;
  }
  
  setupFilter() {
    /* Playlist filter */
    const playlistFilterInput = document.getElementById('filter-playlists');
    if (playlistFilterInput) {
      let debounceTimer;
      playlistFilterInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          this.filterPlaylistTerm = e.target.value.toLowerCase().trim();
          this.filterPlaylists();
        }, 200);
      });
    }
    
    /* Track filter */
    const trackFilterInput = document.getElementById('filter-tracks');
    if (trackFilterInput) {
    let debounceTimer;
      trackFilterInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
          this.filterTrackTerm = e.target.value.toLowerCase().trim();
          this.filterTracks();
      }, 200);
    });
    }
  }
  
  filterPlaylists() {
    const playlistRows = document.querySelectorAll('.ec-playlist-row');
    this.filteredPlaylists = [];
    
    playlistRows.forEach(row => {
      const playlistName = row.dataset.playlistName;
      const playlistId = row.dataset.playlistId;
      const playlist = this.playlists.find(p => p.id === playlistId);
      
      let matches = false;
      
      /* Filter by playlist name only */
      if (this.filterPlaylistTerm === '' || playlistName.includes(this.filterPlaylistTerm)) {
        matches = true;
      }
      
      if (matches) {
        row.style.display = '';
        this.filteredPlaylists.push(playlist);
      } else {
        row.style.display = 'none';
      }
    });
    
    this.updatePlaylistCounter();
    
    /* If current selection is filtered out, select first visible */
    if (this.currentPlaylist && !this.filteredPlaylists.find(p => p.id === this.currentPlaylist.id)) {
      if (this.filteredPlaylists.length > 0) {
        this.selectPlaylist(0);
      } else {
        this.clearTracks();
        this.clearMetadata();
      }
    }
  }
  
  filterTracks() {
    if (!this.currentPlaylist || !this.currentPlaylist.tracks) {
      return;
    }
    
    const trackRows = document.querySelectorAll('.ec-track-row');
    this.filteredTracks = [];
    
    trackRows.forEach(row => {
      const trackIndex = parseInt(row.dataset.trackIndex);
      const track = this.currentPlaylist.tracks[trackIndex];
      
      if (!track) return;
      
      let matches = false;
      
      /* Filter by track title, artist, or album */
      if (this.filterTrackTerm === '' ||
          track.title.toLowerCase().includes(this.filterTrackTerm) ||
          track.artist.toLowerCase().includes(this.filterTrackTerm) ||
          (track.album && track.album.toLowerCase().includes(this.filterTrackTerm))) {
        matches = true;
      }
      
      if (matches) {
        row.style.display = '';
        this.filteredTracks.push(track);
      } else {
        row.style.display = 'none';
      }
    });
  }
  
  updatePlaylistCounter() {
    const counter = document.getElementById('playlist-counter');
    if (counter) {
      counter.textContent = this.filteredPlaylists.length;
    }
  }
  
  clearTracks() {
    const tracksList = document.getElementById('tracks-list');
    tracksList.innerHTML = '<div class="ec-empty-state">Select a playlist</div>';
    
    const trackCounter = document.getElementById('track-counter');
    trackCounter.textContent = '0';
  }
  
  clearMetadata() {
    const metadataContainer = document.getElementById('track-metadata');
    metadataContainer.innerHTML = '<div class="ec-empty-state">Select a track</div>';
  }
  
  formatDuration(ms) {
    if (!ms) return '—';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  
  formatDate(dateString) {
    if (!dateString) return '—';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
      return dateString;
    }
  }
  
  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  togglePreview(trackIndex) {
    if (!this.currentPlaylist || !this.currentPlaylist.tracks) return;
    
    const track = this.currentPlaylist.tracks[trackIndex];
    if (!track || !track.previewUrl) return;
    
    /* If clicking the same track that's playing, pause it */
    if (this.currentlyPlayingTrackIndex === trackIndex && !this.audioPlayer.paused) {
      this.audioPlayer.pause();
      this.currentlyPlayingTrackIndex = -1;
      this.updatePreviewButtons();
      return;
    }
    
    /* Play the new track */
    this.audioPlayer.src = track.previewUrl;
    this.audioPlayer.play();
    this.currentlyPlayingTrackIndex = trackIndex;
    this.updatePreviewButtons();
  }
  
  updatePreviewButtons() {
    /* Preview buttons removed - function kept for compatibility */
  }
  
  /* Player Methods */
  setupPlayer() {
    const muteBtn = document.getElementById('player-mute');
    const nextBtn = document.getElementById('player-next');
    
    /* Mute button */
    muteBtn.addEventListener('click', () => {
      this.toggleMute();
    });
    
    /* Next button - select random track */
    nextBtn.addEventListener('click', () => {
      this.selectRandomTrack();
      setTimeout(() => {
        this.playCurrentTrack();
      }, 100);
    });
    
    /* Audio player event listeners */
    this.audioPlayer.addEventListener('ended', () => {
      /* Auto-advance to next random track */
      this.selectRandomTrack();
      setTimeout(() => {
        this.playCurrentTrack();
      }, 100);
    });
    
    this.audioPlayer.addEventListener('play', () => {
      this.isPlaying = true;
    });
    
    this.audioPlayer.addEventListener('pause', () => {
      this.isPlaying = false;
    });
    
    /* Setup Web Audio API for VU meters */
    this.setupWebAudio();
  }
  
  setupWebAudio() {
    try {
      console.log('EC* Viewer: Setting up Web Audio...');
      /* Create audio context if it doesn't exist */
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        console.log('EC* Viewer: Audio context created, state:', this.audioContext.state);
      } else {
        console.log('EC* Viewer: Audio context already exists, state:', this.audioContext.state);
      }
      
      /* Resume context if suspended */
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume().then(() => {
          console.log('EC* Viewer: Audio context resumed during setup, new state:', this.audioContext.state);
        });
      }
      
      /* Only create analyser if it doesn't exist */
      if (!this.analyser) {
        console.log('EC* Viewer: Creating analyser...');
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 512;
        this.analyser.smoothingTimeConstant = 0; /* NO smoothing for instant 60fps response */
        
        /* Create MediaElementSource - can only be done once per audio element */
        /* Check if source already exists by checking a flag or trying to create it */
        if (!this.audioPlayer._mediaSourceCreated) {
          try {
            console.log('EC* Viewer: Creating MediaElementSource...');
            const source = this.audioContext.createMediaElementSource(this.audioPlayer);
            console.log('EC* Viewer: MediaElementSource created, connecting...');
            source.connect(this.analyser);
            this.analyser.connect(this.audioContext.destination);
            this.audioPlayer._mediaSourceCreated = true;
            console.log('EC* Viewer: Web Audio API connected successfully', {
              sourceConnected: true,
              analyserInputs: this.analyser.numberOfInputs,
              analyserOutputs: this.analyser.numberOfOutputs
            });
          } catch (sourceError) {
            /* Source might already exist - this is OK, just log it */
            if (sourceError.name === 'InvalidStateError') {
              console.warn('EC* Viewer: MediaElementSource already exists, reusing analyser');
              this.audioPlayer._mediaSourceCreated = true;
              /* Try to connect analyser directly if source exists */
              this.analyser.connect(this.audioContext.destination);
              console.log('EC* Viewer: Analyser connected directly', {
                analyserInputs: this.analyser.numberOfInputs,
                analyserOutputs: this.analyser.numberOfOutputs
              });
            } else {
              console.error('EC* Viewer: Failed to create MediaElementSource:', sourceError);
              throw sourceError;
            }
          }
        } else {
          console.log('EC* Viewer: MediaElementSource already created, reusing');
          /* Ensure analyser is connected */
          if (this.analyser.numberOfOutputs === 0) {
            console.log('EC* Viewer: Reconnecting analyser to destination...');
            this.analyser.connect(this.audioContext.destination);
          }
          console.log('EC* Viewer: Analyser connection state', {
            analyserInputs: this.analyser.numberOfInputs,
            analyserOutputs: this.analyser.numberOfOutputs
          });
        }
        
        const bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
        console.log('EC* Viewer: Web Audio setup complete', {
          bufferLength,
          dataArrayLength: this.dataArray.length
        });
      } else {
        console.log('EC* Viewer: Analyser already exists, skipping setup');
      }
    } catch (e) {
      console.error('EC* Viewer: Web Audio API setup error:', e);
    }
  }
  
  startVUMeters() {
    /* Stop any existing animation */
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    
    const updateVU = () => {
      let level;
      
      try {
        /* Check if audio is actually playing and we have analyser data */
        /* Note: We check muted separately - VU meters can work even when muted */
        const hasAudioData = !this.audioPlayer.paused && 
                             this.audioPlayer.readyState >= 2 && 
                             this.analyser && 
                             this.dataArray;
        
        /* Log VU meter state periodically (every 60 frames ~1 second) */
        if (!this._vuLogCounter) this._vuLogCounter = 0;
        this._vuLogCounter++;
        if (this._vuLogCounter % 60 === 0) {
          console.log('EC* Viewer: VU Meter state:', {
            hasAudioData,
            paused: this.audioPlayer.paused,
            muted: this.audioPlayer.muted,
            readyState: this.audioPlayer.readyState,
            hasAnalyser: !!this.analyser,
            hasDataArray: !!this.dataArray,
            audioContextState: this.audioContext ? this.audioContext.state : 'null'
          });
        }
        
        if (hasAudioData && !this.audioPlayer.muted) {
          /* Use real audio data when playing - 60FPS ULTRA FAST MODE! */
          this.analyser.getByteFrequencyData(this.dataArray);
          
          /* Calculate overall energy across all frequencies */
          const avg = this.calculateAverage(this.dataArray, 0, this.dataArray.length);
          const max = this.calculateMax(this.dataArray, 0, this.dataArray.length);
          
          /* Ultra-aggressive for instant response */
          const raw = (avg * 0.1 + max * 0.9) / 255; /* 90% peak for instant jumps */
          
          /* Extreme amplification for 60fps style fast pulses */
          level = Math.pow(raw, 0.3) * 160; /* Even more amplified */
          
          /* Add random micro-variations for ultra-fast pulse effect */
          level += (Math.random() - 0.5) * 10;
          
          /* Boost aggressively */
          if (max > 80) {
            level = Math.min(level * 1.5, 100);
          }
          
          /* High minimum for constant energy */
          level = Math.max(level, 75);
          
        } else {
          /* Simulate ultra-fast pulsing when track is selected but not playing */
          const time = Date.now() / 100; /* Faster time scale */
          const fastPulse = Math.sin(time * 2) * Math.cos(time * 3) * 0.2 + 0.8;
          const microNoise = Math.random() * 0.1; /* Add noise for 60fps feel */
          level = (fastPulse + microNoise) * 100;
        }
        
        /* Apply same level to both meters - NO CLAMPING for ultra-fast changes */
        const height = `${Math.max(0, Math.min(100, level))}%`;
        const leftMeter = document.getElementById('vu-meter-left');
        const rightMeter = document.getElementById('vu-meter-right');
        
        if (leftMeter) leftMeter.style.height = height;
        if (rightMeter) rightMeter.style.height = height;
      } catch (e) {
        console.warn('VU meter update error:', e);
        /* Fallback to simulated animation on error */
        const time = Date.now() / 100;
        const fastPulse = Math.sin(time * 2) * Math.cos(time * 3) * 0.2 + 0.8;
        const microNoise = Math.random() * 0.1;
        level = (fastPulse + microNoise) * 100;
        const height = `${Math.max(0, Math.min(100, level))}%`;
        const leftMeter = document.getElementById('vu-meter-left');
        const rightMeter = document.getElementById('vu-meter-right');
        if (leftMeter) leftMeter.style.height = height;
        if (rightMeter) rightMeter.style.height = height;
      }
      
      /* Always continue animation */
      this.animationFrame = requestAnimationFrame(updateVU);
    };
    
    updateVU();
  }
  
  stopVUMeters() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    
    /* Reset VU meters */
    const leftMeter = document.getElementById('vu-meter-left');
    const rightMeter = document.getElementById('vu-meter-right');
    if (leftMeter) leftMeter.style.height = '0%';
    if (rightMeter) rightMeter.style.height = '0%';
  }
  
  calculateAverage(array, start, end) {
    let sum = 0;
    for (let i = start; i < end; i++) {
      sum += array[i];
    }
    return sum / (end - start);
  }
  
  calculateMax(array, start, end) {
    let max = 0;
    for (let i = start; i < end; i++) {
      if (array[i] > max) {
        max = array[i];
      }
    }
    return max;
  }
  
  selectRandomTrack() {
    /* Get all tracks from all playlists that have preview URLs */
    const allTracks = [];
    this.playlists.forEach(playlist => {
      if (playlist.tracks && playlist.tracks.length > 0) {
        playlist.tracks.forEach((track, trackIndex) => {
          if (track.previewUrl) {
            allTracks.push({
              playlist: playlist,
              track: track,
              playlistIndex: this.playlists.indexOf(playlist),
              trackIndex: trackIndex
            });
          }
        });
      }
    });
    
    if (allTracks.length === 0) {
      console.warn('No tracks with preview URLs found');
      return;
    }
    
    /* Select random track */
    const randomIndex = Math.floor(Math.random() * allTracks.length);
    const selected = allTracks[randomIndex];
    
    console.log(`Random track selected: "${selected.track.title}" by ${selected.track.artist} from ${selected.playlist.name}`);
    
    /* Select the playlist and track in the UI */
    this.selectPlaylistById(selected.playlist.id, false); /* Don't auto-select first track */
    setTimeout(() => {
      this.selectTrack(selected.trackIndex);
    }, 150);
  }
  
  playCurrentTrack() {
    if (!this.currentTrack || !this.currentTrack.previewUrl) {
      console.warn('EC* Viewer: No preview URL available for current track');
      return;
    }
    
    console.log('EC* Viewer: playCurrentTrack called', {
      currentTrack: this.currentTrack.title,
      currentSrc: this.audioPlayer.src,
      targetSrc: this.currentTrack.previewUrl,
      paused: this.audioPlayer.paused,
      muted: this.audioPlayer.muted
    });
    
    /* Ensure Web Audio is set up FIRST */
    if (!this.analyser) {
      this.setupWebAudio();
    }
    
    /* Resume audio context if suspended (browser autoplay policy) */
    const resumePromise = this.audioContext && this.audioContext.state === 'suspended'
      ? this.audioContext.resume().then(() => {
          console.log('EC* Viewer: Audio context resumed');
        }).catch(err => {
          console.warn('EC* Viewer: Failed to resume audio context:', err);
        })
      : Promise.resolve();
    
    resumePromise.then(() => {
      /* ALWAYS set the source if it's different or empty - this ensures source is never lost */
      const needsNewSource = !this.audioPlayer.src || 
                             this.audioPlayer.src !== this.currentTrack.previewUrl ||
                             this.audioPlayer.readyState === 0;
      
      if (needsNewSource) {
        console.log('EC* Viewer: Setting audio source:', this.currentTrack.previewUrl);
        this.audioPlayer.src = this.currentTrack.previewUrl;
        
        /* Wait for track to load before playing */
        const onLoadedData = () => {
          console.log('EC* Viewer: Track loaded, readyState:', this.audioPlayer.readyState);
          this.audioPlayer.play().then(() => {
            console.log('EC* Viewer: Playback started successfully after load');
            this.isPlaying = true;
          }).catch(err => {
            console.warn('EC* Viewer: Playback failed after load:', err);
            this.isPlaying = false;
          });
        };
        
        /* Remove any existing listeners to avoid duplicates */
        this.audioPlayer.removeEventListener('loadeddata', onLoadedData);
        this.audioPlayer.addEventListener('loadeddata', onLoadedData, { once: true });
        
        /* Also try to play if already loaded */
        if (this.audioPlayer.readyState >= 2) {
          console.log('EC* Viewer: Track already loaded, playing immediately');
          this.audioPlayer.play().then(() => {
            console.log('EC* Viewer: Playback started successfully (already loaded)');
            this.isPlaying = true;
          }).catch(err => {
            console.warn('EC* Viewer: Playback failed (already loaded):', err);
            this.isPlaying = false;
          });
        }
      } else {
        /* Track already loaded with correct source, play immediately */
        console.log('EC* Viewer: Track already loaded, playing immediately');
        this.audioPlayer.play().then(() => {
          console.log('EC* Viewer: Playback started successfully');
          this.isPlaying = true;
        }).catch(err => {
          console.warn('EC* Viewer: Playback failed:', err);
          this.isPlaying = false;
        });
      }
    });
  }
  
  toggleMute() {
    if (this.audioPlayer.muted) {
      /* Unmuting - start playback */
      console.log('EC* Viewer: Unmuting...');
      console.log('EC* Viewer: Audio player state:', {
        paused: this.audioPlayer.paused,
        muted: this.audioPlayer.muted,
        readyState: this.audioPlayer.readyState,
        src: this.audioPlayer.src,
        currentTime: this.audioPlayer.currentTime,
        duration: this.audioPlayer.duration,
        isPlaying: this.isPlaying
      });
      console.log('EC* Viewer: Audio context state:', this.audioContext ? {
        state: this.audioContext.state,
        sampleRate: this.audioContext.sampleRate
      } : 'null');
      console.log('EC* Viewer: Analyser state:', this.analyser ? {
        exists: true,
        fftSize: this.analyser.fftSize,
        numberOfInputs: this.analyser.numberOfInputs,
        numberOfOutputs: this.analyser.numberOfOutputs
      } : 'null');
      
      /* Resume audio context FIRST (browser autoplay policy) */
      const resumePromise = this.audioContext && this.audioContext.state === 'suspended' 
        ? this.audioContext.resume().then(() => {
            console.log('EC* Viewer: Audio context resumed, new state:', this.audioContext.state);
          }).catch(err => {
            console.warn('EC* Viewer: Failed to resume audio context:', err);
          })
        : Promise.resolve();
      
      resumePromise.then(() => {
        /* Ensure Web Audio is set up */
        if (!this.analyser) {
          console.log('EC* Viewer: Setting up Web Audio (analyser missing)');
          this.setupWebAudio();
        }
        
        /* Unmute the audio */
        this.audioPlayer.muted = false;
        console.log('EC* Viewer: Audio unmuted, new state:', {
          muted: this.audioPlayer.muted,
          paused: this.audioPlayer.paused
        });
        
        /* Always ensure source is set and playing */
        if (this.currentTrack && this.currentTrack.previewUrl) {
          /* Check if source is missing or different */
          if (!this.audioPlayer.src || this.audioPlayer.src !== this.currentTrack.previewUrl) {
            console.log('EC* Viewer: Source missing or different, calling playCurrentTrack');
            this.playCurrentTrack();
          } else if (this.audioPlayer.paused || !this.isPlaying) {
            console.log('EC* Viewer: Starting playback after unmute (source already set)');
            this.audioPlayer.play().then(() => {
              console.log('EC* Viewer: Playback started successfully after unmute');
              this.isPlaying = true;
            }).catch(err => {
              console.warn('EC* Viewer: Failed to start playback after unmute:', err);
              /* If play fails, try playCurrentTrack which will reload the source */
              this.playCurrentTrack();
            });
          } else {
            /* Already playing, just unmute */
            console.log('EC* Viewer: Audio already playing, just unmuting');
            console.log('EC* Viewer: Verifying playback state:', {
              paused: this.audioPlayer.paused,
              readyState: this.audioPlayer.readyState,
              currentTime: this.audioPlayer.currentTime,
              src: this.audioPlayer.src
            });
            /* Ensure it's actually playing */
            if (this.audioPlayer.paused) {
              console.log('EC* Viewer: Audio was paused, resuming...');
              this.audioPlayer.play().then(() => {
                console.log('EC* Viewer: Playback resumed successfully');
                this.isPlaying = true;
              }).catch(err => {
                console.warn('EC* Viewer: Failed to resume playback:', err);
              });
            } else {
              console.log('EC* Viewer: Audio is not paused, should be playing');
            }
          }
        } else {
          console.warn('EC* Viewer: No current track to play');
        }
        
        this.updateMuteUI();
      });
    } else {
      /* Muting */
      this.audioPlayer.muted = true;
      console.log('EC* Viewer: Muted');
      this.updateMuteUI();
    }
  }
  
  updateMuteUI() {
    const muteBtn = document.getElementById('player-mute');
    if (!muteBtn) return;
    
    const icon = muteBtn.querySelector('i');
    if (!icon) return;
    
    if (this.audioPlayer.muted) {
      icon.className = 'fas fa-volume-mute';
      muteBtn.classList.add('muted');
    } else {
      icon.className = 'fas fa-volume-up';
      muteBtn.classList.remove('muted');
    }
  }
  
  updatePlayerInfo() {
    const titleEl = document.getElementById('player-title');
    const artistEl = document.getElementById('player-artist');
    const artworkEl = document.getElementById('player-artwork');
    
    if (this.currentTrack) {
      /* Set title with scrolling support */
      this.setScrollingText(titleEl, this.currentTrack.title || '—');
      
      /* Set artist with scrolling support */
      this.setScrollingText(artistEl, this.currentTrack.artist || '—');
      
      /* Update artwork */
      if (this.currentTrack.artwork && this.currentTrack.artwork.small) {
        artworkEl.style.backgroundImage = `url(${this.currentTrack.artwork.small})`;
        artworkEl.classList.add('has-artwork');
        
        /* Add click handler for lightbox */
        artworkEl.onclick = () => {
          const largeArtwork = this.currentTrack.artwork.large || this.currentTrack.artwork.small;
          this.openLightbox(largeArtwork);
        };
      } else {
        artworkEl.style.backgroundImage = '';
        artworkEl.classList.remove('has-artwork');
        artworkEl.onclick = null;
      }
    } else {
      this.setScrollingText(titleEl, '—');
      this.setScrollingText(artistEl, '—');
      artworkEl.style.backgroundImage = '';
      artworkEl.classList.remove('has-artwork');
      artworkEl.onclick = null;
    }
  }
  
  setScrollingText(element, text) {
    /* Clear previous content */
    element.innerHTML = '';
    element.classList.remove('scrolling');
    
    /* Create span wrapper for text */
    const span = document.createElement('span');
    span.textContent = text;
    element.appendChild(span);
    
    /* Check if text overflows and needs scrolling */
    setTimeout(() => {
      const containerWidth = element.offsetWidth;
      const textWidth = span.offsetWidth;
      
      if (textWidth > containerWidth) {
        element.classList.add('scrolling');
      }
    }, 100);
  }
  
  startAutoAdvance() {
    /* Clear existing timer */
    if (this.autoAdvanceTimer) {
      clearInterval(this.autoAdvanceTimer);
    }
    
    /* Set up 30-second auto-advance */
    this.autoAdvanceTimer = setInterval(() => {
      this.selectRandomTrack();
    }, this.autoAdvanceInterval);
  }
  
  stopAutoAdvance() {
    if (this.autoAdvanceTimer) {
      clearInterval(this.autoAdvanceTimer);
      this.autoAdvanceTimer = null;
    }
  }
  
  /* Artwork Lightbox */
  setupArtworkLightbox() {
    const lightbox = document.getElementById('artwork-lightbox');
    const lightboxImg = document.getElementById('artwork-lightbox-img');
    const overlay = document.querySelector('.artwork-lightbox-overlay');
    
    if (!lightbox || !lightboxImg || !overlay) return;
    
    /* Close lightbox when clicking overlay or image */
    overlay.addEventListener('click', () => this.closeLightbox());
    lightboxImg.addEventListener('click', () => this.closeLightbox());
    
    /* Close on ESC key */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        this.closeLightbox();
      }
    });
  }
  
  openLightbox(imageUrl) {
    const lightbox = document.getElementById('artwork-lightbox');
    const lightboxImg = document.getElementById('artwork-lightbox-img');
    
    if (!lightbox || !lightboxImg || !imageUrl) return;
    
    lightboxImg.src = imageUrl;
    lightbox.classList.add('active');
  }
  
  closeLightbox() {
    const lightbox = document.getElementById('artwork-lightbox');
    if (lightbox) {
      lightbox.classList.remove('active');
    }
  }
}

/* Initialize when DOM ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initECViewer);
} else {
  initECViewer();
}

function initECViewer() {
  if (window.ecPlaylistData) {
    window.ecViewer = new ECViewer(window.ecPlaylistData);
    console.log(`EC* Viewer initialized with ${window.ecPlaylistData.length} playlists`);
  }
}
