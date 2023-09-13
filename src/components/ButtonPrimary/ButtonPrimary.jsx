import s from "./ButtonPrimary.module.css";

export default function ButtonPrimary({ children, onClick, isDisabled }) {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      type="button"
      className={`btn btn-primary ${s.button}`}
    >
      {children}
    </button>
  );
}
