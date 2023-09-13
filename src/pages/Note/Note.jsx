import NoteAPI from "api/note-api";
import NoteForm from "components/NoteForm/NoteForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { removeNote, updateNote } from "store/notes/notes-slice";

export default function Note() {
  let { id } = useParams();
  id = parseInt(id);
  const note = useSelector((state) =>
    state.noteSlice.noteList.find((note) => note.id === id)
  );
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function onSubmit(note) {
    const updatedNote = await NoteAPI.updateById(note);
    dispatch(updateNote(updatedNote));
    setIsEditable(false);
  }

  async function onClickDelete() {
    if (window.confirm("Are you sure you want to delete this note?")) {
      await NoteAPI.deleteById(id);
      dispatch(removeNote(id));
      navigate("/");
    }
  }

  return (
    <>
      {note && (
        <NoteForm
          isEditable={isEditable}
          title={isEditable ? "Edit Note" : note.title}
          note={note}
          onSubmit={onSubmit}
          onClickEdit={setIsEditable.bind(null, !isEditable)}
          onClickDelete={onClickDelete}
        />
      )}
    </>
  );
}
