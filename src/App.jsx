import React from "react";
import "./global.css";
import Routes from "./routes";
//import { AuthProvider } from "./contexts/auth.context";

export default function App() {
  /*return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );*/
  return <Routes />;
}
