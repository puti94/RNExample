# 尝试搭建一个react-native快速开发框架


### 目录结构

```
├── src                         // ReactNative主要文件
│   ├── base                    // app基础模块
│   │    ├── Api                // 可将项目网络请求接口都写在此处
│   │    ├── Config             // app配置项
│   │    ├── Constant           // 放置一些常量
│   │    ├── Global             // 为节省导入,可将一些全局变量放在此处
│   ├── components              // 通用组件
│   ├── page                    // 所有的StackNavigator注册页面或者Tab页面
│   ├── res                     // 资源文件。模仿android R文件统一引用
│   │    ├── image              // 图片资源
│   │    ├── json               // JSON文件
│   │    └── index.js           // 统一管理
│   ├── store.js                // 将所有存储状态的文件放此处
│   ├── utils.js                // 工具类
│   └── AppNav.js     // 导航配置项

```



### 主要第三方库
 - 数据管理   [mobx](https://github.com/mobxjs/mobx)
 - 路由导航  [react-navigation](https://github.com/react-navigation/react-navigation)
 - 主要UI框架  [teaset](https://github.com/rilyu/teaset)  [react-native-spinkit](https://github.com/maxs15/react-native-spinkit)
 - 启动页     [react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen)
 - 缓存清理   [react-native-http-cache](https://github.com/reactnativecn/react-native-http-cache)
 - 设备信息   [react-native-device-info](https://github.com/rebeccahughes/react-native-device-info)

### 功能集合
- [x] 启动页
- [x] react-navigation封装
- [x] 通讯录示例
- [x] 二维码扫描
- [x] 简单的网络图片占位图，错误图处理
- [x] 购物车示例(包含动画效果)
- [x] 缓存清理
- [x] code-push 热更新
- [x] bugly集成
- [x] 自定义原生UI的简单示例(ios使用swift混编)
- [x] 极光消息推送(ios待测试)
- [x] 微信支付宝支付
- [x] 第三方分享,登录(待测试)
- [x] Android App自更新