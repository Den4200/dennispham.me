import { Link } from 'react-router-dom';

import LoginForm from '../../components/LoginForm';
import './login.css'

const LoginPage = () => (
  <div className="login-wrapper">
    <Link className="back-btn" to="/">
      <i className="back-icon"></i>
    </Link>

    <LoginForm redirect="/admin" />
  </div>
);

export default LoginPage;
