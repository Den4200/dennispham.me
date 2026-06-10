export interface Project {
  name: string;
  description: string;
  github: string;
  url: string | null;
}

export const projects: Project[] = [
  {
    name: "Axolotl Cloud",
    description:
      "A highly available, bare metal Kubernetes cluster running Talos Linux with Rook Ceph hyperconverged storage, Cilium networking, and Istio service mesh. Fully GitOps-driven with Argo CD and monitored with Grafana, Prometheus, and Loki. Mikrotik network infrastructure configured via Terraform and an AirPrint server managed with Ansible.",
    github: "https://github.com/axolotlcloud/infrastructure",
    url: "https://docs.axolotl.cloud",
  },
  {
    name: "dennispham.me",
    description:
      "A personal portfolio and blog built with Astro and TailwindCSS. This is its third iteration, evolving from Django to React with a Rust backend to its current form.",
    github: "https://github.com/den4200/dennispham.me",
    url: "https://dennispham.me",
  },
  {
    name: "audreyasked.com",
    description:
      "A real-time polling app built with Next.js, Prisma, and TailwindCSS. Users can create and share polls, vote on responses, and view live results.",
    github: "https://github.com/den4200/audreyasked",
    url: "https://audreyasked.com",
  },
  {
    name: "chip-8",
    description:
      "An emulator for the CHIP-8 virtual machine written in Rust. Supports the full instruction set and renders graphics for classic ROMs like Breakout.",
    github: "https://github.com/den4200/chip-8",
    url: null,
  },
  {
    name: "start.axolotl.cloud",
    description:
      "My personal web browser start page built with Next.js and TailwindCSS. Bookmarks can be quickly accessed with Ctrl+K.",
    github: "https://github.com/den4200/startpage",
    url: "https://start.axolotl.cloud",
  },
];
