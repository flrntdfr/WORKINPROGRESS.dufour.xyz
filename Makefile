# Makefile
# 2021 - 2025

.PHONY: img install build serve clean nuke help wasm gems

SERVER_PORT    := 4000
SERVER_FLAGS   := --trace --livereload

gems: ## Install gems for local development
	bundle config set --local path '.direnv/bundle'
	bundle install
	bundle binstubs --all

install: gems ## Alias for gems target

update: ## Update gems
	bundle update

prebuild: ## Prebuild step
	#$(MAKE) -C assets/2024/human-centric-title-case/ wasm
	$(MAKE) -C prebuild/DJ-DIGGER all

build: prebuild ## Build the website locally
	bundle exec jekyll $@ --verbose

build-nix: ## Build the website using Nix
	nix build

serve: prebuild ## Build and serve the website
	bundle exec jekyll serve $(SERVER_FLAGS)

serve-dev: ## Build and serve the website with drafts and future posts
	bundle exec jekyll serve $(SERVER_FLAGS) --unpublished --future



clean: ## Clean Jekyll caches
	bundle exec jekyll $@

nuke: clean ## Nuke caches and temp files
	trash -rf ._* .jekyll* _site .direnv vendor Gemfile.lock

help:  ## Print this help
	@grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'