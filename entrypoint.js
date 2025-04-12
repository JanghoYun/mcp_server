import handler from "./src/index.js";

const decoder = new TextDecoder();
const encoder = new TextEncoder();

const inputChunks = [];
let buffer = "";

process.stdin.on("data", (chunk) => {
  buffer += chunk.toString();
  let newlineIndex;
  while ((newlineIndex = buffer.indexOf("\n")) >= 0) {
    const line = buffer.slice(0, newlineIndex);
    buffer = buffer.slice(newlineIndex + 1);

    try {
      const input = JSON.parse(line);
      handler
        .run({ input })
        .then((result) => {
          process.stdout.write(JSON.stringify(result) + "\n");
        })
        .catch((err) => {
          process.stdout.write(JSON.stringify({ error: err.message }) + "\n");
        });
    } catch (err) {
      process.stdout.write(JSON.stringify({ error: err.message }) + "\n");
    }
  }
});
