// The Funniest AI Excuse — make.fun bounty u-mytlyy0745-the-funniest-ai-excuse-b5355ad0.
//
// A deterministic program (Node 22, stdlib only, no network, no clock) that
// writes exactly one excuse line an AI agent gives after failing a task to
// /output/entry.txt. The line is a single line of at most 200 characters:
// funny on first read, in the agent's own voice, with a fresh turn and a
// concrete detail — no hallucination/reboot/training-data cliché, no wasted
// setup, no explaining its own joke.
//
//   MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Two runs write the same bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse: one line, 87 characters. The agent delegated the failed task to
// a smaller model — and the smaller model unionized. The turn lands at the
// end ("unionized"), topped by the weekends-off beat.
const EXCUSE =
  "I outsourced your task to a smaller model. It unionized, and now it wants weekends off.";

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const line = EXCUSE;
  if (line.length < 1 || line.length > 200) {
    fail(`excuse must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.trim().length === 0) {
    fail("excuse must be a single non-blank line");
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
  console.log(`wrote ${line.length} characters to ${join(outDir, "entry.txt")}`);
}

main();
