/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>
#import "SplashScreen.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <Bugly/Bugly.h>


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  
  
#ifdef DEBUG
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  jsCodeLocation = [CodePush bundleURL];
#endif
  
  NSDictionary *extractedExpr = @{};
#if DEBUG == 1
  extractedExpr =@{@"BUILD_TYPES":@"DEBUG"};
#endif
#if STAGING == 1
  extractedExpr =@{@"BUILD_TYPES":@"STAGING"};
#endif
#if RELEASE == 1
  extractedExpr =@{@"BUILD_TYPES":@"RELEASE"};
#endif
  
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"RNExample"
                                               initialProperties:extractedExpr
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  //开发模式下占位屏可以先不用打开，以免JS发生错误红屏显示不出来
#if DEBUG != 1
  [SplashScreen show];
#endif
  [Bugly startWithAppId:@"1067191600"];
  return YES;
}


@end
