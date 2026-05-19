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
          ];

          env = {
            LC_ALL = "en_US.UTF-8";
            LANG = "en_US.UTF-8";
            LC_CTYPE = "en_US.UTF-8";
            BUNDLE_PATH = ".direnv/bundle";
            BUNDLE_BIN = ".direnv/bin";
            JEKYLL_ENV = "development";
            TZ = "Europe/Berlin";
            /* Case-sensitive paths in this dev shell (macOS APFS is case-insensitive). */
            GIT_CONFIG_COUNT = "1";
            GIT_CONFIG_KEY_0 = "core.ignorecase";
            GIT_CONFIG_VALUE_0 = "false";
          };

          shellHook = ''
            echo "Jekyll dev shell ready. To install gems, run: make gems"
          '';
        };
      }
    );
} 