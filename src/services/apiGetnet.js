import axios from "axios";

const api = axios.create({
  baseURL: "https://api-homologacao.getnet.com.br",
});
export default api;
