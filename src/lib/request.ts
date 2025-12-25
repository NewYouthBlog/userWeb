import axios from "axios";

const baseUrl =
  process.env.API_URL ||
  process.env.INTERNAL_API_URL ||
  (typeof window !== "undefined"
    ? "/api"
    : process.env.NEXT_PUBLIC_BASE_URL
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api`
      : "http://localhost:3000/api");

const request = axios.create({
  baseURL: baseUrl,
  validateStatus() {
    return true;
  },
});

export default request;
