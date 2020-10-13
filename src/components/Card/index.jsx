import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
export default function Card({ service }) {
  return (
    <Link
      className="container-card"
      to={`/service/${service.id}`} 
    >
      <div className="discount-div">
        <p> {service.discount_percentage}% Off</p>
      </div>

      <img className="offer-img" src={"https://picsum.photos/280/200?random=" + Math.floor(Math.random() * 1000)} alt="Imagem do serviço" />
      <h4>{service.title}</h4>
      <p>{service.description}</p>
      <span>De: R${(service.price / 0.95).toFixed(2)}</span>
      <span>Por: R${service.price}</span>
    </Link>
  );
}
