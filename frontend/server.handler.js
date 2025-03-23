const path = require("path");
console.log("Current directory:", __dirname); // Debugging

const server = require(path.join(__dirname, "server.js")); // ✅ Fix path
const { createServer, proxy } = require("aws-serverless-express");

const expressApp = server.app;
const serverlessApp = createServer(expressApp);

module.exports.handler = (event, context) => {
  return proxy(serverlessApp, event, context);
};
