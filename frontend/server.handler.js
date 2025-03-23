const path = require("path");
const { createServer, proxy } = require("aws-serverless-express");

// 🛠 Fix the path to `server.js` dynamically
const serverPath = path.join(__dirname, ".next/standalone/server.js");
const server = require(serverPath);

const expressApp = server.app;
const serverlessApp = createServer(expressApp);

exports.handler = (event, context) => {
  return proxy(serverlessApp, event, context);
};
