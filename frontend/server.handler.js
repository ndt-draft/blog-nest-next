const server = require("./server.js");
const path = require("path");
const { createServer, proxy } = require("aws-serverless-express");

const expressApp = server.app;
const serverlessApp = createServer(expressApp);

exports.handler = (event, context) => {
  return proxy(serverlessApp, event, context);
};
