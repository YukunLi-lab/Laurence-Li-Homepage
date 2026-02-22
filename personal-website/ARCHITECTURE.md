# 网站架构文档

## 🏗️ 整体架构

### 架构图
```
┌─────────────────────────────────────────────────┐
│                 用户界面层 (UI)                  │
├─────────────────────────────────────────────────┤
│   HTML结构      │   CSS样式      │   JavaScript  │
├─────────────────────────────────────────────────┤
│             组件层 (Components)                  │
├─────────────────────────────────────────────────┤
│  导航栏  │  英雄区  │  作品集  │  技能  │  联系  │
├─────────────────────────────────────────────────┤
│             样式系统 (Design System)             │
├─────────────────────────────────────────────────┤
│  色彩  │  字体  │  间距  │  动画  │  响应式     │
├─────────────────────────────────────────────────┤
│             功能层 (Functionality)               │
├─────────────────────────────────────────────────┤
│  导航  │  表单  │  动画  │  交互  │  性能       │
└─────────────────────────────────────────────────┘
```

## 📐 文件架构

### 核心文件
- `index.html` - 主HTML文档，包含所有页面内容
- `css/style.css` - 主要样式文件，包含布局和基础样式
- `css/animations.css` - 动画专用样式文件
- `js/main.js` - 主要JavaScript功能文件

### 目录结构
```
personal-website/
├── index.html                    # 入口文件
├── css/                          # 样式目录
│   ├── style.css                # 核心样式
│   └── animations.css           # 动画样式
├── js/                          # 脚本目录
│   └── main.js                  # 主脚本文件
├── images/                      # 图片资源
│   ├── profile.jpg             # 个人照片
│   ├── projects/               # 项目图片
│   └── background/             # 背景图片
├── assets/                      # 其他资源
│   ├── fonts/                  # 自定义字体
│   ├── icons/                  # SVG图标
│   └── documents/              # 文档文件
├── components/                  # 可复用组件
│   ├── navbar/                 # 导航栏组件
│   ├── hero/                   # 英雄区组件
│   ├── portfolio/              # 作品集组件
│   ├── skills/                 # 技能组件
│   └── contact/                # 联系组件
└── docs/                       # 文档目录
    ├── ARCHITECTURE.md         # 架构文档
    ├── CUSTOMIZATION.md        # 自定义指南
    └── DEPLOYMENT.md           # 部署指南
```

## 🎨 设计系统架构

### CSS架构 (BEM + Utility Classes)
```css
/* 块 (Block) */
.navbar {}
.hero {}
.portfolio {}

/* 元素 (Element) */
.navbar__logo {}
.hero__title {}
.portfolio__item {}

/* 修饰符 (Modifier) */
.navbar--fixed {}
.hero--dark {}
.portfolio__item--featured {}

/* 工具类 (Utility Classes) */
.text-center {}
.mt-1 {}
.p-2 {}
```

### CSS变量系统
```css
:root {
    /* 色彩系统 */
    --color-primary: #6C63FF;
    --color-secondary: #FF6584;
    --color-accent: #36D1DC;
    
    /* 间距系统 */
    --spacing-unit: 1rem;
    --spacing-xs: calc(var(--spacing-unit) * 0.5);
    --spacing-sm: var(--spacing-unit);
    --spacing-md: calc(var(--spacing-unit) * 2);
    
    /* 字体系统 */
    --font-primary: 'Poppins', sans-serif;
    --font-secondary: 'Montserrat', sans-serif;
    
    /* 阴影系统 */
    --shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
    --shadow-md: 0 4px 8px rgba(0,0,0,0.15);
    --shadow-lg: 0 8px 16px rgba(0,0,0,0.2);
}
```

## 🔧 组件架构

### 1. 导航栏组件 (Navbar)
```html
<nav class="navbar">
    <div class="container">
        <a href="#" class="navbar__logo">Logo</a>
        <div class="navbar__links">
            <a href="#home" class="navbar__link">Home</a>
            <a href="#about" class="navbar__link">About</a>
        </div>
        <button class="navbar__toggle">☰</button>
    </div>
</nav>
```

### 2. 英雄区组件 (Hero)
```html
<section class="hero">
    <div class="container">
        <div class="hero__content">
            <h1 class="hero__title">Title</h1>
            <p class="hero__subtitle">Subtitle</p>
            <div class="hero__actions">
                <a href="#" class="btn btn--primary">Action</a>
            </div>
        </div>
        <div class="hero__visual">
            <!-- Visual elements -->
        </div>
    </div>
</section>
```

### 3. 作品集组件 (Portfolio)
```html
<section class="portfolio">
    <div class="container">
        <h2 class="section-title">Portfolio</h2>
        <div class="portfolio__grid">
            <div class="portfolio__item">
                <div class="portfolio__image"></div>
                <div class="portfolio__info">
                    <h3>Project Title</h3>
                    <p>Project Description</p>
                </div>
            </div>
        </div>
    </div>
</section>
```

## 🚀 JavaScript架构

### 模块化结构
```javascript
// main.js - 主入口文件
import { Navigation } from './modules/navigation.js';
import { Animations } from './modules/animations.js';
import { FormHandler } from './modules/form.js';

class App {
    constructor() {
        this.navigation = new Navigation();
        this.animations = new Animations();
        this.formHandler = new FormHandler();
    }
    
    init() {
        this.navigation.init();
        this.animations.init();
        this.formHandler.init();
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});
```

