import "server-only";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

/**
 * Minimal persistence for orders, enquiries, subscribers and reviews.
 * Writes JSON files under DATA_DIR (default ./.data). Fine for local development and a single
 * server. Serverless hosts (Vercel) don't keep files between requests, so before launch point these
 * functions at Postgres using prisma/schema.prisma. The function signatures stay the same.
 */
const DIR = process.env.DATA_DIR || path.join(process.cwd(), ".data");

type Collection = "orders" | "enquiries" | "subscribers" | "reviews";

async function readAll<T>(c: Collection): Promise<T[]> {
  try {
    return JSON.parse(await fs.readFile(path.join(DIR, `${c}.json`), "utf8")) as T[];
  } catch {
    return [];
  }
}
async function writeAll<T>(c: Collection, rows: T[]) {
  await fs.mkdir(DIR, { recursive: true });
  await fs.writeFile(path.join(DIR, `${c}.json`), JSON.stringify(rows, null, 2));
}

export const newId = (prefix: string) =>
  `${prefix}-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;

export async function insert<T extends { id: string }>(c: Collection, row: T) {
  const rows = await readAll<T>(c);
  rows.unshift(row);
  await writeAll(c, rows);
  return row;
}
export async function update<T extends { id: string }>(c: Collection, id: string, patch: Partial<T>) {
  const rows = await readAll<T>(c);
  const i = rows.findIndex((r) => r.id === id);
  if (i < 0) return null;
  rows[i] = { ...rows[i], ...patch };
  await writeAll(c, rows);
  return rows[i];
}
export async function find<T extends { id: string }>(c: Collection, id: string) {
  return (await readAll<T>(c)).find((r) => r.id === id) ?? null;
}
export async function list<T>(c: Collection) {
  return readAll<T>(c);
}
