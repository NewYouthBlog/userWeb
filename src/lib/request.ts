import axios from "axios";

const trimTrailingSlash = (url: string) => url.replace(/\/+$/, "");

const configuredBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  process.env.INTERNAL_API_URL;

const baseUrl = trimTrailingSlash(
  configuredBaseUrl ||
    (process.env.NODE_ENV === "development" ? "http://localhost:3001" : ""),
);

const request = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});

export default request;
