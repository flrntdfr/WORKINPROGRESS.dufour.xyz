class ECViewer {
  constructor(data) {
    this.playlists = data || [];
    this.totalPlaylistCount = this.playlists.length;
    this.currentPlaylist = null;
    this.currentTrack = null; /* Track selected in table view */
    this.currentPlayingTrack = null; /* Track playing in player (independent) */
    this.selectedPlaylistIndex = -1;
    this.selectedTrackIndex = -1;
    this.filterPlaylistTerm = '';
    this.filterTrackTerm = '';
    this.filteredPlaylists = [];
    this.filteredTracks = [];
    this.filterMode = 'and';
  
    /* Dual audio players for crossfading */
  this.audioPlayer = new Audio();
  this.audioPlayer.crossOrigin = 'anonymous'; /* Enable CORS for Web Audio API */
  this.audioPlayer.muted = true; /* Muted by default */
  this.audioPlayer.volume = 1.0; /* Full volume */
  
  this.audioPlayer2 = new Audio();
  this.audioPlayer2.crossOrigin = 'anonymous';
  this.audioPlayer2.muted = true;
  this.audioPlayer2.volume = 0; /* Start silent for crossfade */
  
  this.currentlyPlayingTrackIndex = -1;
    this.isPlaying = false;
    this.radioMode = true; /* Radio mode: auto-play random tracks */
    this.manualOverride = false; /* User manually loaded a track */
    
  /* Crossfade state */
  this.activePlayer = this.audioPlayer; /* Which player is currently playing */
  this.nextPlayer = this.audioPlayer2; /* Which player will be next */
  this.isCrossfading = false;
  this.crossfadeDuration = 3; /* 3 seconds overlap */
  this.nextTrackQueued = null; /* Track queued for crossfade */
    
  /* Web Audio API for VU meters */
  this.audioContext = null;
  this.analyser = null;
  this.mediaSource = null; /* Store the MediaElementSource for player 1 */
  this.mediaSource2 = null; /* Store the MediaElementSource for player 2 */
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
    
    /* Set initial goto button state (disabled until track loads) */
    this.updateGotoButtonState();
    
    /* DON'T setup Web Audio yet - wait for user interaction (unmute button) */
    /* This is required for Safari and some browsers' autoplay policies */
    
    /* Start radio mode: select random track and auto-play (muted) */
    if (this.playlists.length > 0) {
      console.log('DJ-DIGGER Viewer: Starting radio mode...');
      this.selectRandomTrack();
      
      /* Auto-play after track is loaded into player (muted) */
      setTimeout(() => {
        if (this.currentPlayingTrack && this.currentPlayingTrack.previewUrl) {
          console.log('DJ-DIGGER Viewer: Initializing track in radio mode (muted)...');
          this.playCurrentTrack();
        }
      }, 800);
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
    
    /* Update UI - Highlight all instances */
    const playlistElements = document.querySelectorAll(`.ec-playlist-row[data-playlist-id="${playlistId}"]`);
    playlistElements.forEach(el => {
      el.classList.add('selected');
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    
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
    
    /* Display metadata - table view selection only shows metadata */
    this.displayMetadata(track);
    this.updateStructure(track);
  }
  
  displayMetadata(track) {
    const metadataContainer = document.getElementById('track-metadata');
    
    /* Construct Apple Music URL if missing */
    let trackUrl = track.url;
    if (!trackUrl && track.playParams && track.playParams.catalogId) {
      trackUrl = `https://music.apple.com/song/${track.playParams.catalogId}`;
    }
    
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
          <div class="ec-metadata-title-row">
            ${track.previewUrl ? `
            <button id="metadata-play-btn" class="ec-metadata-play-btn" title="Play this track (override radio)">
              <i class="fas fa-play"></i>
            </button>
            ` : ''}
            <div class="ec-metadata-value large">${this.escapeHtml(track.title)}</div>
          </div>
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
        
        ${trackUrl ? `
        <a href="${trackUrl}" target="_blank" class="ec-metadata-link">
          Open in Apple Music
        </a>
        ` : ''}
        
        ${this.currentPlaylist && this.currentPlaylist.url ? `
        <div class="ec-metadata-section">
          <div class="ec-metadata-label">Playlist</div>
          <a href="${this.currentPlaylist.url}" target="_blank" class="ec-metadata-link">
            Open Playlist in Apple Music
          </a>
        </div>
        ` : ''}
      </div>
    `;
    
    metadataContainer.innerHTML = metadataHTML;
    
    /* Attach play button handler */
    const playBtn = document.getElementById('metadata-play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        this.loadSelectedTrack();
      });
    }
  }

  updateStructure(track) {
    const structureList = document.getElementById('structure-list');
    if (!structureList) return;
    
    if (!track) {
      structureList.innerHTML = '<div class="ec-empty-state">Select a track</div>';
      return;
    }
    
    /* Find all playlists containing this track */
    const containingPlaylists = this.playlists.filter(playlist => {
      if (!playlist.tracks) return false;
      return playlist.tracks.some(t => 
        t.title === track.title && 
        t.artist === track.artist
      );
    });
    
    if (containingPlaylists.length === 0) {
      structureList.innerHTML = '<div class="ec-empty-state">No playlists found</div>';
      return;
    }
    
    /* Sort playlists by name */
    containingPlaylists.sort((a, b) => a.name.localeCompare(b.name));
    
    /* Build HTML - Match Column 1 Style */
    const rowsHtml = containingPlaylists.map(playlist => {
      const isCurrentPlaylist = this.currentPlaylist && this.currentPlaylist.id === playlist.id;
      
      const artworkHtml = (playlist.artwork && playlist.artwork.small) ? 
        `<img src="${playlist.artwork.small}" alt="${this.escapeHtml(playlist.name)}" class="ec-playlist-thumb" loading="lazy">` :
        `<div class="ec-playlist-thumb ec-no-artwork"></div>`;

      return `
        <tr class="ec-playlist-row ${isCurrentPlaylist ? 'selected' : ''}" 
            data-playlist-id="${playlist.id}" 
            data-playlist-name="${this.escapeHtml(playlist.name).toLowerCase()}"
            data-track-count="${playlist.trackCount}">
          <td class="ec-thumb-cell">
            ${artworkHtml}
          </td>
          <td class="ec-info-cell">
            <div class="ec-playlist-name">${this.escapeHtml(playlist.name)}</div>
            <div class="ec-playlist-meta">${playlist.description ? this.escapeHtml(playlist.description) + ' ' : ''}(${playlist.trackCount} tracks)</div>
          </td>
        </tr>
      `;
    }).join('');
    
    structureList.innerHTML = `
      <table class="ec-table">
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;
    
    /* Attach click handlers */
    structureList.querySelectorAll('.ec-playlist-row').forEach(row => {
      row.addEventListener('click', () => {
        const playlistId = row.dataset.playlistId;
        this.selectPlaylistById(playlistId);
      });
    });
  }

  clearStructure() {
    const structureList = document.getElementById('structure-list');
    if (structureList) {
      structureList.innerHTML = '<div class="ec-empty-state">Nothing to show</div>';
    }
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
          this.filterPlaylists();
          this.filterTracks();
        }, 200);
      });
    }

    /* Filter Mode Radio Buttons */
    const filterModes = document.querySelectorAll('input[name="filter-mode"]');
    filterModes.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.filterMode = e.target.value;
          this.filterPlaylists();
        }
      });
    });
  }
  
  filterPlaylists() {
    const playlistRows = document.querySelectorAll('.ec-playlist-row');
    this.filteredPlaylists = [];
    
    playlistRows.forEach(row => {
      const playlistName = row.dataset.playlistName;
      const playlistId = row.dataset.playlistId;
      const playlist = this.playlists.find(p => p.id === playlistId);
      
      let matches = false;
      
      const pTerm = this.filterPlaylistTerm;
      const tTerm = this.filterTrackTerm;
      
      const pMatches = playlistName.includes(pTerm);
      let tMatches = false;
      if (playlist.tracks) {
        tMatches = playlist.tracks.some(track => 
          track.title.toLowerCase().includes(tTerm) ||
          track.artist.toLowerCase().includes(tTerm) ||
          (track.album && track.album.toLowerCase().includes(tTerm))
        );
      }
      
      if (this.filterMode === 'or') {
        if (pTerm === '' && tTerm === '') {
          matches = true;
        } else {
          const m1 = pTerm !== '' && pMatches;
          const m2 = tTerm !== '' && tMatches;
          matches = m1 || m2;
        }
      } else {
        /* AND mode */
        const m1 = pTerm === '' || pMatches;
        const m2 = tTerm === '' || tMatches;
        matches = m1 && m2;
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
    metadataContainer.innerHTML = '<div class="ec-empty-state">Nothing to show</div>';
    this.clearStructure();
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
    if (this.currentlyPlayingTrackIndex === trackIndex && !this.activePlayer.paused) {
      this.activePlayer.pause();
      this.currentlyPlayingTrackIndex = -1;
      this.updatePreviewButtons();
      return;
    }
    
    /* Play the new track */
    this.activePlayer.src = track.previewUrl;
    if (!this.activePlayer.muted) {
      this.activePlayer.play();
    }
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
    const gotoBtn = document.getElementById('player-goto');
    
    /* Mute button */
    muteBtn.addEventListener('click', () => {
      this.toggleMute();
    });
    
    /* Next button - skip to next random track in radio mode */
    nextBtn.addEventListener('click', () => {
      this.radioMode = true;
      this.manualOverride = false;
      this.selectRandomTrack();
      setTimeout(() => {
        this.playCurrentTrack();
      }, 100);
    });
    
    /* Go to button - navigate table to show currently playing track */
    if (gotoBtn) {
      gotoBtn.addEventListener('click', () => {
        this.navigateToPlayingTrack();
      });
    }
    
    /* Audio player event listeners for both players */
    const setupPlayerListeners = (player) => {
      player.addEventListener('ended', () => {
        /* Only handle 'ended' if it's the active player and not crossfading */
        if (player === this.activePlayer && !this.isCrossfading) {
          if (this.manualOverride) {
            /* Manual track ended - return to radio mode */
            console.log('DJ-DIGGER Viewer: Manual track ended, returning to radio mode...');
            this.radioMode = true;
            this.manualOverride = false;
          }
          
          /* Radio mode: auto-advance to next random track */
          if (this.radioMode) {
            this.selectRandomTrack();
            setTimeout(() => {
              this.playCurrentTrack();
            }, 100);
          }
        }
      });
      
      player.addEventListener('play', () => {
        if (player === this.activePlayer) {
          this.isPlaying = true;
        }
      });
      
      player.addEventListener('pause', () => {
        if (player === this.activePlayer) {
          this.isPlaying = false;
        }
      });
      
      /* Timeupdate - trigger crossfade 3 seconds before end */
      player.addEventListener('timeupdate', () => {
        if (player === this.activePlayer && !this.isCrossfading && this.radioMode) {
          const timeRemaining = player.duration - player.currentTime;
          if (timeRemaining > 0 && timeRemaining <= this.crossfadeDuration) {
            /* Time to start crossfade */
            this.startCrossfade();
          }
        }
      });
      
      /* Detect CORS errors */
      player.addEventListener('error', (e) => {
        console.error('DJ-DIGGER Viewer: Audio error:', e);
        console.error('DJ-DIGGER Viewer: Error details:', {
          error: player.error,
          code: player.error ? player.error.code : 'unknown',
          message: player.error ? player.error.message : 'unknown',
          src: player.src
        });
        if (player.error && player.error.code === 4) {
          console.error('DJ-DIGGER Viewer: MEDIA_ERR_SRC_NOT_SUPPORTED - Possible CORS issue!');
        }
      });
    };
    
    /* Setup listeners for both players */
    setupPlayerListeners(this.audioPlayer);
    setupPlayerListeners(this.audioPlayer2);
    
    /* Setup Web Audio API for VU meters */
    this.setupWebAudio();
  }
  
  setupWebAudio() {
    try {
      console.log('DJ-DIGGER Viewer: Setting up Web Audio...');
      /* Create audio context if it doesn't exist */
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        console.log('DJ-DIGGER Viewer: Audio context created, state:', this.audioContext.state);
      } else {
        console.log('DJ-DIGGER Viewer: Audio context already exists, state:', this.audioContext.state);
      }
      
      /* Resume context if suspended */
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume().then(() => {
          console.log('DJ-DIGGER Viewer: Audio context resumed during setup, new state:', this.audioContext.state);
        });
      }
      
      /* Only create analyser if it doesn't exist */
      if (!this.analyser) {
        console.log('DJ-DIGGER Viewer: Creating analyser...');
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 512;
        this.analyser.smoothingTimeConstant = 0; /* NO smoothing for instant 60fps response */
        
        const bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
        console.log('DJ-DIGGER Viewer: Analyser created', {
          fftSize: this.analyser.fftSize,
          bufferLength,
          dataArrayLength: this.dataArray.length
        });
      }
      
      /* Create MediaElementSource for both players - can only be done once per audio element */
      if (!this.mediaSource) {
        try {
          console.log('DJ-DIGGER Viewer: Creating MediaElementSource for Player 1...');
          this.mediaSource = this.audioContext.createMediaElementSource(this.audioPlayer);
          console.log('DJ-DIGGER Viewer: Connecting Player 1: source → analyser → destination');
          this.mediaSource.connect(this.analyser);
          this.analyser.connect(this.audioContext.destination);
          console.log('DJ-DIGGER Viewer: Player 1 connected successfully');
        } catch (sourceError) {
          if (sourceError.name === 'InvalidStateError') {
            console.error('DJ-DIGGER Viewer: MediaElementSource 1 already exists but we lost the reference!');
          } else {
            console.error('DJ-DIGGER Viewer: Failed to create MediaElementSource 1:', sourceError);
          }
          throw sourceError;
        }
      }
      
      if (!this.mediaSource2) {
        try {
          console.log('DJ-DIGGER Viewer: Creating MediaElementSource for Player 2...');
          this.mediaSource2 = this.audioContext.createMediaElementSource(this.audioPlayer2);
          console.log('DJ-DIGGER Viewer: Connecting Player 2: source → analyser → destination');
          this.mediaSource2.connect(this.analyser);
          console.log('DJ-DIGGER Viewer: Player 2 connected successfully');
          console.log('DJ-DIGGER Viewer: Both players connected to Web Audio API');
          console.log('DJ-DIGGER Viewer: Audio routing: Both AudioElements → Analyser → AudioContext.destination');
          
          /* IMPORTANT: Once MediaElementSource is created, audio ONLY flows through Web Audio graph */
          console.warn('DJ-DIGGER Viewer: Audio elements output now routes through Web Audio API only');
        } catch (sourceError) {
          if (sourceError.name === 'InvalidStateError') {
            console.error('DJ-DIGGER Viewer: MediaElementSource 2 already exists but we lost the reference!');
          } else {
            console.error('DJ-DIGGER Viewer: Failed to create MediaElementSource 2:', sourceError);
          }
          throw sourceError;
        }
      } else {
        console.log('DJ-DIGGER Viewer: Both MediaElementSources already exist');
      }
    } catch (e) {
      console.error('DJ-DIGGER Viewer: Web Audio API setup error:', e);
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
        /* VU meters work even when muted - analyser still captures audio data */
        /* Check active player (or either player during crossfade) */
        const hasAudioData = (!this.activePlayer.paused || (this.isCrossfading && !this.nextPlayer.paused)) && 
                             this.activePlayer.readyState >= 2 && 
                             this.analyser && 
                             this.dataArray;
        
        /* Log VU meter state periodically (every 60 frames ~1 second) */
        if (!this._vuLogCounter) this._vuLogCounter = 0;
        this._vuLogCounter++;
        
        if (hasAudioData) {
          /* Use real audio data when playing (works whether muted or not) - 60FPS ULTRA FAST MODE! */
          this.analyser.getByteFrequencyData(this.dataArray);
          
          /* Calculate overall energy across all frequencies */
          const avg = this.calculateAverage(this.dataArray, 0, this.dataArray.length);
          const max = this.calculateMax(this.dataArray, 0, this.dataArray.length);
          
          /* Check if we're actually getting audio data (CORS can block this) */
          if (max === 0) {
            /* No audio data - likely CORS blocking analyser - use simulated meters */
            if (this._vuLogCounter % 60 === 0) {
              console.warn('DJ-DIGGER Viewer: No frequency data (likely CORS) - using simulated VU meters');
            }
            /* Fall back to simulated animation */
            const time = Date.now() / 100;
            const fastPulse = Math.sin(time * 2) * Math.cos(time * 3) * 0.2 + 0.8;
            const microNoise = Math.random() * 0.1;
            level = (fastPulse + microNoise) * 100;
          } else {
            /* We have real audio data! */
            if (this._vuLogCounter % 60 === 0) {
              console.log('DJ-DIGGER Viewer: VU Meter - Using Real Audio Data:', {
                avg: avg.toFixed(2),
                max: max.toFixed(2),
                nonZeroSamples: this.dataArray.filter(v => v > 0).length
              });
            }
            
            /* Balanced calculation with good dynamic range - favor peaks more */
            const raw = (avg * 0.2 + max * 0.8) / 255; /* Mix of average and peak - more peak emphasis */
            
            /* Minimal compression for more linear response - allow meters to reach higher */
            level = Math.pow(raw, 0.95) * 100; /* Scale to max 100% with minimal compression */
            
            /* Add subtle variations for lively feel */
            level += (Math.random() - 0.5) * 2;
            
            /* Boost on loud peaks - more aggressive threshold */
            if (max > 175) {
              level = Math.min(level * 1.05, 100);
            }
            
            /* Low minimum for good dynamics */
            level = Math.max(level, 2);
          }
          
        } else {
          /* Simulate ultra-fast pulsing when track is selected but not playing */
          const time = Date.now() / 100; /* Faster time scale */
          const fastPulse = Math.sin(time * 2) * Math.cos(time * 3) * 0.2 + 0.8;
          const microNoise = Math.random() * 0.1; /* Add noise for 60fps feel */
          level = (fastPulse + microNoise) * 100;
          
          /* Debug: log why we're using simulated data */
          if (this._vuLogCounter % 60 === 0) {
            console.log('DJ-DIGGER Viewer: VU Meter - Using Simulated Data (no audio):', {
              paused: this.activePlayer.paused,
              readyState: this.activePlayer.readyState,
              hasAnalyser: !!this.analyser,
              hasDataArray: !!this.dataArray,
              isCrossfading: this.isCrossfading,
              audioContextState: this.audioContext ? this.audioContext.state : 'null'
            });
          }
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
    
    console.log(`DJ-DIGGER Viewer: Radio mode - Random track selected: "${selected.track.title}" by ${selected.track.artist} from ${selected.playlist.name}`);
    
    /* Load track into player WITHOUT selecting in table (radio is independent) */
    this.loadTrackIntoPlayer(selected.track);
  }
  
  loadTrackIntoPlayer(track) {
    /* Update the currently playing track reference */
    this.currentPlayingTrack = track;
    
    /* Update player info display */
    this.updatePlayerInfo();
    
    /* Update goto button state */
    this.updateGotoButtonState();
    
    /* Start VU meters animation */
    this.startVUMeters();
  }
  
  loadSelectedTrack() {
    if (!this.currentTrack || !this.currentTrack.previewUrl) {
      console.warn('DJ-DIGGER Viewer: No track selected or no preview URL available');
      return;
    }
    
    console.log(`DJ-DIGGER Viewer: Manual override - Loading track: "${this.currentTrack.title}" by ${this.currentTrack.artist}`);
    
    /* Switch to manual override mode */
    this.manualOverride = true;
    this.radioMode = false;
    
    /* Load track into player */
    this.loadTrackIntoPlayer(this.currentTrack);
    
    /* Play the selected track */
    this.playCurrentTrack();
  }
  
  navigateToPlayingTrack() {
    if (!this.currentPlayingTrack) {
      console.warn('DJ-DIGGER Viewer: No track currently playing');
      return;
    }
    
    /* Find which playlist and track index contains the playing track */
    let foundPlaylist = null;
    let foundTrackIndex = -1;
    
    for (const playlist of this.playlists) {
      if (playlist.tracks && playlist.tracks.length > 0) {
        const trackIndex = playlist.tracks.findIndex(track => 
          track.title === this.currentPlayingTrack.title && 
          track.artist === this.currentPlayingTrack.artist
        );
        
        if (trackIndex !== -1) {
          foundPlaylist = playlist;
          foundTrackIndex = trackIndex;
          break;
        }
      }
    }
    
    if (foundPlaylist && foundTrackIndex !== -1) {
      console.log(`DJ-DIGGER Viewer: Navigating to playing track: "${this.currentPlayingTrack.title}" in ${foundPlaylist.name}`);
      
      /* Navigate to the playlist and track */
      this.selectPlaylistById(foundPlaylist.id, false);
      setTimeout(() => {
        this.selectTrack(foundTrackIndex);
      }, 150);
    } else {
      console.warn('DJ-DIGGER Viewer: Could not find playing track in playlists');
    }
  }
  
  updateGotoButtonState() {
    const gotoBtn = document.getElementById('player-goto');
    if (!gotoBtn) return;
    
    /* Enable button only if there's a track playing */
    if (this.currentPlayingTrack) {
      gotoBtn.disabled = false;
    } else {
      gotoBtn.disabled = true;
    }
  }
  
  playCurrentTrack() {
    /* Player plays what's loaded, not what's selected in table */
    if (!this.currentPlayingTrack || !this.currentPlayingTrack.previewUrl) {
      console.warn('DJ-DIGGER Viewer: No preview URL available for current playing track');
      return;
    }
    
    console.log('DJ-DIGGER Viewer: playCurrentTrack called', {
      currentPlayingTrack: this.currentPlayingTrack.title,
      currentSrc: this.activePlayer.src,
      targetSrc: this.currentPlayingTrack.previewUrl,
      paused: this.activePlayer.paused,
      muted: this.activePlayer.muted
    });
    
    /* Ensure Web Audio is set up FIRST */
    if (!this.analyser) {
      this.setupWebAudio();
    }
    
    /* Resume audio context if suspended (browser autoplay policy) */
    const resumePromise = this.audioContext && this.audioContext.state === 'suspended'
      ? this.audioContext.resume().then(() => {
          console.log('DJ-DIGGER Viewer: Audio context resumed');
        }).catch(err => {
          console.warn('DJ-DIGGER Viewer: Failed to resume audio context:', err);
        })
      : Promise.resolve();
    
    resumePromise.then(() => {
      /* ALWAYS set the source if it's different or empty - this ensures source is never lost */
      const needsNewSource = !this.activePlayer.src || 
                             this.activePlayer.src !== this.currentPlayingTrack.previewUrl ||
                             this.activePlayer.readyState === 0;
      
      if (needsNewSource) {
        console.log('DJ-DIGGER Viewer: Setting audio source:', this.currentPlayingTrack.previewUrl);
        this.activePlayer.src = this.currentPlayingTrack.previewUrl;
        this.activePlayer.volume = 1.0; /* Ensure full volume for active player */
        
        /* Wait for track to load before playing */
        const onLoadedData = () => {
          console.log('DJ-DIGGER Viewer: Track loaded, readyState:', this.activePlayer.readyState);
          
          if (this.activePlayer.muted) {
            console.log('DJ-DIGGER Viewer: Player is muted - staying paused');
            this.isPlaying = false;
            return;
          }

          this.activePlayer.play().then(() => {
            console.log('DJ-DIGGER Viewer: Playback started successfully after load');
            this.isPlaying = true;
          }).catch(err => {
            console.warn('DJ-DIGGER Viewer: Playback failed after load:', err);
            this.isPlaying = false;
          });
        };
        
        /* Remove any existing listeners to avoid duplicates */
        this.activePlayer.removeEventListener('loadeddata', onLoadedData);
        this.activePlayer.addEventListener('loadeddata', onLoadedData, { once: true });
        
        /* Also try to play if already loaded */
        if (this.activePlayer.readyState >= 2) {
          console.log('DJ-DIGGER Viewer: Track already loaded, attempting playback');
          
          if (this.activePlayer.muted) {
            console.log('DJ-DIGGER Viewer: Player is muted - staying paused');
            this.isPlaying = false;
          } else {
            this.activePlayer.play().then(() => {
              console.log('DJ-DIGGER Viewer: Playback started successfully (already loaded)');
              this.isPlaying = true;
            }).catch(err => {
              console.warn('DJ-DIGGER Viewer: Playback failed (already loaded):', err);
              this.isPlaying = false;
            });
          }
        }
      } else {
        /* Track already loaded with correct source, play immediately */
        console.log('DJ-DIGGER Viewer: Track already loaded, attempting playback');
        
        if (this.activePlayer.muted) {
          console.log('DJ-DIGGER Viewer: Player is muted - staying paused');
          this.isPlaying = false;
        } else {
          this.activePlayer.play().then(() => {
            console.log('DJ-DIGGER Viewer: Playback started successfully');
            this.isPlaying = true;
          }).catch(err => {
            console.warn('DJ-DIGGER Viewer: Playback failed:', err);
            this.isPlaying = false;
          });
        }
      }
    });
  }
  
  startCrossfade() {
    if (this.isCrossfading) {
      console.log('DJ-DIGGER Viewer: Already crossfading, skipping');
      return;
    }
    
    console.log('DJ-DIGGER Viewer: Starting crossfade...');
    this.isCrossfading = true;
    
    /* Select next random track */
    this.selectRandomTrack();
    
    if (!this.currentPlayingTrack || !this.currentPlayingTrack.previewUrl) {
      console.warn('DJ-DIGGER Viewer: No track to crossfade to');
      this.isCrossfading = false;
      return;
    }
    
    /* Load next track into the inactive player */
    const fadeOutPlayer = this.activePlayer;
    const fadeInPlayer = this.nextPlayer;
    
    console.log(`DJ-DIGGER Viewer: Crossfade - Fading out: ${fadeOutPlayer === this.audioPlayer ? 'Player 1' : 'Player 2'}`);
    console.log(`DJ-DIGGER Viewer: Crossfade - Fading in: ${fadeInPlayer === this.audioPlayer ? 'Player 1' : 'Player 2'}`);
    console.log(`DJ-DIGGER Viewer: Next track: "${this.currentPlayingTrack.title}" by ${this.currentPlayingTrack.artist}`);
    
    /* Prepare next player - ensure it's ready for crossfade */
    fadeInPlayer.src = this.currentPlayingTrack.previewUrl;
    fadeInPlayer.volume = 0; /* Start silent */
    fadeInPlayer.muted = fadeOutPlayer.muted; /* Match mute state */
    
    /* CRITICAL: If fadeOutPlayer is unmuted, ensure fadeInPlayer is also unmuted */
    /* This handles the case where fadeInPlayer was previously muted when paused */
    if (!fadeOutPlayer.muted && fadeInPlayer.muted) {
      console.warn('DJ-DIGGER Viewer: FadeIn player was muted, unmuting now');
      fadeInPlayer.muted = false;
    }
    
    console.log('DJ-DIGGER Viewer: FadeIn player prepared:', {
      src: fadeInPlayer.src,
      volume: fadeInPlayer.volume,
      muted: fadeInPlayer.muted,
      readyState: fadeInPlayer.readyState
    });
    
    /* Start playing next track once loaded */
    const onLoaded = () => {
      if (fadeInPlayer.muted) {
        console.log('DJ-DIGGER Viewer: Next track is muted - staying paused');
        return;
      }

      fadeInPlayer.play().then(() => {
        console.log('DJ-DIGGER Viewer: Next track started, beginning fade...');
        console.log('DJ-DIGGER Viewer: Initial state - FadeOut:', {
          volume: fadeOutPlayer.volume,
          muted: fadeOutPlayer.muted
        });
        console.log('DJ-DIGGER Viewer: Initial state - FadeIn:', {
          volume: fadeInPlayer.volume,
          muted: fadeInPlayer.muted
        });
        
        /* Crossfade over 3 seconds */
        const steps = 60; /* 60 steps for smooth fade */
        const interval = (this.crossfadeDuration * 1000) / steps;
        let step = 0;
        
        const fadeInterval = setInterval(() => {
          step++;
          const progress = step / steps;
          
          /* Fade out current, fade in next */
          fadeOutPlayer.volume = Math.max(0, 1 - progress);
          fadeInPlayer.volume = Math.min(1, progress);
          
          /* Log progress every 15 steps */
          if (step % 15 === 0) {
            console.log(`DJ-DIGGER Viewer: Crossfade progress ${Math.round(progress * 100)}% - Out: ${fadeOutPlayer.volume.toFixed(2)}, In: ${fadeInPlayer.volume.toFixed(2)}`);
          }
          
          if (step >= steps) {
            clearInterval(fadeInterval);
            
            /* Crossfade complete - swap players */
            console.log('DJ-DIGGER Viewer: Crossfade complete - Final volumes:', {
              fadeOutVolume: fadeOutPlayer.volume,
              fadeInVolume: fadeInPlayer.volume
            });
            
            fadeOutPlayer.pause();
            fadeOutPlayer.volume = 0;
            fadeOutPlayer.src = '';
            fadeInPlayer.volume = 1.0;
            
            /* Swap active/next player references */
            this.activePlayer = fadeInPlayer;
            this.nextPlayer = fadeOutPlayer;
            
            this.isCrossfading = false;
            console.log('DJ-DIGGER Viewer: Players swapped - new active:', fadeInPlayer === this.audioPlayer ? 'Player 1' : 'Player 2');
            
            /* Update UI */
            this.updatePlayerInfo();
            this.updateGotoButtonState();
          }
        }, interval);
      }).catch(err => {
        console.error('DJ-DIGGER Viewer: Failed to start next track for crossfade:', err);
        console.error('DJ-DIGGER Viewer: Error details:', err);
        this.isCrossfading = false;
      });
    };
    
    /* Add timeout fallback in case loadeddata never fires */
    const loadTimeout = setTimeout(() => {
      if (fadeInPlayer.readyState >= 2) {
        console.log('DJ-DIGGER Viewer: Track already loaded, starting immediately');
        onLoaded();
      } else {
        console.warn('DJ-DIGGER Viewer: Track load timeout - attempting to play anyway');
        onLoaded();
      }
    }, 2000);
    
    fadeInPlayer.addEventListener('loadeddata', () => {
      clearTimeout(loadTimeout);
      onLoaded();
    }, { once: true });
  }
  
  toggleMute() {
    if (this.audioPlayer.muted) {
      /* Unmuting - start playback (user interaction allows autoplay) */
      console.log('DJ-DIGGER Viewer: Unmuting...');
      console.log('DJ-DIGGER Viewer: Audio player state:', {
        paused: this.activePlayer.paused,
        muted: this.activePlayer.muted,
        readyState: this.activePlayer.readyState,
        src: this.activePlayer.src,
        currentTime: this.activePlayer.currentTime,
        duration: this.activePlayer.duration,
        isPlaying: this.isPlaying
      });
      console.log('DJ-DIGGER Viewer: Audio context state:', this.audioContext ? {
        state: this.audioContext.state,
        sampleRate: this.audioContext.sampleRate
      } : 'null');
      
      /* Ensure Web Audio is set up before unmuting */
      if (!this.analyser) {
        console.log('DJ-DIGGER Viewer: Setting up Web Audio (analyser missing)');
        this.setupWebAudio();
      }
      
      /* Resume audio context FIRST (browser autoplay policy - user interaction allows this) */
      const resumePromise = this.audioContext && this.audioContext.state === 'suspended' 
        ? this.audioContext.resume().then(() => {
            console.log('DJ-DIGGER Viewer: Audio context resumed, new state:', this.audioContext.state);
          }).catch(err => {
            console.warn('DJ-DIGGER Viewer: Failed to resume audio context:', err);
          })
        : Promise.resolve();
      
      resumePromise.then(() => {
        /* Unmute both audio players */
        this.audioPlayer.muted = false;
        this.audioPlayer2.muted = false;
        console.log('DJ-DIGGER Viewer: Audio unmuted, new state:', {
          muted: this.activePlayer.muted,
          paused: this.activePlayer.paused,
          volume: this.activePlayer.volume,
          readyState: this.activePlayer.readyState,
          currentTime: this.activePlayer.currentTime,
          duration: this.activePlayer.duration,
          src: this.activePlayer.src ? 'set' : 'empty'
        });
        
        /* Always ensure audio is playing after unmute */
        if (this.currentPlayingTrack && this.currentPlayingTrack.previewUrl) {
          /* Force playback to start if paused */
          if (this.activePlayer.paused) {
            console.log('DJ-DIGGER Viewer: Audio is paused, starting playback...');
            this.activePlayer.play().then(() => {
              console.log('DJ-DIGGER Viewer: Playback started successfully after unmute');
              this.isPlaying = true;
            }).catch(err => {
              console.error('DJ-DIGGER Viewer: Failed to start playback:', err);
              /* Try to reload the track */
              console.log('DJ-DIGGER Viewer: Attempting to reload track...');
              this.playCurrentTrack();
            });
          } else {
            console.log('DJ-DIGGER Viewer: Audio already playing');
            this.isPlaying = true;
          }
        } else {
          console.warn('DJ-DIGGER Viewer: No current track to play - selecting random track');
          /* If no track is loaded, select and play one */
          this.selectRandomTrack();
          setTimeout(() => {
            this.playCurrentTrack();
          }, 100);
        }
        
        this.updateMuteUI();
      });
    } else {
      /* Muting - pause playback on both players */
      this.audioPlayer.muted = true;
      this.audioPlayer2.muted = true;
      this.activePlayer.pause();
      this.nextPlayer.pause();
      this.isPlaying = false;
      console.log('DJ-DIGGER Viewer: Muted and paused');
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
    
    /* Use currentPlayingTrack instead of currentTrack - player is independent */
    const trackToDisplay = this.currentPlayingTrack;
    
    if (trackToDisplay) {
      /* Set title with scrolling support */
      this.setScrollingText(titleEl, trackToDisplay.title || '—');
      
      /* Set artist with scrolling support */
      this.setScrollingText(artistEl, trackToDisplay.artist || '—');
      
      /* Update artwork */
      if (trackToDisplay.artwork && trackToDisplay.artwork.small) {
        artworkEl.style.backgroundImage = `url(${trackToDisplay.artwork.small})`;
        artworkEl.classList.add('has-artwork');
        
        /* Add click handler for lightbox */
        artworkEl.onclick = () => {
          const largeArtwork = trackToDisplay.artwork.large || trackToDisplay.artwork.small;
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
    console.log(`DJ-DIGGER Viewer initialized with ${window.ecPlaylistData.length} playlists`);
  }
}
