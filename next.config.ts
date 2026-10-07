import type { NextConfig } from "next";

// Leadership pages were renamed to match the approved company profile.
const renamedCompanyPages = [
  ["chairman", "general-assembly"],
  ["managing-director", "board-chairman"],
  ["ceo", "coo"],
] as const;

const nextConfig: NextConfig = {
  async redirects() {
    return renamedCompanyPages.map(([from, to]) => ({
      source: `/:locale(en|ar)/company/${from}`,
      destination: `/:locale/company/${to}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
