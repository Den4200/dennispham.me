import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/navbar/NavigationBar';

const IndexPage = React.lazy(() => import('./pages/index/IndexPage'));

const routes = [
  { path: '/', Component: IndexPage },
]

function App() {
  return (
    <Router>
      <NavBar />

      <Switch>
        {routes.map(({path, Component}) => (
          <Route exact key={path} path={path}>
            <Suspense fallback={<div>Loading..</div>}>
              <Component />
            </Suspense>
          </Route>
        ))}
      </Switch>
    </Router>
  );
}

export default App;
