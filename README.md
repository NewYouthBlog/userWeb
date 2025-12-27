## 导言
建过好几次站，虽然都没有坚持下去，但还是记录一下，本次使用的是穷鬼一条龙，前半部分的非服务器操作各个平台大同小异，只是国内操作需要多一步备案。后半部分服务器操作，因人而异，我使用的是自己博客项目，部署情况完全不一样，如果是使用其他博客项目（WordPress、hexo等）自己去找他们官网教程，很快就能用上。

## 购买域名

直接找一些知名的域名商，国内外都有不少选择：

#### 国内域名商

- **阿里云（万网）**：国内最大，价格适中，需要实名认证
- **腾讯云**：价格有时比阿里便宜，活动多
- **华为云**：偶尔有新人优惠

**优点**：支付方便（支付宝/微信），中文客服，续费提醒及时
**缺点**：必须实名认证，后续建站需要备案（约 7-20 天）

#### 国外域名商

- **Namesilo**：价格便宜，免费隐私保护，支持支付宝 (**本教程案例**)
- **Cloudflare Registrar**：按成本价出售，无溢价，但需要先托管域名到 CF
- **Namecheap**：老牌商家，界面友好，首年优惠多

**优点**：不需要实名，不需要备案，隐私保护好
**缺点**：支付稍麻烦（信用卡/PayPal），续费价格可能比首年贵

#### 注意事项

1. **如果你有国内服务器或想用国内 CDN**：必须在国内买域名 + 备案
2. **如果用国外服务器（如 Cloudflare、Vercel）**：推荐国外域名商，省去备案麻烦
3. **域名后缀选择**：
   - `.com` 最通用，但热门词可能被抢注
   - `.cn` 国内域名，必须备案
   - `.org` / `.net` 也不错，价格相近
   - `.top` 非常便宜


## Cloudflare 域名托管（可选）

