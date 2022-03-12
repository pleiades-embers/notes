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



1. Android 安装 gradle-3.1.3.pom 报 4XX 错误。解决方案：需要将 node_modules/expo-app-loader-provider/android/build.gradle 中做出如下改动

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

    dependencies {
        classpath 'com.android.tools.build:gradle:3.1.3'
    }
}
```


