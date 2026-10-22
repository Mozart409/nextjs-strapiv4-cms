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

      # nixpkgs still ships railway 5.30.4, but Railway's Infrastructure as Code
      # (`railway config plan|apply`) requires >= 5.42.1. Use the upstream static
      # release binary instead of rebuilding the nixpkgs source package.
      railwayVersion = "5.71.0";
      railwayTargets = {
        aarch64-darwin = {
          target = "aarch64-apple-darwin";
          hash = "sha256-NQdI8u30H0ayLF1mzqQpTWYOdkgE4lLdugiiexnNC9E=";
        };
        aarch64-linux = {
          target = "aarch64-unknown-linux-musl";
          hash = "sha256-0WCtKgKeqsS0yFASrbZ8H1cJuoH3Mg7bWie+koIR1jg=";
        };
        x86_64-darwin = {
          target = "x86_64-apple-darwin";
          hash = "sha256-G0HddykmV8gK49/MvnZTu7QLfNyVqPSwbCwfDCoAmRk=";
        };
        x86_64-linux = {
          target = "x86_64-unknown-linux-musl";
          hash = "sha256-Lmgv0t341v355G2dmdmWRv8AIqarsMK8qTARNIomn7k=";
        };
      };

      railway =
        if !(builtins.hasAttr system railwayTargets)
        then pkgs.railway
        else let
          inherit (railwayTargets.${system}) target hash;
        in
          pkgs.stdenvNoCC.mkDerivation {
            pname = "railway";
            version = railwayVersion;

            src = pkgs.fetchurl {
              url = "https://github.com/railwayapp/cli/releases/download/v${railwayVersion}/railway-v${railwayVersion}-${target}.tar.gz";
              hash = hash;
            };

            sourceRoot = ".";
            nativeBuildInputs = [ pkgs.makeBinaryWrapper ];
            dontConfigure = true;
            dontBuild = true;

            installPhase = ''
              runHook preInstall
              install -Dm755 railway $out/bin/railway
              wrapProgram $out/bin/railway \
                --set RAILWAY_NO_AUTO_UPDATE true
              runHook postInstall
            '';

            meta = {
              mainProgram = "railway";
              description = "Railway.app CLI";
              homepage = "https://github.com/railwayapp/cli";
              changelog = "https://github.com/railwayapp/cli/releases/tag/v${railwayVersion}";
              license = pkgs.lib.licenses.mit;
              sourceProvenance = [ pkgs.lib.sourceTypes.binaryNativeCode ];
              platforms = builtins.attrNames railwayTargets;
            };
          };
    in {
      devShells.default = pkgs.mkShell {
        buildInputs =
          (with pkgs; [
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
            postgresql_18
            trivy
            typescript
            # keep-sorted end
          ])
          ++ [ railway ];

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