**如果你不想用 Cloudflare 的 CDN 和 R2 存储**，可以直接在域名服务商里做 DNS 解析，跳过本节，直接看 [使用第三方对象存储](#使用第三方对象存储可选) 部分。

#### 为什么要用 Cloudflare？

**优势：**
- 免费的 CDN 服务（全球节点加速）
- R2 对象存储基本免费（10GB 存储 + 无限流量），做个人站完全够用
- 免费的 DDoS 防护、SSL 证书
- 流量统计、防火墙规则等实用功能

**劣势：**
- 免费版在国内速度一般，号称"减速 CDN"（但对国外小鸡服务器还是有帮助的）
- R2 存储需要绑定信用卡（国内双币卡也行，不会扣费）

#### 操作流程

**1. 添加域名到 Cloudflare**

注册好 Cloudflare 账号后，进入控制面板，点击"加入域"。

![](https://img.neotalks.org/2025/12/f0d8d0b57c18d1b1280c6fcdfd13f894.png)

**2. 输入你的域名**

![](https://img.neotalks.org/2025/12/f22ad7b97beedcfba45236bce79c2a67.png)

**3. 选择免费计划**

既然要白嫖，肯定选 Free 计划。

![](https://img.neotalks.org/2025/12/29ce0d5e023240e04cf360df7caec350.png)

**4. 添加 DNS 记录**

一般情况是默认自己给你解析出现有的 DNS（如下图）如果没有，点击"添加记录"后，按照以下步骤添加。

- **类型**：选择 `A`
- **名称**：填 `@`（代表根域名）或二级域名前缀（如 `admin`）
- **内容**：填入你的服务器 IP 地址
- **代理状态**：**小黄云必须是橙色**（Proxied），才能启用 CDN 和防护

> **提示**：如果需要添加二级域名（如 `admin.yourdomain.com`），现在就可以点击"添加记录"，类型选 `A`，名称填 `admin`，内容填服务器 IP。

![](https://img.neotalks.org/2025/12/8fa18b7ffd428055bb7aed3af235e07e.png)

**5. 修改域名服务商的 NameServers**

Cloudflare 会给你两个 NameServer 地址（类似 `xxx.ns.cloudflare.com`），复制它们。

回到你的域名服务商（以 Namesilo 为例），点击域名管理，找到 NameServers 设置，替换成 Cloudflare 提供的两个地址。

![](https://img.neotalks.org/2025/12/315bcc04ddac3fc13dcc8b6ae5cd7c5a.png)

**6. 删除原有 DNS 解析记录**

在域名服务商的 DNS 管理页面，删除所有原有的解析记录（因为现在由 Cloudflare 全权托管）。

![](https://img.neotalks.org/2025/12/e681a4c53334c49b444b62d101186606.png)

**7. 等待生效**

等待几分钟到几小时（通常 10 分钟内），返回 Cloudflare 后台，看到下图界面就代表托管成功。

![](https://img.neotalks.org/2025/12/b1ef61f5e06792748d1c3d46cff24788.png)

如果一直停留在"等待 NameServer 更新"页面，说明还没生效，耐心等待即可。也可能是自己设置不对。


## 使用第三方对象存储（可选）

#### 为什么需要对象存储？

如果你的博客需要存储大量图片、视频等静态资源，直接放在服务器上会有以下问题：
- 占用服务器磁盘空间，小鸡很快就满了
- 消耗服务器带宽，影响网站访问速度
- 备份和迁移麻烦

使用对象存储可以：
- 把静态资源分离出去，服务器只跑业务逻辑
- 利用 CDN 加速
- 按需付费，成本可控（甚至免费）

#### 怎么选？

| 维度 | Cloudflare R2 | 腾讯云 COS / 阿里云 OSS | Backblaze B2 |
| :--- | :--- | :--- | :--- |
| **适用人群** | 不想备案、面向全球、不想付流量费 | 已备案、追求国内极致速度 | 存储量巨大、极客玩家 |
| **存储费用** | 10GB 免费，超出便宜 | 需买资源包（便宜） | 10GB 免费，超出极便宜 |
| **流量费用** | $0（免费） | 按量计费（要注意） | 配合 CF CDN 免费 |
| **国内速度** | 一般（视地区而定） | 极快 | 一般 |
| **备案要求** | 不需要 | 必须 | 不需要 |

**推荐方案**：
- 如果你用国外服务器 + Cloudflare，直接选 **R2**，免费额度够用，流量完全免费
- 如果你已经备案且用国内服务器，选 **腾讯云 COS** 或 **阿里云 OSS**，速度最快
- 如果你是数据狂魔，存储量超大，可以研究 **Backblaze B2**

本教程使用的 Cloudflare 需要**信用卡！！**, 可是他真的免费。

#### 怎么做？

以 Cloudflare R2 为例, 其他都是类似的，只需要找到你服务商对象储存的入口就行。

**第 1 步：创建 R2 存储桶（Bucket）**

进入 Cloudflare 控制台，左侧菜单找到 **储存和数据库**，点击 **创建储存桶**。

![](https://img.neotalks.org/2025/12/09d409645ca98cb3d9627c7503eeac14.png)

填写配置：
- **储存桶名称**：起个名字（如 `blog-img`），只能用小写字母、数字和短横线
- **位置**：默认 `Automatic` 即可，会自动根据上传位置分配

点击 **Create Bucket** 完成创建。

---

**第 2 步：绑定自定义域名（关键步骤）**

R2 自带的 `r2.dev` 链接通常很慢或被墙，博客必须用自定义域名才能正常访问。

1.  进入你刚才创建的 Bucket 页面
2.  点击顶部的 **Settings**（设置）标签
3.  向下滑动找到 **Public access**（公开访问）区域
4.  点击 **Connect Domain**（添加）
5.  输入你想用的二级域名，例如 `img.yourdomain.com`  
    （前提是 `yourdomain.com` 已经在 Cloudflare 解析，[参见此处](#cloudflare-域名托管可选)）
6.  点击 **Connect Domain**，等待几分钟，状态变为 **Active** 即表示成功

![](https://img.neotalks.org/2025/12/6382723234418ea22f61d8e181f0b941.png)

绑定成功后，你的图片链接就是：`https://img.yourdomain.com/图片名.png`

---

**第 3 步：获取 API 密钥**

要想在博客后台里面直接传图片必须创建密钥, 如果你想用 PicGo、Typora 等工具自动上传图片到 R2，那更需要了。

1.  回到 R2 的主界面（列出所有 对象储存桶 的页面）
2.  在右侧找到 **Manage**（管理 R2 API 令牌）

    ![](https://img.neotalks.org/2025/12/5b1be2f6739cf0b68350c76210ef1ce0.png)

3.  点击 **创建 API 令牌**

    ![](https://img.neotalks.org/2025/12/0ac01c34b078ae8bbfd11653150b3b24.png)

4.  填写配置：
    -   **令牌名称**：随便填，例如 `PicGo-Write`
    -   **Permissions**（权限）：一定要选 **Object Read & Write**（读写权限），否则无法上传
    -   **TTL**：选 **Forever**（永久）

    ![](https://img.neotalks.org/2025/12/bd88c18235c2e77c7012a7bd716f0ca2.png)

5.  点击 **创建 API 令牌**

6.  **【重点】** 页面会弹出密钥信息，**请立即复制保存**以下三行内容（关掉就看不到了）：
    -   **Access Key ID**（访问密钥 ID）
    -   **Secret Access Key**（私密访问密钥）
    -   **Endpoint**（端点地址，类似于 `https://<你的账号ID>.r2.cloudflarestorage.com`）

---

**第 4 步：配置上传工具（可选）**

如果你用 **PicGo**：

1.  安装 PicGo 和 `picgo-plugin-s3` 插件
2.  在插件配置中填入：
    -   **Access Key ID** 和 **Secret Access Key**（刚才保存的）
    -   **Bucket**：你的存储桶名称（如 `blog-img`）
    -   **Endpoint**：刚才保存的 Endpoint 地址
    -   **自定义域名**：填你绑定的域名（如 `https://img.yourdomain.com`）
3.  上传测试，成功后就可以愉快地写博客了


## 部署项目（Docker）

> **说明**：下文使用的是我自己编写的博客，如果使用的是其他现有博客，可跳过。

默认已有服务器。推荐使用 **2核2G** 及以上配置的服务器，否则项目部署和后期使用都会挺痛苦的。最差也要 **1核1G**，否则以下项目恐怕是很难用 Docker 直接部署，可能需要使用 PM2。

### 安装 Docker

> 此安装方式适用于所有 Linux 系统

```bash
# 下载并执行 Docker 官方安装脚本
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 启动 Docker 服务
sudo systemctl start docker
sudo systemctl enable docker
```

### 部署 MySQL

> 此安装方式适用于所有系统

```bash
docker run -d \
  --name mysql-server \
  -p 3310:3306 \
  -v /opt/mysql/data:/var/lib/mysql \
  -v /opt/mysql/conf:/etc/mysql/conf.d \
  -e MYSQL_ROOT_PASSWORD=your_password \
  --restart=always \
  mysql:8.0
```

**参数详解：**

- `-d`: 后台运行。
- `-p 3310:3306`: 关键点，将主机的 3310 端口到容器的 3306 端口映射，这是远程连接的基础。
- `-v ...`: 挂载数据卷。如果不挂载，容器删除后数据会丢失。`/opt/mysql/data`: 主机存放数据的目录（请确保该目录存在或 Docker 有权限创建）。
- `-e MYSQL_ROOT_PASSWORD`: 设置 root 用户的密码。
- `mysql:8.0`: 指定镜像版本（建议明确版本号，不要只用 latest）。

#### 配置远程连接权限(可选)

默认情况下，Docker 版的 MySQL 容器通常允许 root 用户从任何地方（`%`）连接，只要密码正确。但为了保险起见或创建新用户，请按以下步骤操作：

1. **进入容器内部**

   ```bash
   docker exec -it mysql-server mysql -u root -p
   # (输入你设置的密码)
   ```

2. **检查当前用户权限**

   ```sql
   use mysql;
   select host, user, plugin from user;
   ```

   如果在 `root` 对应的 `host` 列看到 `%`，说明已经允许远程连接。

3. **如果需要手动开启 root 远程权限（或创建新用户）**

   ```sql
   -- 方法 A: 修改 root 允许任意 IP 连接
   update user set host = '%' where user = 'root';

   -- 方法 B: 创建一个专门的远程管理员账号 (推荐)
   CREATE USER 'admin'@'%' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;

   -- 刷新权限
   FLUSH PRIVILEGES;
   ```

### 部署 Nginx（不用 Docker，更简单，仅 Ubuntu）

```bash
sudo apt update
sudo apt install nginx -y

# 启动 Nginx
sudo systemctl start nginx

# 设置开机自动启动 (非常重要，防止重启服务器后服务挂掉)
sudo systemctl enable nginx

# 检查运行状态 (显示 active (running) 即为成功)
sudo systemctl status nginx
```

不过真正用处需要做一些配置，具体配置见后文。


### 部署后端服务 (NestJS)

1. **拉取代码并配置环境**

   ```bash
   git clone https://github.com/NewYouthBlog/Server.git
   cd Server
   cp .env.example .env
   ```

2. **修改 `.env` 配置文件**

   关键配置项如下：
   - `DATABASE_URL`: 数据库连接地址（确保容器可访问，如 `mysql://root:password@mysql-server:3310/blog` 记得先去数据库内建表，假如忘了，见下文）。
   - `PORT`: 应用监听端口（默认 `3001`）。
   - `R2_ACCESS_KEY_ID`: Cloudflare R2 Access Key ID。
   - `R2_SECRET_ACCESS_KEY`: Cloudflare R2 Secret Access Key。
   - `R2_BUCKET_NAME`: 创建的存储桶名字。
   - `R2_PUBLIC_DOMAIN`: 绑定的自定义域名 (用于生成返回给前端的访问链接)。

   你可以修改 `prisma/seed.ts` 文件来修改种子用户名和密码。

   ![](https://img.neotalks.org/2025/12/b724de08ef5138baf106719f966f2513.png)

3. **启动服务**

   ```bash
   docker compose up -d --build
   ```

    其他可能用到的命令（**只能在项目目录下、和dockerfile同一目录下用**）：

    ```bash
    # 重启服务
    docker compose restart

    # 停止服务
    docker compose down

    # 查看日志
    docker compose logs

    # 进入容器
    docker exec -it blog_server /bin/bash
    ```

4. **初始化数据库（假如你忘了提前建表）**

   ```bash
   # 运行数据库迁移
   docker exec -it blog_server npx prisma generate

   # 填充初始数据
   docker exec -it blog_server node dist/prisma/seed.js
   ```

### 部署用户端 (Next.js)

1. **拉取代码**

   ```bash
   git clone https://github.com/NewYouthBlog/userWeb.git
   cd userWeb
   cp .env.example .env
   ```

2. **配置环境变量**

   - `NEXT_PUBLIC_BASE_URL`: 填入你的域名 (例如 `http://www.yourdomain.com`)，用于 SEO 和 API 请求。

3. **启动服务**

   ```bash
   docker compose up -d --build
   ```

### 部署后台管理系统 (Vue)

1. **拉取代码**

   ```bash
   git clone https://github.com/NewYouthBlog/adminWeb.git
   cd adminWeb
   ```

2. **修改配置**

   修改 `.env.production` 文件中的 API 地址，使其指向你的后端服务(例如 `http://www.yourdomain.com/api`)。

   **注意**：
   - 现阶段还没配置https，所以请使用http，不然页面无法访问，如果写的https，就继续往下操作，不要急着测试

   - 关于后端服务，后面会使用nginx做反向代理，把本机的3001端口（server）映射到 `yourdomain.com/api`

3. **启动服务**

   ```bash
   docker compose up -d --build
   ```

## 后续配置

### 1. Nginx 二级域名配置

如果你需要配置二级域名（例如 `admin.yourdomain.com` 指向后台管理页面），可以在 `/etc/nginx/conf.d/` 下新建一个配置文件，例如 `adminweb.conf`：

```nginx
# /etc/nginx/conf.d/adminweb.conf
server {
    listen 80;
    server_name admin.yourdomain.com;  # 替换为您的域名

    location / {
        proxy_pass http://127.0.0.1:5173; # 指向 Vue 项目的端口
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 2. 配置 HTTPS (推荐)

使用 Cloudflare 的免费 SSL 证书，配置 HTTPS。当然还有很多免费、付费的 SSL 证书，申请方式各有不同，但服务器上的配置方式大多相同。

**第一步：获取 Origin CA 证书**

1. 登录 Cloudflare，进入你的域名管理界面。
2. 点击左侧菜单的 **SSL/TLS** > **Origin Server** (源服务器)。
3. 点击 **Create Certificate** (创建证书)。
   - **私钥类型**：默认 RSA 即可。
   - **主机名**：默认会包含 `*.你的域名.com` 和 `你的域名.com`，保持默认即可。
   - **有效期**：建议选 **15 年**（省去频繁续期的麻烦）。
4. 点击 **Create** (创建) 后，你会看到 **Origin Certificate** (公钥) 和 **Private Key** (私钥)。
   - **注意**：私钥只显示一次，请立即复制保存！
5. 在服务器上保存证书文件：
   - (确保目录 `/etc/nginx/ssl` 存在，不存在则 mkdir 创建) 
   - 将公钥内容保存为：`/etc/nginx/ssl/origin.pem`
   - 将私钥内容保存为：`/etc/nginx/ssl/origin.key`
   
**第二步：强制 HTTPS 跳转**

1. 进入 Cloudflare **SSL/TLS** > **Edge Certificates** (边缘证书)。
2. 找到 **Always Use HTTPS** (始终使用 HTTPS)。
3. 将开关打开。

### 3. 完整 Nginx 配置示例 (包含 HTTPS 与 安全加固)

以下是一个完整的 `nginx.conf` 示例，包含了 Gzip 压缩、禁止 IP 直接访问、SSL 配置、二级域名（通过引入配置文件的方式）以及前端和 API 的反向代理。

编辑主配置文件：`sudo vim /etc/nginx/nginx.conf`

```nginx
user root;
worker_processes auto;
pid /run/nginx.pid;

events {
    worker_connections 768;
    # multi_accept on;
}

http {
    include /etc/nginx/conf.d/*.conf; # 引入前文提到的二级域名配置文件
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # 日志设置
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # Gzip 压缩设置
    gzip on;
    gzip_min_length 1k;
    gzip_buffers 4 16k;
    gzip_http_version 1.1;
    gzip_comp_level 6; # 建议设置为 6，平衡 CPU 和压缩率
    gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php application/javascript application/json;
    gzip_disable "MSIE [1-6]\.";
    gzip_vary on;

    # 基础设置
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_header_buffer_size 16k;
    large_client_header_buffers 4 32k;

    # SSL 全局设置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;

    # --- 服务器配置 ---

    # 1. 禁止通过 IP 直接访问 (防止被恶意扫描)
    server {
        listen 80 default_server;
        listen [::]:80 default_server;
        server_name _;
        return 403;
    }

    # 2. 主站点配置 (HTTP -> HTTPS 通常由 Cloudflare 处理，这里配置监听即可)
    # 如果使用了 Origin CA 证书，建议配置 SSL 监听
    server {
        listen 80;
        listen 443 ssl http2;
        server_name neotalks.org; # 替换为你的域名

        # SSL 证书路径
        ssl_certificate     /etc/nginx/ssl/origin.pem;
        ssl_certificate_key /etc/nginx/ssl/origin.key;

        # 前端页面 (Next.js)
        location / {
            proxy_pass http://localhost:3000; # 对应 Docker 端口
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # 后端 API (NestJS)
        location /api/ {
            proxy_pass http://127.0.0.1:3001/; # 对应 Docker 端口
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-NginX-Proxy true;
        }
    }
}
```

配置完成后，记得测试并重启 Nginx：

```bash
sudo nginx -t   # 测试配置是否有语法错误
sudo systemctl reload nginx # 重载配置
```

到此，你的网站就已经部署完成了。下面是欣赏环节。

![](https://img.neotalks.org/2025/12/4a859e155235b05f8de9cf580d0224e8.png)

![](https://img.neotalks.org/2025/12/0af416f3bc2b24d230d86250f900a293.png)

![](https://img.neotalks.org/2025/12/a5f7e23375858295125c23ecf183616e.png)