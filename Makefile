# Makefile
# 2021 - 2025

JEKYLL_VERSION := 4.2.2
JEKYLL_PORT    := 4000
JEKYLL         := docker run --rm --volume="$$PWD:/srv/jekyll" -p $(JEKYLL_PORT):4000 -it jekyll/jekyll:$(JEKYLL_VERSION) jekyll

build: ## Build the website locally
	$(JEKYLL) $@
serve: ## Build and serve the website locally
	$(JEKYLL) $@ --trace 
clean: ## Clean caches
	$(JEKYLL) $@
nuke:  ## Nuke caches and temp files 
	rm -rf ._* .jekyll* _site
help:  ## Print this help
	@grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'