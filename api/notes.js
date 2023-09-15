const { send, json } = require("micro");
const db = require("./data.js");

module.exports = async (req, res) => {
  // Setting headers for CORS - modify as per your needs
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  switch (req.method) {
    case "OPTIONS": // Preflight request. Reply successfully:
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      send(res, 200);
      break;

    case "GET":
      res.setHeader("Content-Type", "application/json");
      send(res, 200, db.notes);
      break;

    case "POST":
      const note = await json(req);
      note.id = db.notes.length + 1;
      db.notes.push(note);
      res.setHeader("Content-Type", "application/json");
      send(res, 201, note);
      break;

    default:
      send(res, 405); // Method Not Allowed for unsupported methods
  }
};
