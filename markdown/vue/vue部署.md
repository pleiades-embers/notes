## 部署vue 项目

![image-20200716112220683](https://guokai1.oss-cn-beijing.aliyuncs.com/https://guokai1.oss-cn-beijing.aliyuncs.comimage-20200716112220683.png)

## 1.购买服务器

1.  重置服务器实例密码

## 2. 远程连接服务器

1. 安装 findlshell
2. 连接服务器

![image-20200716115913662](https://guokai1.oss-cn-beijing.aliyuncs.com/https://guokai1.oss-cn-beijing.aliyuncs.comimage-20200716115913662.png)



## 3.CentOS7.5 安装docker

Docker 支持以下的 64 位 CentOS 版本：

- CentOS 7
- CentOS 8
- 更高版本...

### 1. 卸载旧的版本

> 较旧的 Docker 版本称为 docker 或 docker-engine 。如果已安装这些程序，请卸载它们以及相关的依赖项。



```csharp
$ sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

### 2. 安装 Docker Engine-Community

#### (1) 使用 Docker 仓库进行安装

> 在新主机上首次安装 Docker Engine-Community 之前，需要设置 Docker 仓库。之后，您可以从仓库安装和更新 Docker。

- 设置仓库

> 安装所需的软件包。yum-utils 提供了 yum-config-manager ，并且 device mapper 存储驱动程序需要 device-mapper-persistent-data 和 lvm2。



```kotlin
$ sudo yum install -y yum-utils  device-mapper-persistent-data  lvm2
```

- 使用以下命令来设置稳定的仓库。



```ruby
$ sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

#### (2) 安装 Docker Engine-Community

> 安装最新版本的 Docker Engine-Community 和 containerd，或者转到下一步安装特定版本：



```ruby
$ sudo yum install docker-ce docker-ce-cli containerd.io
```

> 如果提示您接受 GPG 密钥，请选是。

#### (3) 可选：安装指定 版本的docker

> 要安装特定版本的 Docker Engine-Community，请在存储库中列出可用版本，然后选择并安装：

- 1、列出并排序您存储库中可用的版本。此示例按版本号（从高到低）对结果进行排序。



```cpp
$ yum list docker-ce --showduplicates | sort -r

docker-ce.x86_64  3:18.09.1-3.el7                     docker-ce-stable
docker-ce.x86_64  3:18.09.0-3.el7                     docker-ce-stable
docker-ce.x86_64  18.06.1.ce-3.el7                    docker-ce-stable
docker-ce.x86_64  18.06.0.ce-3.el7                    docker-ce-stable
```

- 2.通过其完整的软件包名称安装特定版本，该软件包名称是软件包名称（docker-ce）加上版本字符串（第二列），从第一个冒号（:）一直到第一个连字符，并用连字符（-）分隔。例如：docker-ce-18.09.1。



```xml
$ sudo yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io
```

### 3. 启动 Docker



```ruby
$ sudo systemctl start docker
```

### 4. 通过运行 hello-world 映像来验证是否正确安装了 Docker Engine-Community 。



```ruby
$ sudo docker run hello-world
```



## 4.CentOS7.5基于docker安装nginx

#### 1. 查看docker已经下载的(已有的)镜像

> 请忽略我已下载好的nginx镜像

![img](https://guokai1.oss-cn-beijing.aliyuncs.com/https://guokai1.oss-cn-beijing.aliyuncs.com6555843-d0780217548d6496.png)

#### 2. 去官方公有仓库查询nginx镜像

> 其中第一个就是nginx官网镜像，且STARS最多，我们这次就用这个

![img](https://guokai1.oss-cn-beijing.aliyuncs.com/https://guokai1.oss-cn-beijing.aliyuncs.comguokai1.oss-cn-beijing.aliyuncs.com6555843-a57af60217fb3a6b.png)

#### 3. 拉取该镜像

> 因为我之前拉取过，所以后面的输出和第一次拉取的输出不是太一致

![img](https://guokai1.oss-cn-beijing.aliyuncs.com/https://guokai1.oss-cn-beijing.aliyuncs.com6555843-7803a1a3f38ea772.png)

#### 4. 再次查看本地镜像

> 此时，就看到本地有了该镜像

![img](https://guokai1.oss-cn-beijing.aliyuncs.com/https://guokai1.oss-cn-beijing.aliyuncs.comguokai1.oss-cn-beijing.aliyuncs.com6555843-423952f67e03115b.png)



#### 5. 启动一下该镜像，使用nginx服务，代理本机8080端口(测试是不是好使)

> -d: 后台运行
> -p: 端口映射 冒号前是本机端口，冒号后是容器端口

![img](https://guokai1.oss-cn-beijing.aliyuncs.com/https://guokai1.oss-cn-beijing.aliyuncs.com6555843-fe61ee5fc160b486.png)

> 访问本机ip:8080 即可访问该页面，代表nginx启动成功

![img](https://guokai1.oss-cn-beijing.aliyuncs.com/https://guokai1.oss-cn-beijing.aliyuncs.com6555843-eeab6ed4911ce019.png)

#### 6.关闭容器

> docker stop XXXXX(容器id前几位)

![img](https://guokai1.oss-cn-beijing.aliyuncs.com/https://guokai1.oss-cn-beijing.aliyuncs.com6555843-639d110754b4f9d3.png)

### not end

> 至此 简单的docker安装nginx并启动算是成功了，接下来就会产生一个疑问，如果我想修改nginx的配置怎么办，我想更改nginx中的资源文件怎么办？接下来给出一个最实用的办法，就是将容器中的目录和本机目录做映射，以达到修改本机目录文件就影响到容器中的文件。

#### 1.本机创建实例文件夹

> /home文件夹下新建mutou文件夹，木头文件夹下新建nginx文件夹，nginx文件夹下新建conf.d文件夹，html文件夹，大致结构如下：



```ruby
/home
    |---mutou
           |----nginx
                  |----conf.d
                  |----html
```

#### 2. 在conf.d文件夹下新建default.conf文件，内容如下：



```bash
server {
    listen       80;
    server_name  localhost;
    # 原来的配置，匹配根路径
    #location / {
    #    root   /usr/share/nginx/html;
    #    index  index.html index.htm;
    #}
    # 更该配置，匹配/路径，修改index.html的名字，用于区分该配置文件替换了容器中的配置文件
    location / {
        root   /usr/share/nginx/html;
        index  index-test.html index.htm;
    }
}
```

#### 3.在html中编写index-test.html，用以判断文件夹映射成功，内容如下：



```xml
<html>
  <body>
    <h2>it is html1</h2>
  </body>
</html>
```

#### 4. 启动nginx(8080)，映射路径

> 命令比较长，其实就是多加了两个参数，-v，-v的意思就是冒号前面代表本机路径，冒号后面代表容器内的路径，两个路径进行了映射，本机路径中的文件会覆盖容器内的文件。
> nginx容器内的一些文件位置：
> 日志位置：/var/log/nginx/
> 配置文件位置：/etc/nginx/
> 项目位置：/usr/share/nginx/html

启动代码如下：



```jsx
docker run -d -p 8080:80 -v /home/mutou/nginx/conf.d:/etc/nginx/conf.d  -v /home/mutou/nginx/html:/usr/share/nginx/html nginx
```

![img](https://upload-images.jianshu.io/upload_images/6555843-8f2412767fec275b.png?imageMogr2/auto-orient/strip|imageView2/2/w/851/format/webp)

#### 5. 验证

> 此时访问ip:8080，发现展示的不是nginx的默认页面了，而是我们新加入的页面，这样就证明我们两个`-v`映射的文件夹都起作用了。

![img](https://guokai1.oss-cn-beijing.aliyuncs.com/https://guokai1.oss-cn-beijing.aliyuncs.com6555843-23023f15920737f0.png)

image.png

#### 6. 开始反向代理

> 此时静态页面网站已经部署上了，但是还是会显示一个端口8080出来，就十分不爽，怎么把端口干掉呢？而是换成XXXXX.com/demo1 或者 XXXXX.com/demo2这种效果呢？下面使用nginx的反向代理实现。

#### 7. 增加文件夹，达到下面的效果



```ruby
/home
    |---mutou
           |----nginx
                  |----conf.d
                  |----html
                  |----conf.d2
```

> 我们在conf.d2中配置另一个nginx容器的配置文件，文件内容如下：



```csharp
server {
    listen       80;
    server_name  localhost;
    location /mutou {
        # 在该位置配置反向代理，将ip/mutou请求拦截，发送给8080端口，如果不是本机请使用公网ip
        proxy_pass   http://你的刚才的ip地址:8080/;
    }
}
```

#### 8. 再启动一个nginx(80)，专门作为反向代理映射，将本机80端口代理到nginx的80端口上，并映射两端的配置文件地址。



```jsx
docker run -d -p 80:80 -v /home/mutou/nginx/conf.d2:/etc/nginx/conf.d nginx
```

> 此时 访问 ip/demo1 即可映射到了ip:8080上，成功完成反向代理。
>
> ![img](https://guokai1.oss-cn-beijing.aliyuncs.com/https://guokai1.oss-cn-beijing.aliyuncs.com6555843-31846297fdb31716.png)
>
> image.png

#### 9.拓展

> 当有了反向代理后，自然而然就引出了`负载均衡`,下面简单实现`负载均衡`的效果，实现该效果再添加一个nginx，所以要增加一个文件夹。



```ruby
/home
    |---mutou
           |----nginx
                  |----conf.d
                  |----html
                  |----conf.d2
                  |----html3
```

> html3中的代码如下：



```xml
<html>
  <body>
    <h2>it is html3</h2>
  </body>
</html>
```

#### 10. 启动nginx(8081)

> 启动命令如下：



```jsx
docker run -d -p 8081:80 -v /home/mutou/nginx/conf.d:/etc/nginx/conf.d  -v /home/mutou/nginx/html3:/usr/share/nginx/html nginx
```

#### 11. 访问ip:8081

![img](https://guokai1.oss-cn-beijing.aliyuncs.com/https://guokai1.oss-cn-beijing.aliyuncs.com6555843-15f8df36b52bc57f.png)

image.png

#### 12.配置负载均衡，访问ip/demo1时，平均分发到8080端口和8081端口上，即`it is html1`和`it is html3`间接出现。

> 配置负载均衡，那就是配置在第二次的nginx上，就是反向代理的nginx上，我们去conf.d2文件夹下，修改default.conf文件，如下：



```cpp
upstream group1{
    server 你的刚才的ip地址:8080;
    server 你的刚才的ip地址:8081;
}

server {
    listen       80;
    server_name  localhost;
    location /demo1 {
        proxy_pass   http://group1/;
    }
}
```

> 此时，查看所有运行中的docker容器:`docker ps`

![img](https://guokai1.oss-cn-beijing.aliyuncs.com/https://guokai1.oss-cn-beijing.aliyuncs.com6555843-4d08b08beb1da199.png)

image.png

> 然后重启该容器，`docker restart 容器id`

#### 13. 查看效果

> 访问ip/demo1，每次刷新页面，页面都会在html1和html3中进行切换，此时负载均衡的效果就实现了。

![img](https://guokai1.oss-cn-beijing.aliyuncs.com/https://guokai1.oss-cn-beijing.aliyuncs.com6555843-d882deca020b5814.gif)

https://raw.githubusercontent.com/xicunyang/images/master/change-page.gif

#### 14. 配置负载均衡的权重

> 可以使用下面的配置修改两个端口的权重(即谁被访问的概率大)



```cpp
upstream group1{
    server 你的刚才的ip地址:8080 weight=1;
    server 你的刚才的ip地址:8081 weight=10;
}

server {
    listen       80;
    server_name  localhost;
    location /demo1 {
        proxy_pass   http://group1/;
    }
}
```

# 步骤3：本地创建实例vue项目并上传到github上



#### 0. 确保你的本机电脑是有node环境的，使用下面的命令检查一下

![img](https://upload-images.jianshu.io/upload_images/6555843-5fe4d154178f4704.png?imageMogr2/auto-orient/strip|imageView2/2/w/323/format/webp)



> 如果没有显示版本号，证明你没有安装node环境，请移步度娘，搜索怎么安装node环境。

#### 0.1 安装好node之后，即得到了npm包管理工具，使用下面的命令检查一下

![img](https://upload-images.jianshu.io/upload_images/6555843-24e458fbeeb86606.png?imageMogr2/auto-orient/strip|imageView2/2/w/239/format/webp)



> 如果没有显示版本号，请检查原因。

#### 0.2 使用npm包管理工具安装vue-cli脚手架，安装命令如下：

![img](https://upload-images.jianshu.io/upload_images/6555843-985dcc1a3870a7b0.png?imageMogr2/auto-orient/strip|imageView2/2/w/839/format/webp)

image.png

> 如果直接使用`npm install -global vue-cli`安装的时候，会报没有权限的错误，此时在前面加上sudo即可，这是mac系统的解决方案，windows如果有这种情况，请自行查找解决方案。

#### 1. 使用vue-cli生成vue项目

> 在任意一个文件夹下，使用vue-cli命令生成项目

![img](https://upload-images.jianshu.io/upload_images/6555843-ac10de1d16c820eb.png?imageMogr2/auto-orient/strip|imageView2/2/w/907/format/webp)

image.png

#### 2. 进入App.vue组件页面，简单修改

![img](https://upload-images.jianshu.io/upload_images/6555843-767eb4269b723374.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

image.png

#### 4. 使用`npm run dev`或者 `yarn dev`启动项目

![img](https://upload-images.jianshu.io/upload_images/6555843-34b4ee7e96955fd7.png?imageMogr2/auto-orient/strip|imageView2/2/w/667/format/webp)

image.png

#### 5. 浏览器查看修改后的页面

![img](https://upload-images.jianshu.io/upload_images/6555843-f30b7ae387132fa0.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

image.png

#### 6. 分享该项目到github上(便于本机修改文件及时更新到服务器上)

![img](https://upload-images.jianshu.io/upload_images/6555843-b8756e3494de34b5.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

image.png

> 上传的方式有很多种，这里我使用的是我平时比较常用的方法，直接在编辑器(WebStorm)中集成的github。

#### 7. github查看

![img](https://upload-images.jianshu.io/upload_images/6555843-c1a4a1de9d6cbedd.png?imageMogr2/auto-orient/strip|imageView2/2/w/365/format/webp)

image.png

> 此时github上就找到了该项目

#### 8. 此时该步骤暂时结束，接下来就是在服务器上安装git并且登陆上。

# 步骤4：CentOS7.5安装Git，并拉取代码



#### 1. 登录服务器，并执行安装git的命令

![img](https://upload-images.jianshu.io/upload_images/6555843-d66020548daaf9a7.png?imageMogr2/auto-orient/strip|imageView2/2/w/992/format/webp)



#### 2. 等待一下，安装结束后，检查是否安装成功，出现版本号即代表安装成功

![img](https://upload-images.jianshu.io/upload_images/6555843-fb75519bfa72de38.png?imageMogr2/auto-orient/strip|imageView2/2/w/1070/format/webp)



#### 3. git配置

- 1.配置一个用于提交代码的用户，输入命令：



```csharp
git config --global user.name "Your Name"
```

- 2.配置一个用户邮箱，输入命令：



```css
git config --global user.email "email@example.com"
```

- 3.生成公钥和私钥，输入命令后一路回车即可：



```css
ssh-keygen -t rsa -C "youremail@example.com"
```

![img](https://upload-images.jianshu.io/upload_images/6555843-b83df6da4fc06f6c.png?imageMogr2/auto-orient/strip|imageView2/2/w/771/format/webp)

> 该位置的文件稍等会用到

#### 4. 打开github，找到setting

![img](https://upload-images.jianshu.io/upload_images/6555843-7259a6414ba2ecd9.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

image.png

#### 5. 添加SSH key

![img](https://upload-images.jianshu.io/upload_images/6555843-4d1b02d0d9a0c4b2.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

image.png

> title字段随便填写，Key字段请打开下面的文件，并复制内容粘贴进去。

![img](https://upload-images.jianshu.io/upload_images/6555843-ca3ae4077abb1147.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

image.png

> 然后就成功添加SSH key

#### 5. 在服务器新建目录，拉取项目代码,使用git clone命令

![img](https://upload-images.jianshu.io/upload_images/6555843-980092628da11ee2.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

image.png



![img](https://upload-images.jianshu.io/upload_images/6555843-d0e2b68ea15af539.png?imageMogr2/auto-orient/strip|imageView2/2/w/897/format/webp)

image.png

> 假如对git命令不太熟悉，请移步:[git相关操作记录](https://www.jianshu.com/p/b9219699b8a2)

#### 6. 至此，服务器端项目代码拉取完毕，接下来在本地编译该代码，生成静态文件

# 步骤5：CentOS安装node环境，并编译前端项目

#### 1.centos安装node环境

- 1.下载nodejs最新的tar包

> 可以在下载页面[https://nodejs.org/en/download/](https://links.jianshu.com/go?to=https%3A%2F%2Fnodejs.org%2Fen%2Fdownload%2F)中找到下载地址。然后执行指令



```ruby
$ wget https://nodejs.org/dist/v9.3.0/node-v9.3.0-linux-x64.tar.xz
```

- 2,解压包



```ruby
$ tar -xvf node-v9.3.0-linux-x64.tar.xz
```

- 3.部署bin文件

> 先确认你nodejs的路径，我这里的路径为~/node-v9.3.0-linux-x64/bin。确认后依次执行



```ruby
$ ln -s ~/node-v9.3.0-linux-x64/bin/node /usr/bin/node
$ ln -s ~/node-v9.3.0-linux-x64/bin/npm /usr/bin/npm
```

> 注意ln指令用于创建关联（类似与Windows的快捷方式）必须给全路径，否则可能关联错误。

- 1. 测试一下



```ruby
$ node -v
```

#### 2. 安装yarn(可选)



```ruby
$ npm install yarn -g
$ ln -s ~/node/node-v9.3.0-linux-x64/bin/yarn /usr/bin/yarn
```

#### 3. 打包前端项目

> 进入前端项目目录中，安装依赖



```ruby
$ npm install
或者是
$ yarn
```

![img](https://upload-images.jianshu.io/upload_images/6555843-479e7a6715191392.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

image.png

#### 4.打包项目



```ruby
$npm run build
或者是
$ yarn build 
```

![img](https://upload-images.jianshu.io/upload_images/6555843-b8bc67fbc8b686ea.png?imageMogr2/auto-orient/strip|imageView2/2/w/1021/format/webp)

#### 5. 检查打包后的静态文件

> 1.会多了这么个文件夹dist，里面就是打包好的静态文件。

![img](https://upload-images.jianshu.io/upload_images/6555843-b9b72f8aae763563.png?imageMogr2/auto-orient/strip|imageView2/2/w/1003/format/webp)



![img](https://upload-images.jianshu.io/upload_images/6555843-f8e0fd995ff3ac2b.png?imageMogr2/auto-orient/strip|imageView2/2/w/974/format/webp)

# 步骤6：将编译后的静态文件放到nginx中



#### 1.第一步，先把原来启动的8080端口的docker容器停止掉

![img](https://upload-images.jianshu.io/upload_images/6555843-6939bc850bdcb4c2.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)



![img](https://upload-images.jianshu.io/upload_images/6555843-4fd0d33b037f81b3.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

#### 2. 重新运行docker的nginx容器

> 警告！此时你一定要在项目的根目录中哦，不然的话也可以根据你目前的目录简单调整启动命令。



```bash
docker run -d -p 8080:80 -v $PWD/dist:/usr/share/nginx/html nginx
```

> 简单说明：`$PWD`是指的当前路径，上面的警告的意思是启动命令已经规定了是当前项目根目录下的`dist`文件夹(`$PWD/dist`)，如果不在项目根目录，会出现一些问题。

#### 3.检查刚才的nginx(8080)容器是否启动成功

![img](https://upload-images.jianshu.io/upload_images/6555843-3156b242ed033bb8.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

image.png

> 可以看到 正在运行 这时候访问浏览器测试8080端口是否成功部署静态页面。

![img](https://upload-images.jianshu.io/upload_images/6555843-78f0963f90fded08.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)



> 至此，在CentOS7.5s上使用docker启动nginx并部署前端vue项目的记录暂时结束，下面一篇会简单的优化一点点小细节。

# 步骤7：增加前端启动命令，简化流程



#### 1.增加前端启动命令

> 为什么要加上前端的启动命令呢？
> 我们分析一下：前端代码改动后我们会进行下面几步操作：
>
> 1. git pull 拉取最新代码
> 2. yarn build或者npm run build，进行打包
> 3. 停止原来的nginx容器，启动新的nginx容器（除了第一次启动时外，非必须）



```csharp
git pull

yarn --registry=https://registry.npm.taobao.org/ && yarn build

#删除容器
docker rm -f demo1 &> /dev/null

#启动容器
docker run -d --restart=on-failure:5\
    -p 8080:80 \
    -v $PWD/dist:/usr/share/nginx/html \
    --name demo1 nginx
```

> 这样的话 我们可以将这些操作合并在一个sh文件(linux中的)中，以后可能会有更多的命令，都可以放在一起

#### 2.根目录新增文件start.sh，如图，内容见上方

![img](https://upload-images.jianshu.io/upload_images/6555843-109491de09dc2b49.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

image.png

> 并随意修改App.vue，使其待会可以判断重启成功

![img](https://upload-images.jianshu.io/upload_images/6555843-fab3501758763c69.png?imageMogr2/auto-orient/strip|imageView2/2/w/1040/format/webp)

image.png

#### 3.提交代码到git后，服务器git pull拉下来最新代码

![img](https://upload-images.jianshu.io/upload_images/6555843-cd81568054ff5c8f.png?imageMogr2/auto-orient/strip|imageView2/2/w/717/format/webp)

image.png

#### 4. 执行启动脚本



```ruby
$ sh start.sh
```

![img](https://upload-images.jianshu.io/upload_images/6555843-03e7078cc4c975c3.png?imageMogr2/auto-orient/strip|imageView2/2/w/1108/format/webp)

image.png

> 打开页面 即可看到页面发生了变化

![img](https://upload-images.jianshu.io/upload_images/6555843-9cebf07deb06063c.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)



### end

> 这里简单实用了linux中的sh脚本代替我们频繁重启中额外的操作

# 问题解决2：当vue路由采用history模式时，访问页面时会出现404找不到现象



> 以上几个教程里所使用的测试vue项目`(demo1)`均是十分简单的项目，完全没涉及到`router路由`或者其他的知识，今天一位小哥将自己的项目部署到`nginx`后，发现某些页面在访问的时候偶尔会出现`404`找不到，因此找到我，共同解决了这个问题。在解决过程中，发现这其实也是个`老生常谈`的问题，最主要就是vue项目的路由采用了`history模式`，才导致了这个问题。

既然问题已经找到了，那么就应该探究下为什么会出现这个问题：

- #### 1.首先我们先理解一下SPA(单页Web应用)的概念：

> 由于我们是使用vue搭建的`单页web应用(SPA)`，就是只有一个Web页面的应用，是在打开页面的时候加载单个HTML页面(index.html)，在用户与程序交互的时候动态获取数据(axios)的Web页面程序。
>
> - 单页面应用程序：
>   只有在第一次才会向后台请求页面，之后的每次请求都是去获取到必要的数据，由页面上的js解析数据后动态展示到页面上
> - 传统单页面程序：
>   每次页面的跳转都是去服务器请求页面
>
> 因此，单页面应用程序的优势就体现出来了：
> **减少请求的密度，加快了页面的响应速度，降低了服务器上的压力，有着更好的用户体验，让用户在web app上也能感受到native app的流畅。**

- #### 2.引出路由

既然是单页面程序，那么我们看到的页面跳转是什么情况呢？一个页面怎么会来回跳转呢？此时就理所应当的引出vue中的重中之重，**vue-router**（单页面应用程序的`路径管理器`）。
vue的单页面应用是基于`路由`+`组件`的，路由用于设定`访问路径`，并且将`路径`与`组件`进行连接；在传统的多页面应用中，是使用一些超链接`<a></a>`来进行页面跳转与切换的；而在vue-router中，不是页面的切换，而是组件的切换，所以，路由的本质就是 `建立起url和组件之间的映射关系`

- ##### vue-router的工作原理是什么呢？

  SPA(single page application)

  :单页面应用程序，其中只有一个完整的页面(index.html)；它在加载页面的时候，不会加载所有页面，而是只更新某个指定的容器中的内容。

  单页面应用程序的核心之一就是：更新视图而不重新请求页面；

  vue-router在实现单页面前端路由的时候，提供了两种方式：

  Hash模式

  与

  History模式

  ，根据**mode参数来自由选择采用什么方式。

- 1. Hash模式
     vue-router默然采用的就是Hash模式---采用URL的Hash来模拟一个完整的URL，于是当URL发生改变的时候，页面不会重新加载。hash(#)是URL的锚点，代表的是网页中的一个**位置**，单单改变#后面的部分，浏览器只会滚动到相应的位置，而不会去后端请求网页资源，也就是说**#是用来指导浏览器动作**的，对服务器端完全不起作用，HTTP请求中也不包括#；同时每一次改变#后面的部分，都会在浏览器的访问历史中增加一个记录，当使用浏览器的“后退”按钮的时候，就可以返回上一个位置；**所以说Hash模式是使用锚点值的改变，根据不同的值，渲染指定DOM元素的不同数据。**

- 1. history模式
     由于Hash模式中会在URL上自带#，如果不想要很丑的#的话，我们可以使用路由的history模式，只需要在配置路由规则的时候，加入值：`mode:'hostory'`,这种模式充分利用了history.pushState API来完成URL跳转而无需重新加载页面。



```csharp
//main.js文件中
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

当你在使用history模式的时候，URL就会像是正常的URL，没有#存在，比较美观。不过这种模式如果不加以配置的话，会有一个深坑，深坑出现的原因简单介绍一下：

当我们使用history模式的时候进行页面跳转的时候，其vue-router原理是使用HTML5的新接口`pushState和replaceState`,这两个接口的最大的特点就是**改变URL地址，但却不刷新页面**，注意！！！**仅仅改变网址，网页不是真正的跳转了，也不会获取到新的资源，本质上，网页还是停留在原来的页面(index.html)**。

- 举个栗子🌰：
  打开首页后，你的URL显示[www.xxx.com/home](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.xxx.com%2Fhome)，这时候能正常显示，没问题，此时你进入到注册页，URL此时是[www.xxx.com/home/reg](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.xxx.com%2Fhome%2Freg)，这个时候，当你点击刷新时，浏览器就会拿着当前的地址[www.xxx.com/home/reg](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.xxx.com%2Fhome%2Freg)去后台请求该资源，后台肯定没有对应的资源，所以就会报404找不到，这样就很明了了！
- 该怎样解决呢？
  栗子🌰中出现的问题，我们可以想想一下，假如一旦浏览器向服务器请求找不到404时，就还跳回到最初的index.html页面，页面再根据URL上的路径跳转到对应的组件里不就好了嘛！事实上，我们就是这么取解决的，在服务器上进行以下相关配置即可解决该问题！
  [vue-router history后端配置例子](https://links.jianshu.com/go?to=https%3A%2F%2Frouter.vuejs.org%2Fzh%2Fguide%2Fessentials%2Fhistory-mode.html%23%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)

**至此，还问题的前因后果已经讲清楚了，以后再遇到类似的问题也会有解决思路了，这样就很好，希望以后一直坚持住！**