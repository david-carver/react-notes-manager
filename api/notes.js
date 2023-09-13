import fs from "fs";
import path from "path";

export default (req, res) => {
  const dbPath = path.join(process.cwd(), "db.json");
  const rawData = fs.readFileSync(dbPath);
  const db = JSON.parse(rawData);

  if (req.method === "GET") {
    return res.status(200).json(db.notes);
  }

  if (req.method === "POST") {
    const note = req.body; // assuming the body contains the entire note object

    // Assign an ID to the note (could be the next number, UUID, etc.)
    note.id = db.notes.length + 1;

    db.notes.push(note);

    // Write back to db.json
    fs.writeFileSync(dbPath, JSON.stringify(db));

    return res.status(201).json(note); // Return the created note
  }

  // Other methods will be handled here...

  res.status(405).end(); // Method Not Allowed for unsupported methods
};
