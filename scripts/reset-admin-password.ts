/**
 * Resets ONE admin user's password. Touches nothing else — no content,
 * no blocks, no settings. Safe against production, unlike the full seed,
 * which replaces blocks wholesale.
 *
 * Local:
 *   DATABASE_URL="postgresql://..." ADMIN_PASSWORD="..." \
 *     npx tsx scripts/reset-admin-password.ts
 *
 * Production — pass the pulled env file as an argument. The script parses
 * it itself, so nothing depends on shell quoting or --env-file semantics:
 *
 *   vercel env pull .env.vercel-prod --environment=production \
 *     --scope mounirclicksalesmedias-projects --yes
 *   ADMIN_PASSWORD="<new password>" \
 *     npx tsx scripts/reset-admin-password.ts .env.vercel-prod
 *   rm -f .env.vercel-prod
 */
import { readFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

/** Vercel + Neon expose the URL under several names depending on the integration. */
const URL_KEYS = [
  "DATABASE_URL",
  "POSTGRES_PRISMA_URL",
  "DATABASE_URL_UNPOOLED",
  "POSTGRES_URL_NON_POOLING",
  "POSTGRES_URL",
];

/** Minimal dotenv parser: KEY=VALUE, optional `export`, optional quotes, # comments. */
function parseEnvFile(path: string): Record<string, string> {
  const out: Record<string, string> = {};
  let text: string;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    throw new Error(
      `"${path}" is neither a Postgres connection string nor a file on disk.\n\n` +
        `Paste the real Neon connection string as the argument. Get it from:\n` +
        `  Neon console -> project "tamgasoil" -> Connect -> copy the string\n` +
        `It starts with postgresql:// and contains .neon.tech`,
    );
  }
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const m = line.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"') && value.length > 1) ||
      (value.startsWith("'") && value.endsWith("'") && value.length > 1)
    ) {
      value = value.slice(1, -1);
    }
    out[m[1]] = value;
  }
  return out;
}

const PG = /^postgres(ql)?:\/\//i;

/**
 * Finds the connection string without guessing variable names: any value in
 * the file that looks like a Postgres URL wins. Vercel/Neon rename these
 * constantly and mark them Sensitive, so name-matching is unreliable.
 */
function resolveUrl(source: string | undefined, fileEnv: Record<string, string>) {
  // A raw URL passed straight on the command line.
  if (source && PG.test(source)) return { key: "argument", url: source.trim() };

  if (source) {
    // Prefer an unpooled/direct URL, else the first Postgres URL in the file.
    const pgKeys = Object.keys(fileEnv).filter((k) => PG.test(fileEnv[k] ?? ""));
    const preferred =
      pgKeys.find((k) => /UNPOOLED|NON_POOLING/i.test(k)) ??
      pgKeys.find((k) => /PRISMA|DATABASE_URL/i.test(k)) ??
      pgKeys[0];
    if (preferred) return { key: preferred, url: fileEnv[preferred].trim() };

    const names = Object.keys(fileEnv);
    throw new Error(
      `No Postgres URL in ${source}.\n` +
        `Keys parsed: ${names.length ? names.join(", ") : "(none)"}\n` +
        `Vercel marks env vars Sensitive, so 'vercel env pull' writes them empty. ` +
        `Copy the connection string from the Neon dashboard and pass it directly.`,
    );
  }

  const env = process.env.DATABASE_URL;
  if (env && PG.test(env)) return { key: "DATABASE_URL", url: env.trim() };
  throw new Error("Pass a Neon connection string, or an env file, as the first argument.");
}

async function main() {
  const source = process.argv[2];
  const isUrl = Boolean(source && PG.test(source));
  const fileEnv = source && !isUrl ? parseEnvFile(source) : {};

  const email = (process.env.ADMIN_EMAIL ?? fileEnv.ADMIN_EMAIL ?? "admin@tamoilgas.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!password) throw new Error("ADMIN_PASSWORD is required. Refusing to fall back to a default.");
  if (password.length < 12) throw new Error("ADMIN_PASSWORD must be at least 12 characters.");

  const { key, url } = resolveUrl(source, fileEnv);
  const host = url.replace(/^[a-z]+:\/\/[^@]*@/i, "").split(/[/?]/)[0];
  console.log(`Using ${key} → ${host}`);

  const db = new PrismaClient({ datasources: { db: { url } } });
  try {
    const existing = await db.user.findUnique({ where: { email } });
    if (!existing) throw new Error(`No user with email ${email}. Nothing was changed.`);

    await db.user.update({
      where: { email },
      data: { passwordHash: await hash(password, 12) },
    });

    console.log(`Password reset for ${email} (${existing.name}, ${existing.role}).`);
    console.log("Nothing else in the database was touched.");
  } finally {
    await db.$disconnect();
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
