# Makefile
# 2021 - 2025

.PHONY: img install build serve clean nuke help

SERVER_PORT    := 4000
SERVER_FLAGS   := --trace --livereload

install:
	bundle config set --local path '.direnv/bundle'
	bundle install
	bundle binstubs --all
update:
	bundle update
build: ## Build the website locally
	bundle exec jekyll $@ --verbose
	nix build
serve-prod: ## Build and serve the website
	bundle exec jekyll serve $(SERVER_FLAGS)
serve-dev:
	bundle exec jekyll serve $(SERVER_FLAGS) --unpublished --future
clean: ## Clean caches
	bundle exec jekyll $@
nuke: clean ## Nuke caches and temp files 
	trash -rf ._* .jekyll* _site Gemfile.lock
help:  ## Print this help
	@grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'