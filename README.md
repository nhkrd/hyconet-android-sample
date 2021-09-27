# Hyconet-android-sample

Hybridcast-Connect Client Application as Android Sample.

[Japanese](./README_JP.md)

## Overview

"Hyconet-android-sample" is the sample applicaiton of client-side reference implementation of the "Hybridcast-Connect" that was standardized at Sep.2018 in IPTV Forum Japan. The application is also one of the sample app to use the "Hybridcast-Connect" reference client(SDK) "[hyconet4j](https://github.com/nhkrd/hyconet4j)".
"Hybridcast-Connect" can realize to control some parts of the functions of a tuner on a TV Set from a application outside of the tuner , and communicate with text message between the TV Set and some applications.
"Hyconet-android-sample" can connect the antwapp4hc, that is the "Hybridcast-Connect" server-side reference implementation, and you can see how the process is working on the "Hybridcast-Connect" protocol.

For more detail, see [About "Hybridcast-Connect"](./HybridcastConnect.md). For use of "hyconet-android-sample", see [LICENSE](./LICENSE.txt) and [NOTICE](./NOTICE.txt).

![Hyconet-Android-Sample Overview](./docs/imgs/hybridcast-connect-overview-oss.png)

- Reference
    - [Abount "Hybridcast-Connect"](./HybridcastConnect.md)
    - [IPTVFJ STD-0013 "Hybridcast Operational Guideline"](https://www.iptvforum.jp/download/input.html)
    - [W3C TPAC2018 Media&Entertainment IG "RecentAchievementOfHybridcast in TPAC2018"](https://www.w3.org/2011/webtv/wiki/images/4/45/RecentAchievementHybridcast_TPAC20181022.pdf)
    - [W3C TPAC2019 Media&Entertainment IG "RecentAchievementOfHybridcast in TPAC2019"](https://www.w3.org/2011/webtv/wiki/images/d/d1/MediaTimedEventsInHybridcast_TPAC20190916.pdf)
    - [W3C TPAC2020 Media&Entertainment IG "RecentAchievementOfHybridcast in TPAC2020"](https://www.w3.org/2011/webtv/wiki/images/2/22/RecentUpdateHybridcast_TPAC20201021_%281%29.pdf)

---

## Environment

- AndroidOS:8.0
- AndroidOS:9.0
- AndroidOS:10.0
- AndroidOS:11.0

---

## Directories

### ./app/libs

Dependent libraries that cannot be redistributed from other repositories.

- Jar package as SDK Library :[hyconet4j](https://github.com/nhkrd/hyconet4j).
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

### Docker

Use docker to build.
"docker-compose" also be available to build.

```bash
$ docker-compose build
$ docker-compose up
```

---

## Quick Install

To install the app "hyconet-android-sample.apk" as a development, change the configuration "ADB install" to "Enabled" in "developer mode configuration of the androidOS, and transfer apk file with Android Studio or with adb command directly.

---

## Sample Android Application Overview

This instruction shows the application structure of the sample android application itself.

### **Structure of Android View**

<img src="./docs/imgs/hyconet-android-sample-appview.jpg" width="500px">

- WEBVIEW Screen

    Web browser screen that loads sample html.
    The initial page of the "hyconet-android-sample", "index.html" enables to input URL and to load another html.
    "hyconet-android-sample" can load "androidSample.html" that is the sample of checking the functions in "Hybridcast-Connect" protocol. For more details, see [./docs/hyconet-android-sample-web.md](./docs/hyconet-android-sample-web.md).

- LOG Screen

    The screen show the logs of the android application.

- SETTING Screen

    The screen enables to call the Native APIs that have the functions to use "Hybridcast-Connect" Protocol with "[hyconet4j](https://github.com/nhkrd/hyconet4j)".

    [hyconet4j](https://github.com/nhkrd/hyconet4j)が提供する機能のAPIを直接実行することができる画面。
    

### **Additional Javascript APIs For "Hybridcast-Connect"**

This Android Sample App utilizes the android webview based browser, custom HTML5 browser. The browser provides additional javascript interfaces(APIs) for "Hybridcast-Connect" protocol that was standardized at Sep.2018 in IPTV Forum Japan. For more details, see [./docs/hyconet-android-sample-web.md](./docs/hyconet-android-sample-web.md) .

# License

See [LICENSE.txt](./LICENSE.txt) and [NOTICE.txt](./NOTICE.txt).

---

And see additional side information: "Hyconet-Android-Sample" repository includes third party's oss jar packages themselves  below in some reason:

- cybergarage-upnp-core-2.1.1.jar

    - Repository: https://github.com/cybergarage/cybergarage-upnp
    - LICENSE: https://github.com/cybergarage/cybergarage-upnp/blob/master/LICENSE.txt

    Cybergarase Public Repository can not be available frequently, so in a solution, this "hyconet4j" repository includes static jar package "cybergarage-upnp-core-2.1.1.jar" that is built with `maven install` from source code.

- JSON-java-20170220.java

    - Repository: https://github.com/stleary/JSON-java
    - LICENSE: https://github.com/stleary/JSON-java/blob/master/LICENSE

    It is the standard Java implementation in JSON. But for Android Develepment, there's [confliction problem between JSON-java and android](https://github.com/stleary/JSON-java/wiki/JSON-Java-for-Android-developers), then this "hyconet4j" repository solves the problem by changing package name from "org.json" to "JSON-java".
