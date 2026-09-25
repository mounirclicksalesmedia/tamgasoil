import { mkdirSync, writeFileSync } from "node:fs";
import { getContent, getPages } from "../lib/content";
import { getCorporate } from "../lib/corporate";

mkdirSync("tmp/pdfs", { recursive: true });
mkdirSync("output/pdf", { recursive: true });
mkdirSync("public/downloads", { recursive: true });
writeFileSync(
  "tmp/pdfs/brochure-copy.json",
  JSON.stringify(
    Object.fromEntries(
      (["en", "ar"] as const).map((locale) => [
        locale,
        {
          c: getContent(locale),
          p: getPages(locale),
          t: getCorporate(locale),
        },
      ]),
    ),
  ),
);
