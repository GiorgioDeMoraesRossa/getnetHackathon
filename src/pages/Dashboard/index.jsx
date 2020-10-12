import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMessageSquare,
  FiShoppingCart,
  FiSearch,
} from "react-icons/fi";

import Card from "../../components/Card";

export default function Dashboard({ api }) {
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    api.get('/services').then(setServices);
  }, [api]);

  return (
    <div className="container">
      <header id="dash-header">
        <div className="headerContent">
          <h1>Getplace</h1>
          <input id="search" placeholder="Pesquisar" />
          <span className={page === 1 ? "page-selected" : "page-not-selected"}>
            Para seu negócio
          </span>
          <span className={page === 2 ? "page-selected" : "page-not-selected"}>
            Para seu negócio
          </span>
          <FiMessageSquare style={{ cursor: "pointer" }} size={30} />
          <FiShoppingCart style={{ cursor: "pointer" }} size={30} />
          <Link to="/me">Meu perfil</Link>
        </div>
      </header>
      <div id="featured-div">
        <img id="image-div banner-img" src={"https://picsum.photos/1200/300"} alt="oferta" />
        <div id="div-arr">
          <FiChevronLeft
            id="arr-left"
            size={30}
            onClick={() => alert("Oferta anterior")}
          />
          <FiChevronRight
            id="arr-right"
            size={30}
            onClick={() => alert("Próxima oferta")}
          />
        </div>
      </div>
      <div id="pos-featured">
        <h3>Serviços para seu negócio</h3>
        <div id="content-dash">
          {services !== []
            ? services.map((service) => (
                <Card key={service.id} service={service} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
