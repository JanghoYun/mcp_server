import http from 'http';
import handler from './src/index.js';

const server = http.createServer(async (req, res) => {
  if (req.method !== 'POST') {
    res.writeHead(405);
    return res.end();
  }

  let body = '';
  req.on('data', chunk => (body += chunk));
  req.on('end', async () => {
    try {
      const { method, params, id } = JSON.parse(body);
      let result;

      if (method === 'tools/list') {
        result = Object.entries(handler.tools).map(([name, def]) => ({
          name,
          description: def.description,
          parameters: def.parameters
        }));
      } else if (method === 'tools/call') {
        const { name, arguments: args } = params;
        if (!handler.tools[name]) throw new Error(`Unknown tool: ${name}`);
        result = await handler.tools[name].run(args);
      } else if (method === 'initialize') {
        result = { status: "ok" };
      } else {
        throw new Error(`Unknown method: ${method}`);
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ jsonrpc: '2.0', result, id }));
    } catch (err) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ jsonrpc: '2.0', error: { message: err.message }, id: null }));
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 MCP server ready at http://0.0.0.0:${PORT}`);
});


