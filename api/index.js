const { send } = require("micro");
const url = require("url");
const cors = require("micro-cors")();
const notes = require("./notes");
const noteWithId = require("./notes/[id]");
require("dotenv").config();

const handler = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  // Handling /notes route with GET and POST
  if (pathname === "/notes") {
    return notes(req, res);
  }

  // Handling /notes/:id route with PATCH, GET, DELETE
  const matchNoteWithId = /^\/notes\/([a-zA-Z0-9_-]+)$/.exec(pathname);
  if (matchNoteWithId) {
    // Append the id from the URL as a query parameter for local routing
    req.query = { ...query, id: matchNoteWithId[1] };
    return noteWithId(req, res);
  }

  // Default 404 response for unmatched routes
  send(res, 404, "Not found");
};

module.exports = cors(handler);
