# ipfs 星际文件系统

### IPFS介绍

![image-20200608120151576](http://guokai1.oss-cn-beijing.aliyuncs.com/img/image-20200608120151576.png)



![image-20200609171539602](http://guokai1.oss-cn-beijing.aliyuncs.com/img/image-20200609171539602.png)

### IPFS js实现

![image-20200609171513072](http://guokai1.oss-cn-beijing.aliyuncs.com/img/image-20200609171513072.png)

### 安装 js版本的ipfs

```javascript
npm install ipfs -g
```

### IPFS 托管静态网站

假设您在目录中有一个静态网站`mysite`。

为了将其发布为站点，[请安装IPFS](https://docs.ipfs.io/install/)并确保IPFS守护程序正在运行：

```bash
$ ipfs daemon
```

![image-20200609172529918](http://guokai1.oss-cn-beijing.aliyuncs.com/img/image-20200609172529918.png)

然后在目录中添加您的网站：

```bash
$ ls mysite
img index.html
$ ipfs add -r mysite
added QmcMN2wqoun88SVF5own7D5LUpnHwDA6ALZnVdFXhnYhAs mysite/img/spacecat.jpg
added QmS8tC5NJqajBB5qFhcA1auav14iHMnoMZJWfmr4k3EY6w mysite/img
added QmYh6HbZhHABQXrkQZ4aRRSoSa6bb9vaKoHeumWex6HRsT mysite/index.html
added QmYeAiiK1UfB8MGLRefok1N7vBTyX8hGPuMXZ4Xq1DPyt7 mysite/
```

![image-20200609172651942](http://guokai1.oss-cn-beijing.aliyuncs.com/img/image-20200609172651942.png)

![image-20200609172713242](http://guokai1.oss-cn-beijing.aliyuncs.com/img/image-20200609172713242.png)

根目录hash`mysite/`是要记住的哈希，调用`$SITE_CID`。

```sh
QmR74BdR1LPAPq2THQDJ5jU2onntmh6nG1qB38CnTQGJD1
```

您可以通过`http://localhost:8080/ipfs/$SITE_CID`在浏览器中打开或使用`wget`或`curl`从命令行中进行本地测试。

![image-20200609173039642](http://guokai1.oss-cn-beijing.aliyuncs.com/img/image-20200609173039642.png)

要从另一个ipfs节点查看它，可以`http://gateway.ipfs.io/ipfs/$SITE_CID`在浏览器中尝试。这可以在添加了站点文件的网络内部或外部的另一台设备上的浏览器中进行。

```shell
访问不了添加 host 
209.94.78.78        ipfs.io
209.94.90.1         ipfs.io
```

![image-20200609174537908](http://guokai1.oss-cn-beijing.aliyuncs.com/img/image-20200609174537908.png)

至此 已发布到IPFS公网



这些哈希值很难记住。让我们看一些摆脱它们的方法。