import axios from "axios";

const baseUrl = "http://localhost:3001";

const request = axios.create({
  baseURL: baseUrl,
  validateStatus() {
    return true;
  },
});

export default request;
