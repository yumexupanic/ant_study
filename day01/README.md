前端开发已经不仅仅是 `html` `js` 和 `css` 那些东西了，虽然最终的本质是这些文件 但是在开发流程上面已经发生了翻天覆地的变化。


## 前端脚手架

前端涉及到 `css` 资源以及其它文件类型，如: LESS 脚本可以提高 CSS 编写效率，`TypeScript` 可以让你用一种全新的语言去编写业务逻辑，而我们需要做的就是编写这些代码，最终让编译器生成能在浏览器跑的文件。


## 初始化项目

这里使用 `npm` 作为包管理器(国内可以使用 `cnmp` 来加速)，让我们来创建一个项目

```bash
mkdir day01
cd day01
npm init -y 
```

> 这里 `npm init -y` 的含义就是初始化一个项目 所有选项默认同意。

初始化完毕后 我们能得到下面的目录结构

```bash
day01
├── package.json
```

其中 `package.json` 代表整个项目所依赖的包，如果更换了电脑环境 只要有 `package.json` 就能够索引到项目需要使用的依赖。

### 安装依赖

```bash
cnpm install umi --save-dev
```

命令执行完毕过后，查看下目录:

```bash
day01
├── node_modules
├── package.json
```

`node_modules` 代表项目所需要的依赖 都在这个目录里面，从新查看下 `package.json` 文件中的内容:

```bash
{
  "name": "ant_study",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "umi": "^2.4.4"
  }
}
```

主要观察 `devDependencies` 节点下面，多了一个我们刚才安装的 `umi` 依赖，这是因为上面的命令中包含了 `--save` 表示安装的依赖同时写入到 `package.json` 中。

## 第一个页面

这里选择的是 `umi` 框架，所以要遵循框架的规则，先来创建配置文件:


**config/config.js**
```js
export default{}
```

> 默认情况下 `umi` 读取的配置文件在 `config/config.js` 下 (约定大于配置) 

上面的代码 export 了一个空对象，并没有什么作用 后面会说明。

接下来我们需要创建路由，因为约定大于配置的原因 我们新建一个 `src` 作为主要代码目录,在 `umi` 中，存放页面的是 `pages` 复数形式，我们可以通过修改配置文件 让单数 `page` 作为路由文件夹:


```js
export default{
    singular: true
}
```

接下来在 `src/page` 文件夹中创建 `HelloWorld.js`:

```js
export default () => {
    return <div>hello world</div>
}
```

这样一个页面就创建完成了，为了启动 接下来在 `package.js` 文件添加两个命令:

```js
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "umi dev",
    "build": "umi build"
  }
```

> 在 `scripts` 节点添加。


添加完毕之后，在终端输入运行:

```bash
cnpm run dev 
```

如果看到下面的输出就代表启动成功:

```bash
 DONE  Compiled successfully in 1823ms                                                                                                       下午10:16:24


  App running at:
  - Local:   http://localhost:8000/ (copied to clipboard)
  - Network: http://192.168.31.118:8000/
```

现在直接访问这个路径是无法访问到 `HelloWorld.js` 中的，因为 `umi` 会使用 `page` 下面的每一个 js 文件名作为路由名称，所以要在后面添加上 `HelloWorld` 才能够访问:

```txt
 http://127.0.0.1:8000/HelloWorld
```

这里是动态路由，在 `/config/config.js` 中配置下路由信息:

```js
export default{
    singular: true,
    routes: [{
        path: '/',
        component: './HelloWorld'
    }]
}
```

这里的 `path` 代表路由的访问路径 这里是: `/`，component 是一个字符串，它是相对于 `page` 的路径，这里写的是映射到 `HelloWorld.js` 中。

```bash
npm run dev
curl http://127.0.0.1:8000 
```

这样就能访问到了，这个时候如果需要生成浏览器执行的文件 在终端中输入:

```bash
npm run build
```

会在项目目录创建 `dist` 文件夹，里面就是浏览器可以直接访问的文件。


## 添加一个插件

这里介绍下安装插件的方式 方便后面使用。

先安装 `umi-plugin-react` 插件:

```bash
cnpm install umi-plugin-react  --save-dev
```

安装完毕之后，修改 `/config/config.js` 配置文件 启用插件:

```js
export default{
    plugins: [
        ['umi-plugin-react',{
            //不做任何配置 插件不会起作用
        }]
    ]
}
```

> node_modules 和 dist 文件夹可以放入 .gitignore 文件中 没有必要提交。