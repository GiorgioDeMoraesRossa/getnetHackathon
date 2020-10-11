import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

import api from "../../services/api";

import Card from "../../components/Card";

export default function Dashboard() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api
      .get("/services", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55IjoiNDYwMjUwODkwMDAxNDEiLCJpYXQiOjE2MDI0MzE0ODAsImV4cCI6MTYwMjQzNTA4MH0.F8FsNiPmm33CKaarQw8KdjnvGjQxY_zU5dp71TnnZhM`,
        },
      })
      .then((response) => {
        setServices(response.data);
      });
  }, []);

  return (
    <div className="container">
      <header>
        <div className="headerContent">
          <h1>Dashboard</h1>
          <Link to="/me">Meu perfil</Link>
        </div>
      </header>
      <body id="content-dash">
        {services !== []
          ? services.map((service) => (
              <Card key={service.id} service={service} />
            ))
          : null}
      </body>
    </div>
  );
}
