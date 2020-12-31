import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Loading from './components/Loading';
import NavBar from './components/NavBar';

const IndexPage = React.lazy(() => import('./pages/index/IndexPage'));
const ProjectsPage = React.lazy(() => import('./pages/projects/ProjectsPage'));

const routes = [
  { path: '/', Component: IndexPage },
  { path: '/projects', Component: ProjectsPage },
]

function App() {
  return (
    <Router>
      <NavBar />

      <Switch>
        {routes.map(({path, Component}) => (
          <Route exact key={path} path={path}>
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
