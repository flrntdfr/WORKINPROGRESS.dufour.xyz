{
  description = "Minimal Jekyll development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            # Ruby and Jekyll
            ruby_3_2
            bundler
            
            # Development tools
            git
            gnumake
          ];
          
          shellHook = ''
            # Set up local gem installation
            export BUNDLE_PATH=".direnv/bundle"
            export BUNDLE_BIN=".direnv/bin"
            
            # Install gems locally if not already installed
            if [ ! -d ".direnv/bundle/ruby" ]; then
              echo "Installing gems locally in .direnv..."
              bundle install --path .direnv/bundle --binstubs .direnv/bin
            else
              echo "Gems already installed locally in .direnv"
            fi
          '';
        };

        packages.default = pkgs.stdenv.mkDerivation {
          pname = "workinprogress-dufour-xyz";
          version = "1.0.0";
          
          src = ./.;
          
          buildInputs = with pkgs; [
            ruby_3_2
            bundler
            glibcLocales
          ];
          
          buildPhase = ''
            # Set up proper locale and encoding
            export LC_ALL=en_US.UTF-8
            export LANG=en_US.UTF-8
            export LC_CTYPE=en_US.UTF-8
            
            # Set up local gem installation for build
            export BUNDLE_PATH="vendor/bundle"
            export BUNDLE_BIN="vendor/bin"
            
            # Install gems
            bundle install --path vendor/bundle --binstubs vendor/bin
            
            # Build the site
            export JEKYLL_ENV=production
            bundle exec jekyll build --destination $out
          '';
          
          installPhase = "echo 'Site built successfully'";
          
          meta = with pkgs.lib; {
            description = "WORKINPROGRESS.dufour.xyz Jekyll site";
            homepage = "https://WORKINPROGRESS.dufour.xyz";
            license = licenses.mit;
            platforms = platforms.all;
          };
        };
      }
    );
} 