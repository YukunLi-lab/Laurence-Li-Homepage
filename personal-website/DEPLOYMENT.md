# 部署指南

## 🚀 快速开始

### 前提条件
- 现代网页浏览器
- 文本编辑器（如VS Code）
- Git（用于版本控制）
- Node.js（可选，用于构建工具）

### 本地开发
1. **克隆或下载项目**
   ```bash
   git clone https://github.com/yourusername/personal-website.git
   cd personal-website
   ```

2. **启动本地服务器**
   ```bash
   # 使用Python
   python -m http.server 8000
   
   # 或使用Node.js
   npx serve .
   
   # 或使用PHP
   php -S localhost:8000
   ```

3. **访问网站**
   打开浏览器访问：`http://localhost:8000`

## 🌐 部署到生产环境

### 选项1: GitHub Pages（免费）
1. **创建GitHub仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/personal-website.git
   git push -u origin main
   ```

2. **启用GitHub Pages**
   - 进入仓库设置
   - 找到 "Pages" 部分
   - 选择 `main` 分支作为源
   - 点击保存

3. **访问你的网站**
   - 网址：`https://yourusername.github.io/personal-website`
   - 等待几分钟生效

### 选项2: Netlify（推荐）
1. **注册Netlify账户**
   - 访问 [netlify.com](https://netlify.com)
   - 使用GitHub登录

2. **部署网站**
   - 点击 "New site from Git"
   - 选择你的仓库
   - 保持默认设置
   - 点击 "Deploy site"

3. **自定义域名（可选）**
   - 在站点设置中添加自定义域名
   - 配置DNS记录

### 选项3: Vercel
1. **注册Vercel账户**
   - 访问 [vercel.com](https://vercel.com)
   - 使用GitHub登录

2. **导入项目**
   - 点击 "Import Project"
   - 选择你的仓库
   - 点击 "Deploy"

3. **自动部署**
   - 每次推送到GitHub都会自动部署
   - 支持预览部署

### 选项4: 传统托管
1. **准备文件**
   ```bash
   # 压缩项目文件
   tar -czf website.tar.gz personal-website/
   ```

2. **上传到服务器**
   - 使用FTP/SFTP客户端
   - 或使用SCP命令：
     ```bash
     scp -r personal-website/ user@yourserver.com:/var/www/html/
     ```

3. **配置Web服务器**
   ```nginx
   # Nginx配置示例
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/html/personal-website;
       index index.html;
       
       location / {
           try_files $uri $uri/ =404;
       }
   }
   ```

## 🔧 构建优化

### 生产环境优化
1. **压缩CSS和JavaScript**
   ```bash
   # 安装压缩工具
   npm install -g css-minify uglify-js
   
   # 压缩CSS
   css-minify -f style.css -o dist/
   css-minify -f animations.css -o dist/
   
   # 压缩JavaScript
   uglifyjs main.js -o dist/main.min.js
   ```

2. **图片优化**
   ```bash
   # 使用ImageOptim或Squoosh
   # 转换图片为WebP格式
   ```

3. **添加缓存头**
   ```nginx
   location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```

### 性能监控
1. **使用Lighthouse测试**
   - 打开Chrome开发者工具
   - 点击 "Lighthouse" 标签
   - 运行性能测试

2. **核心Web指标**
   - LCP (最大内容绘制): < 2.5秒
   - FID (首次输入延迟): < 100毫秒
   - CLS (累积布局偏移): < 0.1

## 🔒 安全配置

### HTTPS配置
1. **获取SSL证书**
   - 使用Let's Encrypt（免费）
   - 或从证书颁发机构购买

2. **配置HTTPS**
   ```nginx
   server {
       listen 443 ssl http2;
       server_name yourdomain.com;
       
       ssl_certificate /path/to/cert.pem;
       ssl_certificate_key /path/to/key.pem;
       
       # 其他配置...
   }
   ```

### 安全头文件
```nginx
add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Content-Security-Policy "default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com; style-src 'self' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com;";
```

## 📊 分析和监控

### Google Analytics
1. **添加跟踪代码**
   ```html
   <!-- 在<head>标签中添加 -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

2. **配置事件跟踪**
   ```javascript
   // 在main.js中添加
   function trackEvent(category, action, label) {
     if (window.gtag) {
       gtag('event', action, {
         'event_category': category,
         'event_label': label
       });
     }
   }
   ```

### 错误监控
1. **使用Sentry**
   ```html
   <script src="https://browser.sentry-cdn.com/7.0.0/bundle.min.js"></script>
   <script>
     Sentry.init({ dsn: 'YOUR_DSN' });
   </script>
   ```

## 🔄 持续集成/持续部署

### GitHub Actions配置
```yaml
# .github/workflows/deploy.yml
name: Deploy to Netlify

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: jsmrcaga/action-netlify-deploy@v1
        with:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### 环境变量配置
```bash
# 在部署平台设置环境变量
NETLIFY_AUTH_TOKEN=your_token
NETLIFY_SITE_ID=your_site_id
```

## 🚨 故障排除

### 常见问题

#### 1. 网站无法访问
- **检查服务器状态**: `systemctl status nginx`
- **检查端口**: `netstat -tulpn | grep :80`
- **检查防火墙**: `ufw status`

#### 2. CSS/JS不加载
- 检查文件路径是否正确
- 检查文件权限：`chmod 644 css/*.css`
- 检查MIME类型配置

#### 3. 图片不显示
- 检查图片路径
- 检查文件格式支持
- 检查文件大小限制

#### 4. 表单不工作
- 检查JavaScript控制台错误
- 检查网络请求
- 检查CORS配置

### 调试工具
```bash
# 检查HTTP响应
curl -I https://yourdomain.com

# 检查DNS解析
nslookup yourdomain.com

# 检查SSL证书
openssl s_client -connect yourdomain.com:443
```

## 📈 性能优化检查清单

### 部署前检查
- [ ] 压缩所有CSS文件
- [ ] 压缩所有JavaScript文件
- [ ] 优化所有图片
- [ ] 启用Gzip压缩
- [ ] 配置浏览器缓存
- [ ] 设置HTTPS
- [ ] 添加安全头文件
- [ ] 测试移动端响应式
- [ ] 运行Lighthouse测试
- [ ] 检查控制台错误

### 部署后监控
- [ ] 设置正常运行时间监控
- [ ] 配置错误跟踪
- [ ] 设置性能监控
- [ ] 配置访问分析
- [ ] 设置备份策略
- [ ] 创建回滚计划

## 🔄 更新和维护

### 定期维护任务
1. **每周**
   - 检查服务器日志
   - 备份数据库（如果有）
   - 更新依赖包

2. **每月**
   - 运行安全扫描
   - 更新SSL证书
   - 清理旧文件

3. **每季度**
   - 性能优化审查
   - 内容更新
   - 功能增强

### 版本更新流程
```bash
# 1. 创建新分支
git checkout -b update/v1.1.0

# 2. 进行更改
# ... 修改代码 ...

# 3. 测试更改
npm test
# 或手动测试

# 4. 提交更改
git add .
git commit -m "Update to v1.1.0"

# 5. 合并到主分支
git checkout main
git merge update/v1.1.0

# 6. 部署
git push origin main
```

## 🆘 紧急情况处理

### 网站宕机
1. **立即行动**
   - 检查服务器状态
   - 查看错误日志
   - 回滚到上一个版本

2. **沟通**
   - 更新状态页面
   - 通知用户
   - 社交媒体公告

3. **修复**
   - 识别根本原因
   - 实施修复
   - 测试修复

### 安全漏洞
1. **隔离**
   - 暂时关闭受影响功能
   - 备份当前状态

2. **修复**
   - 应用安全补丁
   - 更新依赖
   - 更改密码/密钥

3. **预防**
   - 安全审计
   - 加强监控
   - 员工培训

## 📞 支持资源

### 官方文档
- [MDN Web Docs](https://developer.mozilla.org)
- [Google Developers](https://developers.google.com)
- [Web.dev](https://web.dev)

### 社区支持
- [Stack Overflow](https://stackoverflow.com)
- [GitHub Discussions](https://github.com)
- [Discord社区](https://discord.gg/webdev)

### 专业服务
- [Upwork](https://upwork.com) - 雇佣开发者
- [Fiverr](https://fiverr.com) - 自由职业者服务
- [AWS Support](https://aws.amazon.com/support) - 云支持

---

**最后更新**: 2024年1月  
**版本**: 1.0.0  
**维护者**: 网站开发团队  

> 提示：定期查看此文档以获取更新。建议每6个月审查一次部署策略。