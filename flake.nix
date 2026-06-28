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
          claude-code
          cocogitto
          dive
          # fmt
          dprint
          just
          keep-sorted
          # check for security issues
          kics
          lazydocker
          lefthook
          # Node
          ni
          # AI
          opencode
          pnpm_10_29_2
          podman
          podman-compose
          podman-tui
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
