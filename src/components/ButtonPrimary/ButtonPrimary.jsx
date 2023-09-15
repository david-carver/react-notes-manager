import s from "./ButtonPrimary.module.css";

export default function ButtonPrimary({
  type,
  children,
  onClick,
  isDisabled,
  className,
}) {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      type={type || "button"}
      className={`btn btn-primary ${s.button} ${className}`}
    >
      {children}
    </button>
  );
}
