import s from "./Input.module.css";

export default function Input({ onTextChange, placeholder, type }) {
  function onChange(e) {
    onTextChange(e.target.value);
  }

  return (
    <>
      <input
        type={type || "text"}
        className={s.input}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
}
