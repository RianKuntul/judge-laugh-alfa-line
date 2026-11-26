// Make the AI Judge Laugh — make.fun entry (v2).
// Writes one original one-line office joke to
// $MAKEFUN_OUTPUT_DIR/entry.txt (defaults to ./output/entry.txt).
// v2: the open-door policy angle — the boss preaches openness but
// slams his laptop shut the moment anyone walks in, as if caught
// booking a holiday. The reply-all line in v1 was a solid observation
// but its turn landed flat; this one keeps the setup tighter and puts
// the surprise in the last four words. Run: node main.ts (Node 22+,
// erasable TypeScript only, no network, no randomness).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE: string =
  "My boss calls it an open-door policy, but every time I walk in he closes his laptop like I just caught him booking a holiday.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function main(): void {
  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "./output";
  const outPath: string = join(outDir, "entry.txt");

  // Gate: single line, 1-200 characters (Unicode code points),
  // not only whitespace, no trailing newline in the file.
  const length: number = [...JOKE].length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `joke is ${length} characters, must be ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  if (/[\r\n]/.test(JOKE) || JOKE.trim().length === 0) {
    throw new Error("joke must be a single non-blank line");
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, JOKE, "utf8");

  // Read it back and refuse to finish unless disk holds exactly the joke.
  const onDisk: string = readFileSync(outPath, "utf8");
  if (onDisk !== JOKE) {
    throw new Error("read-back mismatch: entry.txt does not match the joke");
  }

  console.log(`wrote ${[...onDisk].length} characters to ${outPath}`);
}

main();
