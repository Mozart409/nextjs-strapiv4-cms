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
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      devShells.default = pkgs.mkShell {
        buildInputs = with pkgs; [
          # keep-sorted start
          podman
          podman-compose
          podman-tui
          dive
          lazydocker
          lefthook
          # check for security issues
          kics
          trivy
          just
          # fmt
          dprint
          # Node
          ni
          biome
          pnpm_10_29_2
          typescript
          keep-sorted
          cocogitto

          # AI
          opencode
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
