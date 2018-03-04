# 尝试搭建一个react-native快速开发框架


### 目录结构

```
├── src                         // ReactNative主要文件
│   ├── base                    // app基础模块
│   │    ├── Api                // 可将项目网络请求接口都写在此处
│   │    ├── Config             // app配置项
│   │    ├── Constant           // 放置一些常量
│   │    ├── Database           // 本地存储接口可统一写在此处
│   │    ├── Global             // 为节省导入,可将一些全局变量放在此处
│   ├── components              // 通用组件
│   ├── page                    // 所有的StackNavigator注册页面或者Tab页面
│   ├── res                     // 资源文件。模仿android R文件统一引用
│   │    ├── image              // 图片资源
│   │    ├── json               // JSON文件
│   │    └── index.js           // 统一管理
│   ├── store.js                // 将所有存储状态的文件放此处
│   ├── utils.js                // 工具类
│   └── NavigationConfig.js     // 导航配置项

```



### 主要第三方库
 - 数据管理   [mobx](https://github.com/mobxjs/mobx)
 - 路由导航  [react-navigation](https://github.com/react-navigation/react-navigation)
 - 主要UI框架  [teaset](https://github.com/rilyu/teaset)
 - 启动页     [react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen)
 - 缓存清理   [react-native-http-cache](https://github.com/reactnativecn/react-native-http-cache)
 - 设备信息   [react-native-device-info](https://github.com/rebeccahughes/react-native-device-info)

### 功能集合
- [x] 启动页
- [x] 省市县三级联动
- [x] react-navigation封装
- [ ] code-push 热更新
- [ ] 极光消息推送
- [ ] 微信支付宝支付
- [ ] 第三方分享,登录
- [ ] 第三方分享,登录