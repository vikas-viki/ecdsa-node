import axios from "axios";

const server = axios.create({
  baseURL: "https://ecdsa-node-bkjv.onrender.com",
});

export default server;
