const server = require("./server.js");
const { createServer, proxy } = require("aws-serverless-express");

const expressApp = server.app;
const serverlessApp = createServer(expressApp);

module.exports.handler = (event, context) => {
  return proxy(serverlessApp, event, context);
};
