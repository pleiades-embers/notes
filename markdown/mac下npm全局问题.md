## Homebrew 是mac上的包管理工具，其官网；

http://brew.sh/

在使用brew安装node之后安装一些常见工具比如 gulp

```linux
npm install -g gulp
```
提示安装成功之后 ，使用发现不存在comman gulp,这个时候我们要检查下npm全局路径在哪里
```linux
npm root -g
```
正常的路径应该是  /usr/local/lib/node_modules，如果你的不是就要重新指定：

```linux
npm config set prefix /usr/local
```
然后在执行检查路径的方法看看是不是正常了呢？问题搞定~

## npm全局安装找不到

查看node安装路径
```linux
which node
```

同样需要配置环境变量，修改/etc/profile文件，在文件尾部添加以下几行-
```linux
export NODE_HOME=/root/node #node的安装路径
export PATH=$PATH:$NODE_HOME/bin
export NODE_PATH=$NODE_HOME/lib/node_modules
```

修改完之后记得使用
```linux
source /etc/profile
```

全局安装和安装到指定目录下的 package.json 是不一样的效果，输入npm list -g --depth 0中查看是否安装到了全局



## 如何解决zsh: command not found:

    命令行输入 vim ~/.zshrc

    发现我的mac 下的 export PATH 路径是 yarn 的全局路径 所以使用yarn 全局安装包吧
## yarn全局安装找不到

yarn global add xxx

yarn global bin //查找yarn安装目录

## 添加zsh 全局包环境变量

注意 路径拼写
export NODE_PATH=/Users/apple/.npm-global/bin
export PATH=$PATH:$NODE_PATH
source ~/.bash_profile 

open ~/.zshrc
source ~/.zshrc