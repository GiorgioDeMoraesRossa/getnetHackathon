import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <header>
        <Link to="/">Voltar</Link>
      </header>
      <body>
        <Link to="/cards">Cartões</Link>
        <Link to="/products">Produtos e serviços cadastrados</Link>
        <Link to="/transactions">Historico de transações</Link>
        <Link to="/pending">Compras e vendas pendentes</Link>
      </body>
    </div>
  );
}
