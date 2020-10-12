import React, { useEffect, useState } from "react";
import "./styles.css";

import Header from '../../components/Header';

export default function Dashboard(props) {

  useEffect(() => {
    console.log(props);
    props.api.get('/me').then(console.log);
  }, [props]);

  return (
    <Header />
  );
}
