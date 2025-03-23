const fs = require("fs");
const path = require("path");

const handlerContent = `const server = require('./server.js');
const { createServer, proxy } = require('aws-serverless-express');

const expressApp = server.app;
const serverlessApp = createServer(expressApp);

exports.handler = (event, context) => {
  return proxy(serverlessApp, event, context);
};`;

const handlerPath = path.join(
  __dirname,
  "../.next/standalone/server.handler.js"
);

fs.writeFileSync(handlerPath, handlerContent);
console.log("✅ server.handler.js created successfully!");
