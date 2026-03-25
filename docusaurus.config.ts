import path from "path";
import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import tailwindPlugin from "./plugins/tailwind-plugin";

const config: Config = {
  title: "OpsKat",
  tagline: "AI-first infrastructure management",
  favicon: "img/favicon.ico",
  clientModules: [require.resolve("./src/clientModules/localeRedirect.ts")],

  future: {
    v4: true,
  },

  url: "https://opskat.github.io",
  baseUrl: "/",

  organizationName: "opskat",
  projectName: "opskat.github.io",

  onBrokenLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh-CN"],
    localeConfigs: {
      en: { label: "English" },
      "zh-CN": { label: "简体中文" },
    },
  },

  plugins: [
    tailwindPlugin,
    function webpackAliasPlugin() {
      return {
        name: "webpack-alias",
        configureWebpack() {
          return {
            resolve: {
              alias: {
                "@": path.resolve(__dirname, "src"),
              },
            },
          };
        },
      };
    },
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/opskat/opskat.github.io/tree/main/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "OpsKat",
      logo: {
        alt: "OpsKat Logo",
        src: "img/logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docs",
          position: "left",
          label: "Docs",
        },
        {
          href: "https://github.com/opskat/opskat",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright \u00A9 ${new Date().getFullYear()} OpsKat. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'diff', 'json', 'yaml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
