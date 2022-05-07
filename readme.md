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

[fully-import.js里有详细注释](./src/common/fully-import.js)

```
@vue/composition-api 使用vue3语法
注入$request, 用Promise.race限制请求超时时间
tippy-tips 元素:tippy-tips="提示内容" 即可注入悬浮提示
v-cursor vue插件, 注册指令, 鼠标后面跟一个小锁头
jb-router-view: 某几个页面显示页面指导,骨架图, EventBus接收全局的页面权限提示
引导页面: 还没内容就显示引导页面
巧妙地利用css动画, . -> .. -> ... 实现循环加载动画 animation: import-task-loading 2s
batch-operation 自定义表格进行, 行内增删
resizeable-box 拖拽分割条-动态设置父元素宽度
render-file-list-column 函数式组件 动态表单渲染列
element-teleport 传送移动 slot 到指定的 target
smart-action 内容+下面两个按钮(action区)
scroll-faker 优美的内容区局部滚动
lower-component 300ms后再渲染出子组件 或 直到元素滚动到顶部不到30才显示出来
```

## 使用了的lodash方法

```
cloneDeep
debounce
difference
filter
find
findIndex
has
head
isArray
isDate
isEmpty
isObject
isPlainObject
isString
last
max
random
remove
some
split
throttle
trim
```
