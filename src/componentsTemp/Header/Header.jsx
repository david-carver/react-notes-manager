import { Logo } from "componentsTemp/Logo";
import s from "./Header.module.css";
import logoSrc from "assets/images/logo.png";
import ButtonPrimary from "componentsTemp/ButtonPrimary/ButtonPrimary";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className={`row ${s.container}`}>
      <div className="col-xs-12 col-sm-4">
        <Logo
          title="Notomatic"
          subtitle="Manage your notes"
          image={logoSrc}
          onClick={navigate.bind(null, "/")}
        />
      </div>
      <div className="col-xs-12 col-sm-8 text-end">
        <ButtonPrimary onClick={navigate.bind(null, "/note/new")}>
          Add Note +
        </ButtonPrimary>
      </div>
    </div>
  );
}
