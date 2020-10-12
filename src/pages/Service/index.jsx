import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import Checkbox from "@material-ui/core/Checkbox";
import { FiMessageSquare, FiShoppingCart, FiSearch } from "react-icons/fi";

export default function Service(props) {
  const [service, setService] = useState({});
  const [page, setPage] = useState(1);
  useEffect(() => {
    setService(props.location.state.service);
  });

  return (
    <div>
      <div id="triangle"></div>
      <div>
        <header id="dash-header">
          <div className="headerContent">
            <h1>Getplace</h1>
            <input id="search" placeholder="Pesquisar" />
            <span
              className={page === 1 ? "page-selected" : "page-not-selected"}
            >
              Para seu negócio
            </span>
            <span
              className={page === 2 ? "page-selected" : "page-not-selected"}
            >
              Para seu negócio
            </span>
            <FiMessageSquare style={{ cursor: "pointer" }} size={30} />
            <FiShoppingCart style={{ cursor: "pointer" }} size={30} />
            <Link to="/me">Meu perfil</Link>
          </div>
          <Link to="/">Voltar</Link>
        </header>

        <h2 style={{ fontWeight: 600, marginTop: "18%", marginLeft: "15%" }}>
          {service.title}
        </h2>
        <div id="content-container">
          <div id="pictures-div">
            <div id="pictures-small">
              <div id="picture-small">&nbsp;</div>
              <div id="picture-small">&nbsp;</div>
              <div id="picture-small">&nbsp;</div>
              <div id="picture-small">&nbsp;</div>
            </div>

            <div id="picture-featured">&nbsp;</div>
          </div>

          <div id="content">
            <p>Vendido por: {service.company_cnpj}</p>
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
              <span style={{ width: "30%" }}>
                <FiShoppingCart
                  color="#fff"
                  size={20}
                  style={{ marginRight: "2%" }}
                />
              </span>

              <span style={{ color: "#fff", width: "70%" }}>
                Adicionar ao carrinho
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
