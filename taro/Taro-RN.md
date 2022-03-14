### 确认系统环境

node 版本 > 8.3

  node --version 

java版本 = 1.8

    javac -version

SDK Manager 中选择  "SDK Platforms" 安装：

    Android SDK Platform 28 （ Android 6.0不一定有Android SDK Platform 28，找其他版本下的Android SDK Platform 28安装即可 ）
    
    Intel x86 Atom_64 System Image

### 参考文档


https://reactnative.cn/docs/environment-setup

https://taro-docs.jd.com/taro/docs/2.x/react-native


触发 js bundle 构建
http://127.0.0.1:8081/rn_temp/index.bundle?platform=android&dev=true

### 错误

```
A problem occurred configuring project ':expo-app-loader-provider'.
> Could not resolve all artifacts for configuration ':expo-app-loader-provider:classpath'.
   > Could not resolve com.android.tools.build:gradle:3.1.3.
     Required by:
         project :expo-app-loader-provider
      > Could not resolve com.android.tools.build:gradle:3.1.3.
         > Could not get resource 'https://maven.google.com/com/android/tools/build/gradle/3.1.3/gradle-3.1.3.pom'.
            > Could not GET 'https://maven.google.com/com/android/tools/build/gradle/3.1.3/gradle-3.1.3.pom'.
               > Connect to maven.google.com:443 [maven.google.com/172.217.163.46] failed: Connection timed out: connect
   > Could not resolve com.android.tools.build:gradle:3.1.3.
     Required by:
         project :expo-app-loader-provider
      > Could not resolve com.android.tools.build:gradle:3.1.3.
         > Could not get resource 'https://maven.google.com/com/android/tools/build/gradle/3.1.3/gradle-3.1.3.pom'.
            > Could not GET 'https://maven.google.com/com/android/tools/build/gradle/3.1.3/gradle-3.1.3.pom'.
               > Connect to maven.google.com:443 [maven.google.com/172.217.163.46] failed: Connection timed out: connect

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.

* Get more help at https://help.gradle.org

BUILD FAILED in 2m 50s

error Failed to install the app. Make sure you have the Android development environment set up: https://reactnative.dev/docs/environment-setup. Run CLI with --verbose flag for more details.
Error: Command failed: gradlew.bat app:installReleaseStaging -PreactNativeDevServerPort=8081
···



```

 Android 安装 gradle-3.1.3.pom 报 4XX 错误。解决方案：需要将 node_modules/expo-app-loader-provider/android/build.gradle 中做出如下改动

```
buildscript {
    repositories {
        jcenter()
        // maven {
        //     url 'https://maven.google.com/'
        //     name 'Google'
        // }
       maven { url 'https://dl.google.com/dl/android/maven2/' }
    }
```

    dependencies {
        classpath 'com.android.tools.build:gradle:3.1.3'
    }
