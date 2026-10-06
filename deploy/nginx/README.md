# 摩托车维修知识库：Nginx 静态发布包

`release/motorcycle-web-studio-nginx.zip` 是纯静态发布包：已包含首页 HTML、客户端交互脚本、图谱图片和全部静态资源。服务器只需要 Nginx，不需要 Node.js、npm、Docker 或应用进程。

## 部署步骤

1. 将压缩包解压到 `/opt`，并调整为配置约定的目录名：

   ```bash
   sudo unzip motorcycle-web-studio-nginx.zip -d /opt
   sudo mv /opt/motorcycle-web-studio-nginx /opt/motorcycle-web-studio
   ```

2. 安装 Nginx 配置。配置默认使用 `/opt/motorcycle-web-studio`；若使用其他路径，请先修改其中的 `root`：

   ```bash
   sudo cp nginx/motorcycle-web-studio.conf /etc/nginx/conf.d/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

Nginx 默认监听 80 端口。请按实际域名修改 `server_name`，并在云服务器安全组或防火墙中开放 HTTP/HTTPS 端口。

## 更新方式

解压新版发布包并替换 `/opt/motorcycle-web-studio` 目录后，执行：

```bash
sudo nginx -t && sudo systemctl reload nginx
```

页面的学习进度保存在访问者浏览器的本地存储中，更新静态文件不会影响服务器上的其他服务。
