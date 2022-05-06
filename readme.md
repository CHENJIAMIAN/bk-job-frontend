job
===

## 使用

### 本地开发

- 1，执行命令（本地启动http服务）

```bash
npm run dev
```

- 需要在 /frontend 目录下面创建 .env.development 文件

```
// 配置 api 域名
AJAX_URL_PREFIX = "http://api.xxx.yyy.com"
```

- 2，执行命令（本地启动https服务）

```bash
npm run dev-external
```

- 需要在 /frontend 目录下面创建 .env.external 文件

```
// 配置 api 域名
AJAX_URL_PREFIX = "https://api.xxx.yyy.com"
```

### 生产环境构建

```bash
npm run build
```

## 值得学习的地方

```
巧妙地利用css动画, . -> .. -> ... 实现循环加载动画 animation: import-task-loading 2s
batch-operation 自定义表格进行, 行内增删
resizeable-box 拖拽分割条-动态设置父元素宽度
render-file-list-column 函数式组件 动态表单渲染列
element-teleport 传送移动 slot 到指定的 target
smart-action 内容+下面两个按钮(action区)
scroll-faker 优美的内容区局部滚动
lower-component 300ms后再渲染出子组件 或 直到元素滚动到顶部不到30才显示出来
```
