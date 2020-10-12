import React, { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import useAuthentication from "./hooks/useAuthentication";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Service from "./pages/Service";
import Messages from "./pages/Messages";
import HistoryService from "./pages/HistoryService";
import Buy from "./pages/Buy";

export default function Routes() {
  const [isDefAuthenticated, setDefAuthenticated] = useState(false);
  const [isAuthenticated, authenticate] = useAuthentication();

  useEffect(() => {
    if (!isAuthenticated) {
      authenticate().then(setDefAuthenticated);
    }
  }, [isAuthenticated, authenticate]);

  return !isDefAuthenticated ? <Login authCallback={authenticate}/> : (
    <Router baseRoute={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/me" component={Profile} />
        <Route path="/Service" component={Service} />
        <Route path="/Messages" component={Messages} />
        <Route path="/History" component={HistoryService} />
        <Route path="/Buy" component={Buy} />
      </Switch>
    </Router>
  );
}
