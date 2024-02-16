# sb6657

玩机器烂梗收集网站，6657玩小将的在线批事本

## 简介

玩机器烂梗收集网站，支持分类查看、烂梗随机排序和搜索功能

项目灵感来源于 [AmorDL的项目 sb6657.cn](https://github.com/AmorDL/fk6657.github.io)
现已与其合作，欢迎各位贡献者补充和共同完善

在线访问地址：[[sb6657.cn](https://sb6657.cn)](https://sb6657.cn)

## 技术栈

vue3 + typescript

目前为纯前端静态页面，可直接部署在github page上。

## 数据结构说明

-   `src/data`：存放数据文件。
-   `src/data/tab.ts`：定义了分类及其对应的路由数据。
-   `src/data/*.json`：每个分类的具体数据文件，文件名需与tab.ts中每个元素的path属性相同。

添加新分类只需要创建对应数据的.json文件，以及tab.ts里添加对应元素即可，导入是自动进行的

## 快速开始

### 安装依赖

```sh
pnpm install
```

### 开发模式

启动开发服务器，进行项目预览：

```sh
pnpm dev
```

### 构建项目

编译项目，生成静态HTML资源，用于部署：

```sh
pnpm build
```

### 代码检查

使用[ESLint](https://eslint.org/)进行代码质量检查：

```sh
pnpm lint
```

## License

该项目采用Apache License 2.0，更多详情请参见[LICENSE](LICENSE)文件。
