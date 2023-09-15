const { send, json } = require("micro");
const db = require("../data.js");

module.exports = async (req, res) => {
  const { id } = req.query;
  const noteIndex = db.notes.findIndex((n) => n.id === parseInt(id));

  // Setting headers for CORS - modify as per your needs
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  switch (req.method) {
    case "OPTIONS": // Preflight request. Reply successfully:
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, PATCH, DELETE, OPTIONS"
      );
      send(res, 200);
      break;

    case "GET":
      if (noteIndex !== -1) {
        res.setHeader("Content-Type", "application/json");
        send(res, 200, db.notes[noteIndex]);
      } else {
        res.setHeader("Content-Type", "application/json");
        send(res, 404, { message: "Note not found." });
      }
      break;

    case "PATCH":
      if (noteIndex === -1) {
        res.setHeader("Content-Type", "application/json");
        send(res, 404, { message: "Note not found." });
      } else {
        const updatedData = await json(req);
        const updatedNote = { ...db.notes[noteIndex], ...updatedData }; // Merge existing note data with updated data from the request body
        db.notes[noteIndex] = updatedNote;
        res.setHeader("Content-Type", "application/json");
        send(res, 200, updatedNote);
      }
      break;

    case "DELETE":
      if (noteIndex !== -1) {
        db.notes.splice(noteIndex, 1);
        res.setHeader("Content-Type", "application/json");
        send(res, 200, { message: "Note deleted." });
      } else {
        res.setHeader("Content-Type", "application/json");
        send(res, 404, { message: "Note not found." });
      }
      break;

    default:
      send(res, 405); // Method Not Allowed for unsupported methods
  }
};
