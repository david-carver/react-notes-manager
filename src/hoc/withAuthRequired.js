import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "store/auth/auth-selectors";

export default function withAuthRequired(Component) {
  return function ProtectedComponent(props) {
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    useEffect(() => {
      if (!user) {
        navigate("/signin");
      }
    }, [user]);

    return user && <Component {...props} />;
  };
}
