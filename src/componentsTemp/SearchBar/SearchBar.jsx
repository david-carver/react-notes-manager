import s from "./SearchBar.module.css";
import { Search as SearchIcon } from "react-bootstrap-icons";

export default function SearchBar({ onTextChange, placeholder }) {
  function onChange(e) {
    onTextChange(e.target.value);
  }

  return (
    <>
      <SearchIcon size={25} className={s.icon} />
      <input
        type="text"
        className={s.input}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
}
