import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import Checkbox from "@material-ui/core/Checkbox";

export default function Service(props) {
  const [service, setService] = useState({});
  console.log(props);
  useEffect(() => {
    setService(props.location.state.service);
  });

  return (
    <div>
      <div>
        <header className="headerContent" style={{ margin: 20 }}>
          <Link to="/">Voltar</Link>
        </header>
        <div id="container-service">
          <div id="content">
            <h3>{service.title}</h3>
            <p>Empresa: {service.company_cnpj}</p>
            <span>{service.description}</span>
            <div>
              Preço unitário
              <Checkbox checked={service.is_unitary_price === true} disabled />
            </div>
            <span style={{ alignSelf: "center" }}>
              Preço: R$ {service.price}
            </span>
            <Link
              id="button-pay"
              style={{ marginTop: 5, alignSelf: "center" }}
              to={{
                pathname: "/buy",
                state: { price: service.price, cnpj: service.cnpj },
              }}
            >
              <span>Comprar</span>
            </Link>
          </div>
          <div id="div-buttons">
            <Link to="/history">Historico</Link>{" "}
            <Link to="/messages">Mensagens</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
