import React, { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { isAuthenticated } from '../../api';

const PrivateSuspenseRoute = ({ component, fallback, ...rest }: any) => (
  <Suspense fallback={fallback}>
    <Route {...rest} render={props => (
      isAuthenticated()
        ? React.createElement(component, props)
        : <Redirect to={{ pathname: "/auth/login", state: { from: props.location } }} />
    )} />
  </Suspense>
);

export default PrivateSuspenseRoute;
