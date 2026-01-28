{
  description = "Development shell with Docker and Docker Compose";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    nixos-anywhere.url = "github:nix-community/nixos-anywhere";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
    nixos-anywhere,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      devShells.default = pkgs.mkShell {
        buildInputs = with pkgs; [
          podman
          podman-compose
          podman-tui
          dive
          lazydocker
          lefthook
          # check for security issues
          kics
          just
          # fmt
          dprint
          # Node
          bun
          ni
          biome
          pnpm
          typescript
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
