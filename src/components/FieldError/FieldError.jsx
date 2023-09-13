import s from "./FieldError.module.css";

export default function FieldError({ msg }) {
  return (
    <>
      <span className={s.container}>{msg}</span>
    </>
  );
}
