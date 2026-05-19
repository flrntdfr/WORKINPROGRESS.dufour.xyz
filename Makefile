# Makefile
# 2021 - 2026

.PHONY: img install build serve build-nix serve clean nuke help wasm gems update-gems prebuild

SERVER_PORT    := 4000
JEKYLL_CONFIG  := _config.yml,_config_dev.yml

gems:           ## Install gems for local development
	bundle config set --local path '.direnv/bundle'
	bundle install
	bundle binstubs --all

update-gems:         ## Update gems
	bundle update

prebuild:       ## Prebuild step
	#$(MAKE) -C assets/2024/human-centric-title-case/ wasm
	$(MAKE) -C prebuild/DJ-Digger all

build:          ## Build the website for production
	JEKYLL_ENV=production bundle exec jekyll build --verbose

build-nix:      ## Build the website using Nix
	nix build

serve:          ## Dev server (incremental, livereload, dev config)
	JEKYLL_ENV=development JEKYLL_NO_BUNDLER_REQUIRE=1 bundle exec jekyll serve --incremental --livereload --unpublished --future --config $(JEKYLL_CONFIG)

clean:          ## Clean Jekyll caches
	bundle exec jekyll $@

nuke: clean     ## Nuke caches and temp files
	trash -rf ._* .jekyll* _site .direnv vendor Gemfile.lock

help:           ## Print this help
	@grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'