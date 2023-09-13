import { useState } from "react";
import s from "./TextCard.module.css";
import { Trash } from "react-bootstrap-icons";

export default function TextCard({
  title,
  subtitle,
  content,
  onClick,
  onClickTrash,
}) {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isTrashHovered, setIsTrashHovered] = useState(false);

  function onClickTrashHandler(e) {
    e.stopPropagation();
    onClickTrash();
  }

  return (
    <div
      onClick={onClick}
      className={`card ${s.container} ${isCardHovered && s["card-hover"]}`}
      onMouseEnter={setIsCardHovered.bind(null, true)}
      onMouseLeave={setIsCardHovered.bind(null, false)}
    >
      <div className="card-body">
        <div className={s["title-row"]}>
          <h5 className="card-title">{title}</h5>
          <Trash
            size={20}
            className={isTrashHovered ? s["trash-hover"] : s["trash-not-hover"]}
            onMouseEnter={setIsTrashHovered.bind(null, true)}
            onMouseLeave={setIsTrashHovered.bind(null, false)}
            onClick={onClickTrashHandler}
          />
        </div>
        <h5 className={`card-subtitle mb-2 text-muted`}>{subtitle}</h5>
        <p className={`card-text ${s["text-content"]}`}>{content}</p>
      </div>
    </div>
  );
}
