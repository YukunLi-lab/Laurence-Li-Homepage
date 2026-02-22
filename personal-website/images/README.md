# 图片资源目录

此目录用于存放网站的所有图片资源。

## 📁 推荐的文件结构

```
images/
├── profile/              # 个人照片
│   ├── profile.jpg      # 主个人照片 (建议: 500x500px)
│   ├── profile-2.jpg    # 备用个人照片
│   └── avatar.png       # 头像 (建议: 200x200px)
├── projects/            # 项目图片
│   ├── project-1.jpg    # 项目1展示图
│   ├── project-2.jpg    # 项目2展示图
│   └── project-3.jpg    # 项目3展示图
├── background/          # 背景图片
│   ├── hero-bg.jpg      # 英雄区背景
│   ├── pattern.png      # 背景图案
│   └── texture.jpg      # 纹理背景
├── icons/              # 图标
│   ├── favicon.ico     # 网站图标
│   ├── logo.svg        # Logo矢量图
│   └── social/         # 社交媒体图标
└── screenshots/        # 网站截图
    ├── desktop.jpg     # 桌面版截图
    ├── mobile.jpg      # 移动版截图
    └── tablet.jpg      # 平板版截图
```

## 🖼️ 图片规格建议

### 1. 个人照片
- **格式**: JPG或PNG
- **尺寸**: 500x500像素 (正方形)
- **文件大小**: < 200KB
- **背景**: 建议使用纯色或模糊背景

### 2. 项目展示图
- **格式**: JPG或PNG
- **尺寸**: 1200x800像素 (16:9比例)
- **文件大小**: < 500KB
- **质量**: 清晰、高对比度

### 3. 背景图片
- **格式**: JPG (用于照片) 或 PNG (用于图案)
- **尺寸**: 1920x1080像素 (全高清)
- **文件大小**: < 1MB
- **优化**: 适当压缩，保持加载速度

### 4. 图标
- **格式**: SVG (矢量) 或 PNG (位图)
- **尺寸**: 多种尺寸 (16x16, 32x32, 64x64, 128x128)
- **颜色**: 透明背景

## 🔧 图片优化指南

### 工具推荐
1. **在线工具**
   - [TinyPNG](https://tinypng.com) - PNG/JPG压缩
   - [Squoosh](https://squoosh.app) - 谷歌图片优化工具
   - [ImageOptim](https://imageoptim.com) - 桌面端优化工具

2. **命令行工具**
   ```bash
   # 安装ImageMagick
   sudo apt install imagemagick
   
   # 调整图片大小
   convert input.jpg -resize 500x500 output.jpg
   
   # 压缩图片质量
   convert input.jpg -quality 85 output.jpg
   
   # 转换为WebP格式
   convert input.jpg output.webp
   ```

### 优化步骤
1. **选择合适的格式**
   - 照片 → JPG
   - 图标/Logo → SVG或PNG
   - 透明背景 → PNG
   - 现代浏览器 → WebP

2. **调整尺寸**
   - 根据实际显示尺寸调整
   - 不要使用HTML/CSS缩放大图片

3. **压缩质量**
   - JPG: 质量85-90%
   - PNG: 使用无损压缩
   - WebP: 质量80-85%

4. **懒加载**
   ```html
   <img src="placeholder.jpg" data-src="actual-image.jpg" loading="lazy">
   ```

## 📝 命名规范

### 文件命名规则
- 使用小写字母
- 使用连字符分隔单词
- 描述性名称
- 包含尺寸信息（可选）

### 示例
```
✅ 正确的命名:
- profile-main.jpg
- project-ecommerce.jpg
- background-hero.jpg
- icon-github.svg

❌ 错误的命名:
- IMG_1234.JPG
- my photo.png
- project1_final_final.jpg
```

## 🚀 性能最佳实践

### 1. 响应式图片
```html
<picture>
  <source media="(min-width: 1200px)" srcset="image-large.jpg">
  <source media="(min-width: 768px)" srcset="image-medium.jpg">
  <img src="image-small.jpg" alt="描述">
</picture>
```

### 2. 图片懒加载
```html
<img src="placeholder.jpg" 
     data-src="actual-image.jpg" 
     loading="lazy"
     alt="描述">
```

### 3. 预加载关键图片
```html
<link rel="preload" as="image" href="hero-image.jpg">
```

### 4. 使用WebP格式
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="描述">
</picture>
```

## 🔍 SEO优化

### 1. Alt文本
```html
<!-- 好的Alt文本 -->
<img src="project.jpg" alt="电子商务网站项目展示">

<!-- 差的Alt文本 -->
<img src="project.jpg" alt="IMG_1234">
```

### 2. 文件名优化
- 使用描述性文件名
- 包含关键词
- 避免通用名称

### 3. 图片站点地图
```xml
<!-- 在sitemap.xml中添加 -->
<image:image>
  <image:loc>https://example.com/images/project.jpg</image:loc>
  <image:caption>电子商务网站项目展示</image:caption>
</image:image>
```

## 🛡️ 版权注意事项

### 使用许可图片
1. **免费资源**
   - [Unsplash](https://unsplash.com)
   - [Pexels](https://pexels.com)
   - [Pixabay](https://pixabay.com)

2. **付费资源**
   - [Shutterstock](https://shutterstock.com)
   - [Adobe Stock](https://stock.adobe.com)
   - [Getty Images](https://gettyimages.com)

3. **图标资源**
   - [Font Awesome](https://fontawesome.com)
   - [Feather Icons](https://feathericons.com)
   - [Material Icons](https://material.io/icons)

### 版权声明
- 确保拥有使用权限
- 注明图片来源（如果需要）
- 遵守许可条款

## 🐛 常见问题

### 1. 图片不显示
- 检查文件路径
- 检查文件权限
- 检查文件格式支持

### 2. 图片加载慢
- 压缩图片大小
- 使用CDN
- 启用浏览器缓存

### 3. 图片模糊
- 使用足够大的源图片
- 避免过度压缩
- 使用矢量格式（SVG）

### 4. 颜色失真
- 使用正确的色彩空间（sRGB）
- 避免过度压缩
- 测试不同设备

## 📈 监控和分析

### 图片性能监控
```javascript
// 监控图片加载性能
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.initiatorType === 'img') {
      console.log(`图片加载时间: ${entry.duration}ms`);
    }
  });
});

observer.observe({ entryTypes: ['resource'] });
```

### 错误跟踪
```javascript
// 监控图片加载错误
document.addEventListener('error', function(e) {
  if (e.target.tagName === 'IMG') {
    console.error('图片加载失败:', e.target.src);
  }
}, true);
```

---

**最后更新**: 2024年1月  
**维护者**: 网站开发团队  

> 提示：定期优化图片可以显著提升网站性能。建议每季度审查一次图片资源。