import s from "./NoteList.module.css";
import TextCard from "components/TextCard/TextCard";
import { useNavigate } from "react-router-dom";

export default function NoteList({ onClickTrash, noteList }) {
  const navigate = useNavigate();

  return (
    <div className={`row justify-content-center`}>
      {noteList.map((note, index) => (
        <div className={s["card-container"]} key={index}>
          <TextCard
            title={note.title}
            subtitle={note.created_at}
            content={note.content}
            onClick={navigate.bind(null, `/note/${note.id}`)}
            onClickTrash={onClickTrash?.bind(null, note)}
          />
        </div>
      ))}
    </div>
  );
}
