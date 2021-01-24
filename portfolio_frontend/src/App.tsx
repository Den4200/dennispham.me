import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Loading from './components/Loading';
import NavBar from './components/NavBar';

const IndexPage = React.lazy(() => import('./pages/IndexPage'));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));

const LoginPage = React.lazy(() => import('./pages/LoginPage'));

const routes = [
  { path: '/', Component: IndexPage },
  { path: '/projects', Component: ProjectsPage },
  { path: '/about', Component: AboutPage },
  { path: '/admin/login', Component: LoginPage },
]

function App() {
  return (
    <Router>
      <Switch>
        {routes.map(({path, Component}) => (
          <Route exact key={path} path={path}>
            {(!path.startsWith("/admin")) ? <NavBar /> : ""}

            <Suspense fallback={<Loading />}>
              <Component />
            </Suspense>
          </Route>
        ))}
      </Switch>
    </Router>
  );
}

export default App;