Could not determine the dependencies of task ':app:mergeDebugAssets'.
> Could not resolve all task dependencies for configuration ':app:debugRuntimeClasspath'.
   > Could not find com.github.LuckSiege.PictureSelector:picture_library:2.5.6.
     Searched in the following locations:
       - https://jcenter.bintray.com/com/github/LuckSiege/PictureSelector/picture_library/2.brary-2.5.6.pom
       - https://jcenter.bintray.com/com/github/LuckSiege/PictureSelector/picture_library/2.brary-2.5.6.jar
       - https://repo.maven.apache.org/maven2/com/github/LuckSiege/PictureSelector/picture_licture_library-2.5.6.pom
       - https://repo.maven.apache.org/maven2/com/github/LuckSiege/PictureSelector/picture_ltureSelector/picture_library/2.5.6/picture_library-2.5.6.pom
       - http://maven.aliyun.com/nexus/content/groups/public/com/github/LuckSiege/PictureSelector/picture_library/2.5.6/picture_library-2.5.6.jar
       - http://maven.aliyun.com/nexus/content/repositories/jcenter/com/github/LuckSiege/PictureSelector/picture_library/2.5.6/picture_library-2.5.6.pom
       - http://maven.aliyun.com/nexus/content/repositories/jcenter/com/github/LuckSiege/PictureSelectctureSelector/picture_library/2.5.6/picture_library-2.5.6.jar
       - file:/C:/Users/admin/.m2/repository/com/github/LuckSiege/PictureSelector/picture_library/2.5.ibrary/2.5.6/picture_library-2.5.6.pom
       - file:/C:/Users/admin/.m2/repository/com/github/LuckSiege/PictureSelector/picture_library/2.5.ibrary/2.5.6/picture_library-2.5.6.jar
       - https://dl.google.com/dl/android/maven2/com/github/LuckSiege/PictureSelector/picture_library/re_library/2.5.6/picture_library-2.5.6.pom
       - https://dl.google.com/dl/android/maven2/com/github/LuckSiege/PictureSelector/picture_library/re_library/2.5.6/picture_library-2.5.6.jar
       - http://maven.aliyun.com/nexus/content/repositories/releases/com/github/LuckSiege/PictureSelecictureSelector/picture_library/2.5.6/picture_library-2.5.6.pom
       - http://maven.aliyun.com/nexus/content/repositories/releases/com/github/LuckSiege/PictureSelecictureSelector/picture_library/2.5.6/picture_library-2.5.6.jar
       - file:/E:/code/cybershop-saas-weapp-app/node_modules/react-native/android/com/github/LuckSiegeb/LuckSiege/PictureSelector/picture_library/2.5.6/picture_library-2.5.6.pom
       - file:/E:/code/cybershop-saas-weapp-app/node_modules/react-native/android/com/github/LuckSiegeb/LuckSiege/PictureSelector/picture_library/2.5.6/picture_library-2.5.6.jar
       - file:/E:/code/cybershop-saas-weapp-app/node_modules/jsc-android/dist/com/github/LuckSiege/PicckSiege/PictureSelector/picture_library/2.5.6/picture_library-2.5.6.pom
       - file:/E:/code/cybershop-saas-weapp-app/node_modules/jsc-android/dist/com/github/LuckSiege/PicckSiege/PictureSelector/picture_library/2.5.6/picture_library-2.5.6.jar
       - https://jitpack.io/com/github/LuckSiege/PictureSelector/picture_library/2.5.6/picture_libraryure_library-2.5.6.pom
       - https://jitpack.io/com/github/LuckSiege/PictureSelector/picture_library/2.5.6/picture_libraryure_library-2.5.6.jar
       - file:/E:/code/cybershop-saas-weapp-app/android/app/libs/picture_library-2.5.6.jar 
       - file:/E:/code/cybershop-saas-weapp-app/android/app/libs/picture_library.jar       
     Required by:
         project :app > project :react-native-syan-image-picker


Execution failed for task ':app:installDebug'.
com.android.builder.testing.api.DeviceException: No online devices found.

解决办法：

1.输入adb devices 查看当前设备列表及其状态。

          第一次执行此命令会先杀掉adb进程：adb server is out of date, killing....
    
          等待一会，如果提示，*daemon started sucessfully,那么继续  adb devices 查看设备状态，
    
          如果是：｛
    
                   * daemon started successfully *
                   List of devices attached
                   emulator-5554   device
    
           ｝
    
            应该就OK了
    
          如果是： ｛
    
                    fail to started daemon...
    
         ｝,
    
          那么你可以：adb kill-server
    
                                adb start-server
    
                                adb devices。
    
     注：杀掉adb进程和重启adb进程后，要重启下模拟器（真机的话，要重新连接下），如果不行，可能还要重启Android


### 配置 ANDROID_HOME 环境变量

React Native 需要通过环境变量来了解你的 Android SDK 装在什么路径，从而正常进行编译。

具体的做法是把下面的命令加入到 ~/.bash_profile 文件中：

~表示用户目录，即/Users/你的用户名/，而小数点开头的文件在 Finder 中是隐藏的，并且这个文件有可能并不存在。可在终端下使用vi ~/.bash_profile命令创建或编辑。如不熟悉 vi 操作，请点击 这里 学习。

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

如果你的命令行不是 bash，而是例如 zsh 等其他，请使用对应的配置文件。

使用 source $HOME/.bash_profile 命令来使环境变量设置立即生效（否则重启后才生效）。可以使用 echo $ANDROID_HOME 检查此变量是否已正确设置。

请确保你正常指定了 Android SDK 路径。你可以在 Android Studio 的 "Preferences" 菜单中查看 SDK 的真实路径，具体是Appearance & Behavior → System Settings → Android SDK。



### 用android 启动真机


### 真机调试

通过真机上的menu按键或者摇晃手机会出现一个菜单，然后选择"Debug JS Remotely"选项



### 2022-3-14   权限

某些权限（例如 CAMERA）可让您的应用访问只有部分 Android 设备具有的硬件组件。如果您的应用声明了这类硬件相关权限，请考虑您的应用在没有该硬件的设备上会不会完全无法运行。在大多数情况下，硬件是可选的，因此最好在 <uses-feature> 声明中将 android:required 设置为 false，从而将硬件声明为可选项，如以下代码段所示：

AndroidManifest.xml

```xml
<manifest ...>
    <application>
        ...
    </application>
    <uses-feature android:name="android.hardware.camera"
                  android:required="false" />
<manifest>
```

