import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

import api from "../../services/api";
import api2 from "../../services/apiGetnet";

import Card from "../../components/Card";

export default function Dashboard() {
  const [services, setServices] = useState([
    {
      id: 1,
      created_at: 1602451429053,
      company_cnpj: "46025089000141",
      title: "Camisetas Personalizadas",
      description: "Peça camisetas personalizadas para seus eventos da empresa",
      price: 10,
      is_unitary_price: true,
      is_subscription: false,
      subscription_span: 0,
      discount_percentage: 5,
      is_active: true,
    },
    {
      id: 2,
      created_at: 1602451429053,
      company_cnpj: "29901954000157",
      title: "Campanha de Marketing",
      description: "Faça uma campanha de marketing para sua empresa",
      price: 100,
      is_unitary_price: false,
      is_subscription: true,
      subscription_span: 12,
      discount_percentage: 10,
      is_active: true,
    },
  ]);

  /*useEffect(() => {
    api
      .get("/services", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55IjoiNDYwMjUwODkwMDAxNDEiLCJpYXQiOjE2MDI0NTIwMDEsImV4cCI6MTYwMjQ1MjAwNH0.g5B8vI6qdQnATiTqbFU43XBr_20TbTIdzI4bWjcgpB0`,
        },
      })
      .then((response) => {
        setServices(response.data);
      });

    let cliendId = "3129fd3a-fa72-4b0e-a987-92a9f58de051";
    let client_secret = "a0a12fd3-c720-42e5-8b5b-938dd88973ea";
    let data = cliendId + ":" + client_secret;
    let buff = new Buffer(data);
    let base64data = buff.toString("base64");
    console.log(base64data);
    var bodyFormData = new FormData();
    bodyFormData.append("scope", "oob");
    bodyFormData.append("grant_type", "client_credentials");

    api2
      .post("/auth/oauth/v2/token", {
        data: bodyFormData,
        headers: {
          Authorization: `Basic ${base64data}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log(response);
      });
  }, []);*/

  return (
    <div className="container">
      <header id="dash-header">
        <div className="headerContent">
          <h1>Getplace</h1>
          <Link to="/me">Meu perfil</Link>
        </div>
      </header>
      <h3>Serviços para seu negócio</h3>
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
