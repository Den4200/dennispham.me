import { Link, Redirect } from "react-router-dom";

import LoginForm from "../../components/LoginForm";
import { isAuthenticated } from "../../api";
import "./login.css";

const LoginPage = () => {
  if (isAuthenticated()) {
    return <Redirect to="/admin" />;
  }

  return (
    <div className="login-wrapper">
      <Link className="back-btn" to="/">
        <i className="back-icon"></i>
      </Link>

      <LoginForm redirect="/admin" />
    </div>
  );
};

export default LoginPage;
