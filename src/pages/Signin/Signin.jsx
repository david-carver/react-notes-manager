import ButtonPrimary from "components/ButtonPrimary/ButtonPrimary";
import s from "./Signin.module.css";
import { Link, useNavigate } from "react-router-dom";
import Input from "components/Input/Input";
import AuthLayout from "layouts/AuthLayout/AuthLayout";
import { useState } from "react";
import AuthApi from "api/auth";
import { useDispatch } from "react-redux";
import { setUser } from "store/auth/auth-slice";
import { toast } from "utils/sweet-alert";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    try {
      const user = await AuthApi.signin(email, password);
      if (user) {
        dispatch(setUser(user));
        navigate("/");
      }
    } catch (_) {
      toast("error", "Invalid Credentails");
    }
  }

  const form = (
    <div className={s["form-container"]}>
      <h2 className={s.title}>
        Signin <br /> to access your team notes
      </h2>
      <form onSubmit={submit} className={s["form-group"]}>
        <Input placeholder="Email" onTextChange={setEmail} />
        <Input
          placeholder="Password"
          type="password"
          onTextChange={setPassword}
        />
        <ButtonPrimary type="submit" className={s.button}>
          Sign in!
        </ButtonPrimary>
        <span>
          Don't have an account yet? <Link to="/signup">Sign up!</Link>
        </span>
      </form>
    </div>
  );

  return <AuthLayout>{form}</AuthLayout>;
}
