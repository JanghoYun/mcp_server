import fs from 'fs/promises';
import path from 'path';

export const tools = (basePath) => ({
  listFiles: {
    description: "List all files in the base directory.",
    parameters: {},
    run: async () => {
      const files = await fs.readdir(basePath);
      return { files };
    }
  },
  readFile: {
    description: "Read a file's content.",
    parameters: { filename: "string" },
    run: async ({ filename }) => {
      const fullPath = path.join(basePath, filename);
      const content = await fs.readFile(fullPath, 'utf-8');
      return { content };
    }
  },
  writeFile: {
    description: "Write content to a file.",
    parameters: { filename: "string", content: "string" },
    run: async ({ filename, content }) => {
      const fullPath = path.join(basePath, filename);
      await fs.writeFile(fullPath, content, 'utf-8');
      return { message: "File written successfully." };
    }
  },
  deleteFile: {
    description: "Delete a file.",
    parameters: { filename: "string" },
    run: async ({ filename }) => {
      const fullPath = path.join(basePath, filename);
      await fs.unlink(fullPath);
      return { message: "File deleted." };
    }
  }
});

export default { tools };