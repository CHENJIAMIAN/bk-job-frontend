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
src/components/jb-router-view/guide/index.vue是引导页面: 还没内容就显示引导页面
巧妙地利用css动画, . -> .. -> ... 实现循环加载动画 animation: import-task-loading 2s
batch-operation 自定义表格进行, 行内增删
resizeable-box 拖拽分割条-动态设置父元素宽度
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
