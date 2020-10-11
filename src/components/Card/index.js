import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Card(props) {
  return (
    <Link
      id="container-card"
      to={{
        pathname: "/Service",
        state: { service: props.service },
      }}
      onClick={() => console.log(props.service)}
    >
      <h4>{props.service.title}</h4>
      <p>{props.service.description}</p>
      <span>R${props.service.price}</span>
      <p>Desconto de {props.service.discount_percentage}%!</p>
    </Link>
  );
}
