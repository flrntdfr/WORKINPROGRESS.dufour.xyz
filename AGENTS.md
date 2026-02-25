# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Jekyll 4.4.1 static site (personal portfolio) using Nix flake for reproducible dev environment. See `Makefile` for build/serve targets and `flake.nix` for toolchain versions.

### Nix dev shell

All build commands must run inside `nix develop`. Since Cloud Agent shells are non-interactive, use:

```
LOCALE_ARCHIVE=/usr/lib/locale/locale-archive nix develop --command bash -c "<command>"
```

The `LOCALE_ARCHIVE` env var is required because the Nix-provided bash cannot find system locales otherwise, which causes Jekyll to fail on Unicode file paths (e.g. `été-2017/`).

### Build and serve

```bash
# Build only (skip prebuild — playlists.json is already committed):
nix develop --command bash -c "export LC_ALL=en_US.UTF-8 LOCALE_ARCHIVE=/usr/lib/locale/locale-archive; bundle exec jekyll build --trace"

# Serve with live reload:
nix develop --command bash -c "export LC_ALL=en_US.UTF-8 LOCALE_ARCHIVE=/usr/lib/locale/locale-archive; bundle exec jekyll serve --trace --livereload"
```

The prebuild step (`make prebuild`) fetches Apple Music playlists and requires `APPLE_MUSIC_TOKEN` / `MUSIC_USER_TOKEN` env vars. Since `_data/playlists.json` (40 MB) is already committed, skip the prebuild for local dev by invoking `bundle exec jekyll build` or `bundle exec jekyll serve` directly instead of `make build` or `make serve`.

### Locale gotcha

The `en_US.UTF-8` locale must be generated on the system (`sudo locale-gen en_US.UTF-8`). Without it, Jekyll fails to resolve Liquid `{% link %}` tags that reference assets with Unicode paths.

### No lint or automated test suite

This codebase has no linter config or test suite. Validation is done by building the site successfully (`jekyll build`) and manual browser testing.
