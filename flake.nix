{
  description = "Development shell with Docker and Docker Compose";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {
        inherit system;
        config.allowUnfree = true;
      };
    in {
      devShells.default = pkgs.mkShell {
        buildInputs = with pkgs; [
          # keep-sorted start
          biome
          cocogitto
          dive
          dprint
          just
          keep-sorted
          kics
          lazydocker
          lefthook
          ni
          pnpm
          podman
          podman-compose
          postgresql_16
          railway
          trivy
          typescript
          # keep-sorted end
        ];

        shellHook = ''
          # Install Git hooks with lefthook on shell entry
          if [ -f lefthook.yml ]; then
            echo "Installing Git hooks with lefthook..."
            lefthook install
          fi
        '';
      };
    });
}
