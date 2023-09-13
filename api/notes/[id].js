import fs from "fs";
import path from "path";

export default (req, res) => {
  const {
    query: { id },
  } = req;

  const dbPath = path.join(process.cwd(), "db.json");
  const rawData = fs.readFileSync(dbPath);
  const db = JSON.parse(rawData);

  const noteIndex = db.notes.findIndex((n) => n.id === parseInt(id));
  if (noteIndex === -1)
    return res.status(404).json({ error: "Note not found" });

  if (req.method === "PATCH") {
    const updatedFields = req.body;

    // Update the note
    Object.assign(db.notes[noteIndex], updatedFields);

    // Write back to db.json
    fs.writeFileSync(dbPath, JSON.stringify(db));

    return res.status(200).json(db.notes[noteIndex]);
  } else if (req.method === "DELETE") {
    db.notes.splice(noteIndex, 1);

    // Write back to db.json
    fs.writeFileSync(dbPath, JSON.stringify(db));

    return res.status(200).json({ message: "Note deleted" });
  }

  res.status(405).end(); // Method Not Allowed for unsupported methods
};
