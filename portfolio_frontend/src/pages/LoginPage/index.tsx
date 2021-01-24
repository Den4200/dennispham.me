import { Link } from 'react-router-dom';

import LoginForm from '../../components/LoginForm';
import './login.css'

function LoginPage() {
  return (
    <div className="login-wrapper">
      <Link className="back-btn" to="/">
        <i className="back-icon"></i>
      </Link>

      <LoginForm redirect="/" />
    </div>
  )
}

export default LoginPage;
