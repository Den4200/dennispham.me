import React, { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { isAuthenticated } from '../../api';
import Loading from '../Loading';

const PrivateSuspenseRoute = ({ component, ...rest }: any) => (
  <Suspense fallback={<Loading />}>
    <Route {...rest} render={props => (
      isAuthenticated()
        ? React.createElement(component, props)
        : <Redirect to={{ pathname: "/auth/login", state: { from: props.location } }} />
    )} />
  </Suspense>
);

export default PrivateSuspenseRoute;
