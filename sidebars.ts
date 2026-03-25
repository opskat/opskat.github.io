import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: "category",
      label: "Getting Started",
      items: ["getting-started/installation", "getting-started/quick-start"],
    },
    {
      type: "category",
      label: "Guide",
      items: [
        "guide/ai-agent",
        "guide/asset-management",
        "guide/ssh-terminal",
        "guide/query-editor",
        "guide/policy",
        "guide/audit",
      ],
    },
    {
      type: "category",
      label: "CLI Reference",
      items: [
        "cli/overview",
        "cli/exec",
        "cli/ssh",
        "cli/cp",
        "cli/sql",
        "cli/redis",
        "cli/grant",
      ],
    },
    {
      type: "category",
      label: "Development",
      items: [
        "development/architecture",
        "development/building",
        "development/contributing",
      ],
    },
    "changelog",
  ],
};

export default sidebars;
