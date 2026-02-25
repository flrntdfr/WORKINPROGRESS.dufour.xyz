{
  description = "WORKINPROGRESS.nix";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
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
            nodejs_20
            /* emscripten is useful for the wasm task in assets */
            emscripten
            glibcLocales
          ];

          env = {
            LC_ALL = "en_US.UTF-8";
            LANG = "en_US.UTF-8";
            LC_CTYPE = "en_US.UTF-8";
            LOCALE_ARCHIVE = "${pkgs.glibcLocales}/lib/locale/locale-archive";
            BUNDLE_PATH = ".direnv/bundle";
            BUNDLE_BIN = ".direnv/bin";
            JEKYLL_ENV = "development";
            TZ = "Europe/Berlin";
          };

          shellHook = ''
            echo "Jekyll dev shell ready. To install gems, run: make gems"
          '';
        };
      }
    );
} 