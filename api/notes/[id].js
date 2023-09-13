import { db } from "../data";

export default (req, res) => {
  const { id } = req.query;

  console.log(id);

  const noteIndex = db.notes.findIndex((n) => n.id === parseInt(id));

  console.log(noteIndex);

  switch (req.method) {
    case "GET":
      if (noteIndex !== -1) return res.status(200).json(db.notes[noteIndex]);
      else return res.status(404).json({ message: "Note not found." });

    case "PATCH":
      if (noteIndex === -1)
        return res.status(404).json({ message: "Note not found." });

      const updatedNote = { ...db.notes[noteIndex], ...req.body }; // Merge existing note data with updated data from the request body
      db.notes[noteIndex] = updatedNote;

      return res.status(200).json(updatedNote);

    case "DELETE":
      if (noteIndex !== -1) {
        db.notes.splice(noteIndex, 1);
        return res.status(200).json({ message: "Note deleted." });
      } else {
        return res.status(404).json({ message: "Note not found." });
      }

    default:
      return res.status(405).end(); // Method Not Allowed for unsupported methods
  }
};
