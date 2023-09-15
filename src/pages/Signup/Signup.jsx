import s from "./Signup.module.css";
import ButtonPrimary from "components/ButtonPrimary/ButtonPrimary";
import { Link, useNavigate } from "react-router-dom";
import Input from "components/Input/Input";
import AuthLayout from "layouts/AuthLayout/AuthLayout";
import { useState } from "react";
import AuthApi from "api/auth";
import { useDispatch } from "react-redux";
import { setUser } from "store/auth/auth-slice";
import { toast } from "utils/sweet-alert";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    if (password === password2) {
      try {
        const user = await AuthApi.signup(email, password);
        if (user) {
          dispatch(setUser(user));
          toast("success", "Account created successfully");
          navigate("/");
        }
      } catch (_) {
        toast("error", "Username already in use");
      }
    } else {
      toast("error", "Passwords do not match", 3000);
    }
  }

  const form = (
    <div className={s["form-container"]}>
      <h2 className={s.title}>
        Signup <br /> to access your team notes
      </h2>
      <form onSubmit={submit} className={s["form-group"]}>
        <Input placeholder="Email" onTextChange={setEmail} />
        <Input
          placeholder="Password"
          type="password"
          onTextChange={setPassword}
        />
        <Input
          placeholder="Password"
          type="password"
          onTextChange={setPassword2}
        />
        <ButtonPrimary type="submit" className={s.button}>
          Sign up!
        </ButtonPrimary>
        <span>
          Already have an account? <Link to="/signin">Sign in!</Link>
        </span>
      </form>
    </div>
  );

  return <AuthLayout>{form}</AuthLayout>;
}
