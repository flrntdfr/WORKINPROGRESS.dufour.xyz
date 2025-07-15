{
  description = "WORKINPROGRESS.nix";

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
            ruby_3_2
            bundler
            git
            gnumake
          ];
          
          env = {
            BUNDLE_PATH = ".direnv/bundle";
            BUNDLE_BIN = ".direnv/bin";
          };
          
          shellHook = ''
            # Install gems locally if not already installed
            if [ ! -d ".direnv/bundle/ruby" ]; then
              echo "Installing gems locally in .direnv..."
              make gems
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
          
          env = {
            LC_ALL = "en_US.UTF-8";
            LANG = "en_US.UTF-8";
            LC_CTYPE = "en_US.UTF-8";
            BUNDLE_PATH = "vendor/bundle";
            BUNDLE_BIN = "vendor/bin";
            JEKYLL_ENV = "production";
          };
          
          buildPhase = ''
            # Install gems
            bundle install --path vendor/bundle --binstubs vendor/bin
            
            # Build the site
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