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
  const [isAuthenticated, authenticate, requester] = useAuthentication();

  useEffect(() => {
    if (!isAuthenticated) authenticate();
  }, [isAuthenticated, authenticate]);

  return !isAuthenticated ? <Login authCallback={authenticate} /> : (
    <Router baseRoute={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/" exact component={() => <Home api={requester} />} />
        <Route path="/me" component={() => <Profile api={requester} />} />
        <Route path="/Service" component={() => <Service api={requester} />} />
        <Route path="/Messages" component={() => <Messages api={requester} />} />
        <Route path="/History" component={() => <HistoryService api={requester} />} />
        <Route path="/Buy" component={() => <Buy api={requester} />} />
      </Switch>
    </Router>
  );
}
