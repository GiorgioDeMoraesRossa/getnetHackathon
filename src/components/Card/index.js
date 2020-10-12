import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { FiArrowDown } from "react-icons/fi";
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
      <div id="discount-div">
        <FiArrowDown size={15} color="#fff" />
        <p> {props.service.discount_percentage}%</p>
      </div>

      <img id="image-div" src={"https://picsum.photos/280/200"} />
      <h4>{props.service.title}</h4>
      <p>{props.service.description}</p>
      <span>R${props.service.price}</span>
    </Link>
  );
}
