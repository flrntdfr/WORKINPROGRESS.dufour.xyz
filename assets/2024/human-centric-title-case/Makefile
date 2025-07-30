# RFC-001 Human-centric Title Case
# (c) 2024 Florent Dufour, Gemini 2.5 Pro
#
# Makefile
#
# Human Title Case Converter - C Implementation for WebAssembly

.PHONY: all clean wasm debug release help

# Default target
all: wasm debug release

# Compile to WebAssembly with optimizations
wasm: HcTc.js

# Debug build with source maps
debug: HcTc.debug.js

# Release build with maximum optimization
release: HcTc.release.js

# Main WebAssembly compilation
HcTc.js: HcTc.c
	mkdir -p em_cache
	emcc HcTc.c \
		-o HcTc.js \
		--cache ./em_cache \
		-s WASM=1 \
		-s EXPORTED_FUNCTIONS='["_humanTitleCase","_convert_title_case","_get_version","_malloc","_free","_emscripten_resize_heap"]' \
		-s EXPORTED_RUNTIME_METHODS='["ccall","cwrap","stringToUTF8","UTF8ToString","lengthBytesUTF8"]' \
		-s ALLOW_MEMORY_GROWTH=1 \
		-s INITIAL_MEMORY=131072 \
		-s MAXIMUM_MEMORY=1048576 \
		-O2 \
		--no-entry

# Debug build
HcTc.debug.js: HcTc.c
	mkdir -p em_cache
	emcc HcTc.c \
		-o HcTc.debug.js \
		--cache ./em_cache \
		-s WASM=1 \
		-s EXPORTED_FUNCTIONS='["_humanTitleCase","_convert_title_case","_get_version","_malloc","_free","_emscripten_resize_heap"]' \
		-s EXPORTED_RUNTIME_METHODS='["ccall","cwrap","stringToUTF8","UTF8ToString","lengthBytesUTF8"]' \
		-s ALLOW_MEMORY_GROWTH=1 \
		-s INITIAL_MEMORY=131072 \
		-s MAXIMUM_MEMORY=1048576 \
		-g \
		--no-entry

# Release build with maximum optimization
HcTc.release.js: HcTc.c
	mkdir -p em_cache
	emcc HcTc.c \
		-o HcTc.release.js \
		--cache ./em_cache \
		-s WASM=1 \
		-s EXPORTED_FUNCTIONS='["_humanTitleCase","_convert_title_case","_get_version","_malloc","_free","_emscripten_resize_heap"]' \
		-s EXPORTED_RUNTIME_METHODS='["ccall","cwrap","stringToUTF8","UTF8ToString","lengthBytesUTF8"]' \
		-s ALLOW_MEMORY_GROWTH=1 \
		-s INITIAL_MEMORY=131072 \
		-s MAXIMUM_MEMORY=1048576 \
		-O3 \
		--closure 1 \
		--no-entry

# Clean build artifacts
clean:
	rm -f *.wasm *.js *.html *.map
	rm -rf em_cache

# Help target
help: ## Show this help message
	@echo "Human-centric Title Case WebAssembly Build System"
	@echo ""
	@echo "Available targets:"
	@echo "  all      - Build optimized WebAssembly module (default, same as 'wasm')"
	@echo "  wasm     - Build optimized WebAssembly module (HcTc.js, O2)"
	@echo "  debug    - Build debug version with source maps (HcTc.debug.js, -g)"
	@echo "  release  - Build release version with maximum optimization (HcTc.release.js, O3 + closure)"
	@echo "  clean    - Remove all build artifacts and cache"
	@echo "  help     - Show this help message"
	@echo ""
	@echo "Build artifacts:"
	@echo "  HcTc.js           - Optimized WebAssembly JavaScript glue code"
	@echo "  HcTc.debug.js     - Debug JavaScript glue code with source maps"
	@echo "  HcTc.release.js   - Release JavaScript glue code with maximum optimization"
	@echo "  *.wasm            - WebAssembly binary modules (generated alongside .js files)"
	@echo ""
	@echo "Note: This Makefile does not directly produce .html files."