### 事件处理架构
```javascript
// 事件委托模式
class EventHandler {
    constructor() {
        this.events = new Map();
    }
    
    addEvent(element, event, handler) {
        if (!this.events.has(event)) {
            this.events.set(event, new Map());
        }
        this.events.get(event).set(element, handler);
        element.addEventListener(event, handler);
    }
    
    removeEvent(element, event) {
        const handler = this.events.get(event)?.get(element);
        if (handler) {
            element.removeEventListener(event, handler);
            this.events.get(event).delete(element);
        }
    }
}
```

## 📱 响应式架构

### 移动优先策略
```css
/* 基础样式 (移动设备) */
.component {
    padding: var(--spacing-sm);
    font-size: 1rem;
}

/* 平板设备 */
@media (min-width: 768px) {
    .component {
        padding: var(--spacing-md);
        font-size: 1.1rem;
    }
}

/* 桌面设备 */
@media (min-width: 1024px) {
    .component {
        padding: var(--spacing-lg);
        font-size: 1.2rem;
    }
}
```

### 断点系统
```css
/* 断点定义 */
:root {
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
    --breakpoint-xxl: 1400px;
}

/* 使用示例 */
@media (min-width: var(--breakpoint-md)) {
    /* 平板样式 */
}

@media (min-width: var(--breakpoint-lg)) {
    /* 桌面样式 */
}
```

## 🎯 性能架构

### 关键渲染路径优化
1. **CSS优化**
   - 关键CSS内联
   - 非关键CSS异步加载
   - CSS压缩和合并

2. **JavaScript优化**
   - 代码分割
   - 懒加载
   - 异步/延迟加载

3. **图片优化**
   - 响应式图片
   - 图片懒加载
   - WebP格式支持

### 缓存策略
```html
<!-- Service Worker注册 -->
<script>
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}
</script>

<!-- 资源提示 -->
<link rel="preconnect" href="https://fonts.gstatic.com">
<link rel="preload" as="style" href="css/style.css">
<link rel="preload" as="script" href="js/main.js">
```

## 🔒 安全架构

### 前端安全措施
1. **输入验证**
   ```javascript
   class FormValidator {
       static validateEmail(email) {
           const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
           return regex.test(email);
       }
       
       static sanitizeInput(input) {
           return input.replace(/[<>]/g, '');
       }
   }
   ```

2. **内容安全策略**
   ```html
   <meta http-equiv="Content-Security-Policy" 
         content="default-src 'self'; 
                  script-src 'self' https://cdnjs.cloudflare.com;
                  style-src 'self' https://fonts.googleapis.com;
                  img-src 'self' data: https:;">
   ```

## 📊 分析架构

### 性能监控
```javascript
// 性能指标收集
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
    }
    
    collectMetrics() {
        // 收集核心Web指标
        this.metrics.LCP = this.getLCP();
        this.metrics.FID = this.getFID();
        this.metrics.CLS = this.getCLS();
    }
    
    reportToAnalytics() {
        // 发送到分析服务
        if (window.ga) {
            window.ga('send', 'event', 'Performance', 'metrics', this.metrics);
        }
    }
}
```

## 🔄 更新和维护架构

### 版本控制策略
```
版本号: MAJOR.MINOR.PATCH
- MAJOR: 不兼容的API更改
- MINOR: 向后兼容的功能添加
- PATCH: 向后兼容的错误修复
```

### 更新流程
1. **开发环境**
   ```bash
   git checkout -b feature/new-feature
   # 开发新功能
   git commit -m "Add new feature"
   ```

2. **测试环境**
   ```bash
   git checkout staging
   git merge feature/new-feature
   # 运行测试
   ```

3. **生产环境**
   ```bash
   git checkout main
   git merge staging
   git tag v1.1.0
   git push origin main --tags
   ```

## 🧪 测试架构

### 测试金字塔
```
        ┌─────────────────┐
        │   E2E测试 (5%)   │
        ├─────────────────┤
        │ 集成测试 (15%)   │
        ├─────────────────┤
        │ 单元测试 (80%)   │
        └─────────────────┘
```

### 测试工具配置
```json
{
  "test": {
    "unit": "jest --coverage",
    "integration": "cypress run",
    "e2e": "playwright test",
    "performance": "lighthouse"
  }
}
```

## 📈 扩展架构

### 未来扩展点
1. **多语言支持**
   ```javascript
   // i18n配置
   const translations = {
     en: { welcome: "Welcome" },
     zh: { welcome: "欢迎" }
   };
   ```

2. **主题系统**
   ```css
   .theme-dark {
     --bg-color: #1a1a2e;
     --text-color: #ffffff;
   }
   
   .theme-light {
     --bg-color: #ffffff;
     --text-color: #1a1a2e;
   }
   ```

3. **API集成**
   ```javascript
   class APIClient {
     async getProjects() {
       return fetch('/api/projects')
         .then(res => res.json());
     }
   }
   ```

## 🎓 最佳实践

### 代码质量
- 使用ESLint进行代码检查
- 使用Prettier进行代码格式化
- 编写清晰的注释和文档

### 性能最佳实践
- 图片优化和懒加载
- 代码分割和懒加载
- 缓存策略优化

### 可访问性
- 语义化HTML
- ARIA属性
- 键盘导航支持
- 屏幕阅读器兼容

---

**架构版本**: 1.0.0  
**最后更新**: 2024年1月  
**维护者**: 网站开发团队