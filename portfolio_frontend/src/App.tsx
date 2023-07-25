import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import PrivateSuspenseRoute from "./components/PrivateSuspenseRoute";
import { GraphDataProvider } from "./hooks/contribGraph";

const IndexPage = React.lazy(() => import("./pages/IndexPage"));
const ProjectsPage = React.lazy(() => import("./pages/ProjectsPage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));

const AdminPage = React.lazy(() => import("./pages/AdminPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const LogoutPage = React.lazy(() => import("./pages/LogoutPage"));

const routes = [
  { path: "/", Component: IndexPage },
  { path: "/projects", Component: ProjectsPage },
  { path: "/about", Component: AboutPage },
  { path: "/auth/login", Component: LoginPage },
  { path: "/auth/logout", Component: LogoutPage },
];

const adminRoutes = [{ path: "/admin", Component: AdminPage }];

function App() {
  return (
    <Router>
      <Switch>
        <GraphDataProvider>
          {routes.map(({ path, Component }) => (
            <Route exact key={path} path={path}>
              {path.startsWith("/auth") ? null : <NavBar />}

              <Suspense fallback={<Loading />}>
                <Component />
              </Suspense>
            </Route>
          ))}

          {adminRoutes.map(({ path, Component }) => (
            <PrivateSuspenseRoute
              exact
              key={path}
              path={path}
              component={Component}
              fallback={<Loading />}
            />
          ))}
        </GraphDataProvider>
      </Switch>
    </Router>
  );
}

export default App;
