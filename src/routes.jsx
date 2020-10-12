import React, { useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import useAuthentication from "./hooks/useAuthentication";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Service from "./pages/Service";
import Messages from "./pages/Messages";
import HistoryService from "./pages/HistoryService";
import Buy from "./pages/Buy";

export default function Routes() {
  const [isAuthenticated, authenticate, requester] = useAuthentication();

  useEffect(() => {
    if (!isAuthenticated) authenticate();
  }, [isAuthenticated, authenticate]);

  return !isAuthenticated ? <Login authCallback={authenticate} /> : (
    <Router baseRoute={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/" exact component={(...props) => <Dashboard {...props} api={requester} />} />
        <Route path="/me" component={(...props) => <Profile {...props} api={requester} />} />
        <Route path="/service/:id" component={(...props) => <Service {...props} api={requester} />} />
        <Route path="/Messages" component={(...props) => <Messages {...props} api={requester} />} />
        <Route path="/History" component={(...props) => <HistoryService {...props} api={requester} />} />
        <Route path="/Buy" component={(...props) => <Buy {...props} api={requester} />} />
      </Switch>
    </Router>
  );
}
