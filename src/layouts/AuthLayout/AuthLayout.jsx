import s from "./AuthLayout.module.css";
import { ReactComponent as LogoSVG } from "assets/images/logo.svg";

export default function AuthLayout({ children }) {
  const header = (
    <div className={s.header}>
      <LogoSVG className={s["logo-top"]} />
      <h3 className={s.logoTitle}>Notomatic</h3>
    </div>
  );

  const background = (
    <div className={s.background}>
      <div className="d-flex">
        <LogoSVG className={s.logo} />
        <h1 className={s.backgroundTitle}>Notomatic</h1>
      </div>
      <p>One place for all team notes</p>
    </div>
  );

  return (
    <div className={s.root}>
      {header}
      <div className={s["left-section"]}>{children}</div>
      <div className={` ${s["right-section"]} d-none d-lg-flex`}>
        {background}
      </div>
    </div>
  );
}
