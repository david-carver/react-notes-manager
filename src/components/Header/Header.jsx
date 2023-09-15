import { Logo } from "components/Logo";
import s from "./Header.module.css";
import logoSrc from "assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "store/auth/auth-selectors";
import AuthApi from "api/auth";
import { removeUser } from "store/auth/auth-slice";

export default function Header() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  function signout() {
    AuthApi.signout();
    navigate("/signin");
    dispatch(removeUser());
  }

  function renderAuthProfile() {
    return (
      <div>
        <img
          src={`https://api.dicebear.com/5.x/bottts/svg?seed=${user.email}`}
          className={`rounded-circle ${s.avartar}`}
          alt="avatar"
        />
        <div className={s["user-name"]}>Hello, {user.email}</div>
        <Link onClick={signout}>Sign out</Link>
      </div>
    );
  }

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
      <div className="col-xs-12 col-sm-8 text-end">{renderAuthProfile()}</div>
    </div>
  );
}
