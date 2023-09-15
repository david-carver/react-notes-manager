import NoteAPI from "api/note";
import SearchBar from "components/SearchBar/SearchBar";
import NoteList from "containers/NoteList/NoteList";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeNote } from "store/notes/notes-slice";

export default function NoteBrowse() {
  const dispatch = useDispatch();
  const noteList = useSelector((store) => store.noteSlice.noteList);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredNoteList = noteList.filter(
    (note) =>
      note.title
        .trim()
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase()) ||
      note.content
        .trim()
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase())
  );

  async function onClickTrash(note) {
    if (window.confirm(`Delete note "${note.title}"?`)) {
      await NoteAPI.deleteById(note.id);
      dispatch(removeNote(note.id));
    }
  }

  return (
    <>
      <div className="row justify-content-center mb-2">
        <div className="col-sm-12 col-md-5">
          <SearchBar
            onTextChange={setSearchTerm}
            placeholder="Search your notes..."
          />
        </div>
      </div>
      {noteList.length === 0 && (
        <div className="d-flex justify-content-center">
          You don't have any notes, do you want to&nbsp;
          <Link to="/note/new">create one</Link>?
        </div>
      )}
      <NoteList onClickTrash={onClickTrash} noteList={filteredNoteList} />
    </>
  );
}
