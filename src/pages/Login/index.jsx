import React, { useState } from "react";
import "./styles.css";

import { authenticate } from '../../services/api';

const Login = ({ authCallback }) => {
  // const history = useHistory();
  const [cnpj, setCnpj] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    const isAuthenticated = await authenticate(cnpj.replace(/\D/g, ''), password);
    if (!isAuthenticated) return;
    
    await authCallback();
  }

  return (
    <div className="full-height centered-container">
      <div className="login-form">
        <h1 className="title">Getplace</h1>
        <div className="field">
          <label className="label">CNPJ</label>
          <p className="control">
            <input className="input login-input" type="text" placeholder="00.000.000/0000-00" onChange={e => setCnpj(e.target.value.replace(/\D/g, ''))} value={cnpj} />
          </p>
        </div>

        <div className="field">
          <label className="label">Senha</label>
          <p className="control">
            <input className="input login-input" type="password" placeholder="Senha" onChange={e => setPassword(e.target.value)} value={password} />
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button className="button is-danger" onClick={handleLogin} disabled={!password || !cnpj}>
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;