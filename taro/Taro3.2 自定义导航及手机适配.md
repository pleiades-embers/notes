# Taro3.2 自定义导航及手机适配

> 自定义导航沉浸式体验  自定义导航并不难,难在让每个导航条适配安卓 ios 刘海屏 全面屏等手机 否则会出现和导航条和右上角对不齐得情况
>
> 查阅了大量资料 有解决方案 也有开源组件  https://github.com/lingxiaoyi/Taro-navigation-bar
>
> 但是目前此组件不支持Taro3.2 而且需要取其精华去其糟粕  在此分析源码逐步拆分 将各种技巧记录下来 

## 1.开启自定义导航条模式

> 开启了自定义导航才可以打通手机上面得区域 增加全屏效果 

在根目录app.config.ts 文件中

```json
  window: {
     navigationStyle: 'custom'
  }
```

但是此方法有个缺点就是所有页面都会变成自定义导航条模式

单独一个页面开启得方式就是 在页面指引得index.config.ts

```json
export default {
  navigationBarTitleText: '',
  navigationStyle: 'custom'
}
```

## 2.判断手机所属阵营(型号)

在taro3文档中有这么一个方法 [getSystemInfoSync](https://taro-docs.jd.com/taro/docs/apis/base/system/getSystemInfoSync) 可以获取手机型号 参数如下

```json
let systemInfo={
    SDKVersion: "2.16.0",
     batteryLevel: 100,
     benchmarkLevel: 1,
     brand: "devtools",
     deviceOrientation: "portrait",
     devicePixelRatio: 3.5,
     enableDebug: false,
     fontSizeSetting: 16,
     language: "zh_CN",
     model: "Nexus 6",
     pixelRatio: 3.5,
     platform: "devtools",
     safeArea: {top: 20, left: 0, right: 412, bottom: 732, width: 412},
     screenHeight: 732,
     screenWidth: 412,
     statusBarHeight: 20,
     system: "Android 5.0",
     version: "7.0.4",
     windowHeight: 732,
     windowWidth: 412,
}
```

system 记录着手机型号得信息 通过代码判断 是安卓还是ios 并返回布尔值方法如下

```javascript
 let ios = !!(systemInfo.system.toLowerCase().search('ios')+1);
```

!! 后得代码 负责在 `"Android 5.0" ` 这个字符串中搜索 ios 没有搜索到返回 -1  搜索到返回字符串坐标 所以没有找到 都是 !!0 也就是false  

## 3. 获取菜单按钮坐标

> 在 taro3.x 文档中 有这么一个方法  [Taro.getMenuButtonBoundingClientRect()](Taro.getMenuButtonBoundingClientRect()) 
>
> 获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。

```javascript
let rect={
    bottom: 80,
    height: 32,
    left: 281,
    right: 368,
    top: 48,
    width: 87
}
```

计算胶囊按钮得边距

```javascript
let rightDistance = systemInfo.width - rect.right ; //胶囊按钮右侧到屏幕右侧的边距
let leftWidth = rect.left; //胶囊按钮左侧到屏幕右侧的边距
```

通过菜单按钮得距离就可以计算出 导航条得宽度和高度

## 4. 通过事件 切换导航条模式

待补充..........

## 5. wifi开关导致获取不到菜单按钮坐标

待补充..........