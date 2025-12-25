import axios from "axios";

// 判断当前是否在服务端环境
const isServer = typeof window === 'undefined';

// 获取正确的 Base URL
const getBaseUrl = () => {
  // 1. 如果是在服务端 (SSR/ISG)
  if (isServer) {
    // 这里必须使用 Docker 内部的绝对路径！
    // 格式：http://<docker-compose里的服务名>:<端口>
    // 例如：http://backend-service:3000
    return process.env.INTERNAL_API_URL || 'http://127.0.0.1:3000';
  }

  // 2. 如果是在客户端 (浏览器)
  // 直接用相对路径，让 Nginx 去处理 HTTPS 和反向代理
  return '/api';
};
const request = axios.create({
  baseURL: getBaseUrl(),
  validateStatus() {
    return true;
  },
});

export default request;
