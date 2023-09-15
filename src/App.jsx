import NoteAPI from "api/note";
import Header from "components/Header/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setNoteList } from "store/notes/notes-slice";
import s from "./App.module.css";
import withAuthRequired from "hoc/withAuthRequired";
import ButtonPrimary from "components/ButtonPrimary/ButtonPrimary";

function Application() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function fetchAllNotes() {
    const noteList = await NoteAPI.fetchAll();
    dispatch(setNoteList(noteList));
  }

  useEffect(() => {
    fetchAllNotes();
  });

  return (
    <div>
      <Header />
      <ButtonPrimary
        className={s["button-add"]}
        onClick={navigate.bind(null, "/note/new")}
      >
        +
      </ButtonPrimary>
      <div className={s.workspace}>
        <Outlet />
      </div>
    </div>
  );
}

const App = withAuthRequired(Application);
export default App;
