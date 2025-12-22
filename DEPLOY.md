# 部署指南

本项目已配置 Docker 和 Docker Compose，支持一键部署。

## 准备工作

- 服务器上已安装 [Docker](https://docs.docker.com/get-docker/)。
- 已安装 [Docker Compose](https://docs.docker.com/compose/install/) (通常随 Docker Desktop 一起安装)。

## 部署步骤

1.  **文件传输**：将项目文件复制到您的服务器（排除 `node_modules`、`.next` 等，这些由 `.dockerignore` 处理）。主要需要：
    - `src/`
    - `public/`
    - `next.config.ts`
    - `package.json`
    - `yarn.lock` (或 `package-lock.json`)
    - `Dockerfile`
    - `.dockerignore`
    - `docker-compose.yml`

    *或者，直接在服务器上克隆 git 仓库。*

2.  **构建并运行**：
    在项目根目录下运行以下命令：

    ```bash
    docker compose up -d --build
    ```

    - `-d`: 在后台运行容器。
    - `--build`: 强制重新构建镜像，确保使用最新代码。

3.  **验证**：
    应用程序现在应该在 `3000` 端口（或您配置的端口）上运行。您可以通过以下方式访问验证：
    `http://<您的服务器IP>:3000`

## 更新

要部署更新，只需获取最新代码并再次运行步骤 2 的命令：

```bash
docker compose up -d --build
```
这将使用新代码重建镜像并以最小的停机时间重新创建容器。

## 环境变量

如果服务器上需要环境变量（例如 API 密钥），请创建一个 `.env.production` 文件（或 `.env`），并在 `docker-compose.yml` 的 `env_file` 下引用它：

```yaml
services:
  next-app:
    ...
    env_file:
      - .env.production
```

### 常用变量

- `PORT`: 应用程序的访问端口 (默认: 3000)。
- `DATABASE_URL`: 您的数据库连接字符串。
