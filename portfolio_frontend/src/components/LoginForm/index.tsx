import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { login } from '../../api';
import './login.css';

interface LoginFormProps {
  redirect: string
}

function LoginForm(params: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disabledForm, setDisabledForm] = useState(false);

  const history = useHistory();

  function handleUsernameChange(event: React.FormEvent<EventTarget>) {
    setUsername((event.target as HTMLInputElement).value);
  }

  function handlePasswordChange(event: React.FormEvent<EventTarget>) {
    setPassword((event.target as HTMLInputElement).value);
  }

  async function handleSubmit(event: React.FormEvent<EventTarget>) {
    event.preventDefault();

    setDisabledForm(true);
    if (await login(username, password)) {
      history.push(params.redirect);
    } else {
      (event.target as HTMLFormElement).reset();

      let secondaryHeader = document.getElementById("secondary-header")!;
      secondaryHeader.innerText = "Invalid credentials.";
      secondaryHeader.style.color = "#ec4846";
      secondaryHeader.style.animation = "none";

      setTimeout(() => {
        secondaryHeader.style.animation = "shake 0.8s";
      }, 10);

      setDisabledForm(false);
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="centering-wrapper">
        <div id="primary-header">Welcome back!</div>
        <div id="secondary-header">Enjoy your stay!</div>

        <fieldset disabled={disabledForm}>
          <div className="input-position">
            <div className="form-group">
              <h5 className="input-placeholder" id="username-text">Username</h5>

              <input
                required
                type="username"
                name="username"
                className="form-style"
                id="username"
                onChange={handleUsernameChange}
                value={username}
              />
            </div>

            <div className="form-group">
              <h5 className="input-placeholder" id="password-text">
                Password
              </h5>

              <input
                required
                type="password"
                name="password"
                className="form-style"
                id="password"
                onChange={handlePasswordChange}
                value={password}
              />
            </div>
          </div>

          <input type="submit" value="Login" className="login-btn" />
        </fieldset>
      </div>
    </form>
  )
}

export default LoginForm;
