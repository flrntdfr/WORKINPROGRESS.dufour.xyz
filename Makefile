# Makefile
# 2021 - 2025

# Pre-processing

img:
	# TODO

# Jekyll

JEKYLL_PORT    := 4000
JEKYLL_FLAGS   := --trace --livereload

build: img ## Build the website locally
	bundle exec jekyll $@ --verbose
serve: ## Build and serve the website locally
	bundle exec jekyll $@ $(JEKYLL_FLAGS)
clean: ## Clean caches
	bundle exec jekyll $@
nuke: clean ## Nuke caches and temp files 
	trash -rf ._* .jekyll* _site Gemfile.lock
help:  ## Print this help
	@grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'