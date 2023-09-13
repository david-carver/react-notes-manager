import { db } from "./data";

export default (req, res) => {
  switch (req.method) {
    case "GET":
      return res.status(200).json(db.notes);

    case "POST":
      const note = req.body;
      note.id = db.notes.length + 1; // For simplicity, we're using this as an ID. In a real-world scenario, consider using UUIDs or another unique ID strategy.
      db.notes.push(note);
      return res.status(201).json(note);

    default:
      return res.status(405).end(); // Method Not Allowed for unsupported methods
  }
};
