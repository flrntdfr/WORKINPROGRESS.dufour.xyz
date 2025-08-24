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
        
        /* Common environment variables for both dev and build */
        commonEnv = {
          LC_ALL = "en_US.UTF-8";
          LANG = "en_US.UTF-8";
          LC_CTYPE = "en_US.UTF-8";
          JEKYLL_ENV = "production";
        };
        
        /* Common build inputs for both dev and build */
        commonBuildInputs = with pkgs; [
          ruby_3_2
          bundler
          git
          gnumake
          glibcLocales
        ];
        
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = commonBuildInputs ++ (with pkgs; [
            emscripten
          ]);
          
          env = commonEnv // {
            BUNDLE_PATH = ".direnv/bundle";
            BUNDLE_BIN = ".direnv/bin";
            JEKYLL_ENV = "development";
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

        /* Development shell specifically for local development */
        devShells.dev = pkgs.mkShell {
          buildInputs = commonBuildInputs ++ (with pkgs; [
            emscripten
          ]);
          
          env = commonEnv // {
            BUNDLE_PATH = ".direnv/bundle";
            BUNDLE_BIN = ".direnv/bin";
            JEKYLL_ENV = "development";
          };
          
          shellHook = ''
            # Install gems locally if not already installed
            if [ ! -d ".direnv/bundle/ruby" ]; then
              echo "Installing gems locally in .direnv..."
              bundle config set --local path '.direnv/bundle'
              bundle install
              bundle binstubs --all
            else
              echo "Gems already installed locally in .direnv"
            fi
          '';
        };

        /* Build shell for deployment environment */
        devShells.build = pkgs.mkShell {
          buildInputs = commonBuildInputs;
          
          env = commonEnv // {
            BUNDLE_PATH = "vendor/bundle";
            BUNDLE_BIN = "vendor/bin";
            JEKYLL_ENV = "production";
          };
          
          shellHook = ''
            # Install gems for production build
            echo "Setting up production build environment..."
            bundle config set --local path 'vendor/bundle'
            bundle install --deployment
            bundle binstubs --all
          '';
        };

        packages.default = pkgs.stdenv.mkDerivation {
          pname = "workinprogress-dufour-xyz";
          version = "1.0.0";
          
          src = ./.;
          
          buildInputs = commonBuildInputs;
          
          env = commonEnv // {
            BUNDLE_PATH = "vendor/bundle";
            BUNDLE_BIN = "vendor/bin";
          };
          
          buildPhase = ''
            # Install gems for production
            bundle config set --local path 'vendor/bundle'
            bundle install --deployment
            bundle binstubs --all
            
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