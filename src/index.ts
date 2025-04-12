export default {
  async run(ctx) {
    const fs = await import('fs/promises');
    const path = await import('path');

    const basePath = "C:/Users/kkom/Desktop/mcp_server";
    const action = ctx.input?.action;
    const target = ctx.input?.target || "";
    const content = ctx.input?.content || "";
    const fullPath = path.join(basePath, target);

    if (action === "list") {
      const files = await fs.readdir(basePath);
      return { files };
    }

    if (action === "read") {
      const data = await fs.readFile(fullPath, "utf-8");
      return { content: data };
    }

    if (action === "write") {
      await fs.writeFile(fullPath, content, "utf-8");
      return { message: "File written successfully." };
    }

    if (action === "delete") {
      await fs.unlink(fullPath);
      return { message: "File deleted." };
    }

    return {
      error: "Invalid action. Use one of: list, read, write, delete",
      received: { action, target }
    };
  }
};
