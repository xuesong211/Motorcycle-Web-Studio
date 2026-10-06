# 摩托车维修知识库：Nginx 发布包

此目录是 `release/motorcycle-web-studio-nginx.zip` 的发布源文件。该压缩包可直接解压到 Linux 服务器，再由 Nginx 对外提供访问。

应用使用 Vinext 的服务端渲染构建，因此 Nginx 负责静态资源缓存和反向代理，页面服务由包内的 Vinext 生产运行时提供。部署机器需要安装 Nginx 与 Node.js 22.13 或更高版本。

## 部署步骤

1. 将压缩包解压到 `/opt/motorcycle-web-studio`。
2. 进入解压目录并安装应用运行依赖：

   ```bash
   cd /opt/motorcycle-web-studio/app
   npm ci --omit=dev
   ```

3. 先在前台验证运行时：

   ```bash
   cd /opt/motorcycle-web-studio
   chmod +x scripts/start.sh
   ./scripts/start.sh
   ```

   访问 `http://127.0.0.1:8787` 能看到页面，即表示运行时已就绪。此进程只监听本机回环地址。

4. 安装长期运行服务：

   ```bash
   sudo cp systemd/motorcycle-web-studio.service /etc/systemd/system/
   sudo systemctl daemon-reload
   sudo systemctl enable --now motorcycle-web-studio
   sudo systemctl status motorcycle-web-studio
   ```

5. 安装 Nginx 配置。配置文件默认安装路径为 `/opt/motorcycle-web-studio`；如果解压到别处，请先替换其中的路径：

   ```bash
   sudo cp nginx/motorcycle-web-studio.conf /etc/nginx/conf.d/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

Nginx 默认监听 80 端口。请按服务器域名修改 `server_name`，并在云服务器安全组或防火墙中开放所需的 HTTP/HTTPS 端口。

## Windows 本地验证

在解压目录双击 `scripts\\start.cmd`，然后打开 `http://127.0.0.1:8787`。Windows 上若使用 Nginx，同样将 `nginx/motorcycle-web-studio.conf` 中的静态资源路径改为实际盘符路径，并保留反向代理地址 `127.0.0.1:8787`。

## 更新方式

替换 `app/dist` 后重启服务即可：

```bash
sudo systemctl restart motorcycle-web-studio
```

如果 `package.json` 或 `package-lock.json` 有变化，请先重新执行 `npm ci`。
