import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import "./styles.css";
import { FiMessageSquare, FiShoppingCart } from "react-icons/fi";

import iFrameBuilder from '../../services/iframe';

export default function Service({ api }) {
  const router = useRouteMatch();
  const builder = iFrameBuilder(api);
  const [quantity, setQuantity] = useState(1);
  const [willBuy, setWillBuy] = useState(false);
  const [service, setService] = useState({
    id: 0,
    created_at: Date.now(),
    company_cnpj: "46025089000141",
    title: "Carregando...",
    "description": "Carregando...",
    "price": 0,
    "is_unitary_price": true,
    "is_subscription": false,
    "subscription_span": 0,
    "discount_percentage": 5,
    "is_active": true
});
  const [page, setPage] = useState(0);

  useEffect(() => {
    api.get('/services/' + router.params.id).then(setService);
  }, [router, api]);

  async function handleTrade() {
    await builder(service.is_unitary_price ? service.price * quantity : service.price, () => setWillBuy(true));
  }

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
            {service.is_unitary_price && <div>
              Quantidade <input type="number" placeholder="1" min="0" value={quantity} onChange={e => setQuantity(e.target.value || 0)}/>
            </div>}
            <span style={{ alignSelf: "center" }}>
              Preço: R$ {service.is_unitary_price ? service.price * quantity : service.price}
            </span>

            {!willBuy ? <button
              id="button-pay"
              style={{ marginTop: 5, alignSelf: "center", cursor: "pointer"}}
              onClick={handleTrade}
            >
              <span style={{ width: "30%" }}>
                <FiShoppingCart
                  color="#fff"
                  size={20}
                  style={{ marginRight: "2%" }}
                />
              </span>

              <span style={{ color: "#fff", width: "70%" }}>
                Gerar compra
              </span>
            </button> : <button
              id="button-pay"
              className="__triggerClass"
              style={{ marginTop: 5, alignSelf: "center", cursor: "pointer"}}
            >
              <span style={{ width: "30%" }}>
                <FiShoppingCart
                  color="#fff"
                  size={20}
                  style={{ marginRight: "2%" }}
                />
              </span>

              <span style={{ color: "#fff", width: "70%" }}>
                Pagar
              </span>
            </button>}
          </div>
        </div>
      </div>
    </div>
  );
}
