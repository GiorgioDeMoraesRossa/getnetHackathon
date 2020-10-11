import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//import { AuthContext } from "./contexts/auth.context";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Service from "./pages/Service";
import Messages from "./pages/Messages";
import HistoryService from "./pages/HistoryService";
import Buy from "./pages/Buy";

export default function Routes() {
  // const { authenticated } = useContext(AuthContext);
  let authenticated = true;
  return (
    <BrowserRouter>
      {!authenticated ? (
        <Route path="/" exact component={Login} />
      ) : (
        <Switch>
          <Route path="/" exact component={Dashboard} />
        </Switch>
      )}
      <Route path="/me" component={Profile} />
      <Route path="/Service" component={Service} />
      <Route path="/Messages" component={Messages} />
      <Route path="/History" component={HistoryService} />
      <Route path="/Buy" component={Buy} />
    </BrowserRouter>
  );
}
