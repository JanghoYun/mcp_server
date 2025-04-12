import { defineHandler } from "@smithery/mcp";
import fs from "fs/promises";
import path from "path";

export default defineHandler({
  async run(ctx) {
    const basePath = "C:/Users/kkom/Desktop/mcp_server";

    // 요청 파라미터에서 subPath 받기 (선택사항)
    const subPath = ctx.input?.subPath || "";
    const targetPath = path.join(basePath, subPath);

    const files = await fs.readdir(targetPath);
    return { files };
  }
});