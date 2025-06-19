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
      }
    );
} 