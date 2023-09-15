import NoteAPI from "api/note";
import NoteForm from "components/NoteForm/NoteForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNote } from "store/notes/notes-slice";

export default function NoteCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function submitForm(values) {
    const createdNote = await NoteAPI.create({
      ...values,
      created_at: new Date().toLocaleDateString(),
    });
    dispatch(addNote(createdNote));
    navigate("/");
  }

  return (
    <>
      <NoteForm title="New Note" onSubmit={submitForm} />
    </>
  );
}
