const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

module.exports = (req, res) => {
  if (req.method === "OPTIONS") {
    // Preflight request. Reply successfully:
    res.end();
    return;
  }

  // Pass down the request and response objects:
  server.handle(req, res);
};
