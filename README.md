# Hyconet-android-sample

Hybridcast-Connect Client Application as Android Sample.

## Overview

"Hyconet-android-sample" is the sample applicaiton of client-side reference implementation of the "Hybridcast-Connect" that was standardized at Sep.2018 in IPTV Forum Japan. The application is also one of the sample app to use the "Hybridcast-Connect" reference client(SDK) "[hyconet4j](https://github.com/nhkrd/hyconet4j)".
"Hybridcast-Connect" can realize to control some parts of the functions of a tuner on a TV Set from a application outside of the tuner , and communicate with text message between the TV Set and some applications.
"Hyconet-android-sample" can connect the antwapp4hc, that is the "Hybridcast-Connect" server-side reference implementation, and you can see how the process is working on the "Hybridcast-Connect" protocol.

For more detail, see [About "Hybridcast-Connect"](./HybridcastConnect.md). For use of "hyconet-android-sample", see [LICENSE](./LICENSE.txt) and [NOTICE](./NOTICE.txt).


"Hyconet-android-sample"は、IPTV Forum Japanにおいて2018年9月に標準規格化された「ハイブリッドキャストコネクト」(以後、ハイコネ)のプロトコルを使ったAndroid実装のサンプルアプリです。
ハイコネプロトコルの機能は、リファレンスSDK（[hyconet4j](https://github.com/nhkrd/hyconet4j))を使うためのサンプルアプリとなっています。
ハイコネを利用すると、放送受信機能の一部の制御を受信機外のアプリケーションから実行でき、その受信機および受信機上のHybridcastサービスのブラウザアプリケーションと通信もできます。
本アプリは、ハイブリッドキャストコネクト対応の受信機を想定したAndroid実装のエミュレータである[antwapp4hc](https://github.com/nhkrd/antwapp4hc)と接続して、スマートフォン起点での端末連携拡張プロトコルAPIの疎通確認や基本機能の検証をすることができます。

詳しくは、[About "Hybridcast-Connect"](./HybridcastConnect.md)を参照ください。本ソフトウェアの利用に関しては、LICENSEおよびNOTICEファイルを参照ください。

![Hyconet-Android-Sample Overview](./docs/imgs/hybridcast-connect-overview-oss.png)

- Reference
    - [Abount "Hybridcast-Connect"](./HybridcastConnect.md)
    - [IPTVFJ STD-0013 "ハイブリッドキャスト運用規定(Hybridcast Operational Guideline)"](https://www.iptvforum.jp/download/input.html)
    - [W3C TPAC2018 Media&Entertainment IG "RecentAchievementOfHybridcast in TPAC2018"](https://www.w3.org/2011/webtv/wiki/images/4/45/RecentAchievementHybridcast_TPAC20181022.pdf)
    - [W3C TPAC2019 Media&Entertainment IG "RecentAchievementOfHybridcast in TPAC2019"](https://www.w3.org/2011/webtv/wiki/images/d/d1/MediaTimedEventsInHybridcast_TPAC20190916.pdf)

---

## Environment

- AndroidOS:8.0
- AndroidOS:9.0
- AndroidOS:10.0

---

## Directories

### ./app/libs

Dependent libraries that cannot be redistributed from other repositories.

- Jar package as SDK Library | ハイコネプロトコルリファレンスSDK:[hyconet4j](https://github.com/nhkrd/hyconet4j).
    - hyconet4j-x.y.z.jar

- Other Jar Package Dependencies
    - cybergarage-upnp-core-2.1.1.jar (NOTICE: see [License](#license))
    - JSON-java-20170220.jar (NOTICE: see [License](#license))

### ./app/src/main/assets

Sample Web(HTML) Client for the webview browser on the Android Application.

For more details, see [./docs/hyconet-android-sample-web.md](./docs/hyconet-android-sample-web.md).


---

## Build

### Android Studio

Use Android Studio to build.

Android Studio 使ってビルドを実施する.

### Docker

Use docker to build.
"docker-compose" also be available to build.

dockerを使ってビルドを実施する.
docker-composeを使うこともできる。

```bash
$ docker-compose build
$ docker-compose up
```

---

## Quick Install

To install the app "hyconet-android-sample.apk" as a development, change the configuration "ADB install" to "Enabled" in "developer mode configuration of the androidOS, and transfer apk file with Android Studio or with adb command directly.

開発目的でのインストール方法に準じます。対象のAndroid端末のOSセッティングにて、developer modeを有効にしてAndroid Studioまたはdockerでビルドしたパッケージ(apk)をAndroid Studioあるいはadbコマンド等でインストールする.


---

## Sample Android Application Overview

This instruction shows the application structure of the sample android application itself.

ここではサンプルのAndroidアプリとしての構成について説明します。

### **Structure of Android View**

<img src="./docs/imgs/hyconet-android-sample-appview.jpg" width="500px">

- WEBVIEW Screen

    Web browser screen that loads sample html.
    The initial page of the "hyconet-android-sample", "index.html" enables to input URL and to load another html.
    "hyconet-android-sample" can load "androidSample.html" that is the sample of checking the functions in "Hybridcast-Connect" protocol. For more details, see [./docs/hyconet-android-sample-web.md](./docs/hyconet-android-sample-web.md).


    HTMLをロードして表示するためのwebbrowser(android webview)。
    初期ページであるindex.htmlではURLを入力することができるので他のHTMLをロードすることもできる。
    androidSample.htmlは、ハイコネプロトコルの機能を確認するためのhtml/javascriptのサンプルである。htmlの詳細は[./docs/hyconet-android-sample-web.md](./docs/hyconet-android-sample-web.md)を参照。


- LOG Screen

    The screen show the logs of the android application.

    Androidアプリの動作ログを表示するタブ画面。

- SETTING Screen

    The screen enables to call the Native APIs that have the functions to use "Hybridcast-Connect" Protocol with "[hyconet4j](https://github.com/nhkrd/hyconet4j)".

    [hyconet4j](https://github.com/nhkrd/hyconet4j)が提供する機能のAPIを直接実行することができる画面。
    

### **Additional Javascript APIs For "Hybridcast-Connect"**

This Android Sample App utilizes the android webview based browser, custom HTML5 browser. The browser provides additional javascript interfaces(APIs) for "Hybridcast-Connect" protocol that was standardized at Sep.2018 in IPTV Forum Japan. For more details, see [./docs/hyconet-android-sample-web.md](./docs/hyconet-android-sample-web.md) .

Androidのサンプルアプリはandroid webviewベースのブラウザを使っています。このwebviewブラウザに"Hybridcast-Connect"で規定された拡張JavascriptAPIを実装しています。詳細は [./docs/hyconet-android-sample-web.md](./docs/hyconet-android-sample-web.md) を参照。


# License

See [LICENSE.txt](./LICENSE.txt) and [NOTICE.txt](./NOTICE.txt).

本ソフトウェアのライセンスについては[LICENSE.txt](./LICENSE.txt)および[NOTICE.txt](./NOTICE.txt)を参照。


---

And see additional side information: "Hyconet-Android-Sample" repository includes third party's oss jar packages themselves  below in some reason:

なお、本リポジトリには以下理由によりOSSパッケージを含みます。


- cybergarage-upnp-core-2.1.1.jar

    - Repository: https://github.com/cybergarage/cybergarage-upnp
    - LICENSE: https://github.com/cybergarage/cybergarage-upnp/blob/master/LICENSE.txt

    [当OSSのドキュメントに記載のMavenRepositoryのリンク](http://www.cybergarage.org:8080/maven/repo/)が不安定なため、当OSSを`maven install`して生成したjar package "cybergarage-upnp-core-2.1.1.jar"を本"hyconet4j"リポジトリは同梱

    Cybergarase Public Repository can not be available frequently, so in a solution, this "hyconet4j" repository includes static jar package "cybergarage-upnp-core-2.1.1.jar" that is built with `maven install` from source code.

- JSON-java-20170220.java

    - Repository: https://github.com/stleary/JSON-java
    - LICENSE: https://github.com/stleary/JSON-java/blob/master/LICENSE

    JSONのjava実装のスタンダートのため利用。ただし、androidで利用する場合、[当OSSのpackageName "org.json"が競合する](https://github.com/stleary/JSON-java/wiki/JSON-Java-for-Android-developers)ため、本"hyconet4j"リポジトリにおいてはandroidでの利用を想定して、packageNameを"JSON-java"へ変更し、同梱して利用。

    It is the standard Java implementation in JSON. But for Android Develepment, there's [confliction problem between JSON-java and android](https://github.com/stleary/JSON-java/wiki/JSON-Java-for-Android-developers), then this "hyconet4j" repository soloves the problem by changing package name from "org.json" to "JSON-java".

