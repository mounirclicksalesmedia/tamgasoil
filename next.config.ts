import type { NextConfig } from "next";

// Leadership pages were renamed to match the approved company profile.
const renamedCompanyPages = [
  ["chairman", "general-assembly"],
  ["managing-director", "board-chairman"],
  ["ceo", "coo"],
] as const;

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...renamedCompanyPages.map(([from, to]) => ({
        source: `/:locale(en|ar)/company/${from}`,
        destination: `/:locale/company/${to}`,
        permanent: true,
      })),
      // The generated EN/AR overviews were replaced by the official bilingual profile.
      {
        source: "/downloads/tam-company-overview-:lang(en|ar).pdf",
        destination: "/downloads/tam-company-profile.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
