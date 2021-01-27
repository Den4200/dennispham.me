import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { logout } from '../../api';

const LogoutPage = () => {
  useEffect(() => {
    logout();
  }, []);

  return <Redirect to="/" />;
};

export default LogoutPage;
