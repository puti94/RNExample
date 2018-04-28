//
//  nativeConstant.m
//  RNExample
//
//  Created by puti on 2018/4/28.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "nativeConstant.h"

#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>

@implementation nativeConstant
RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport
{
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
  return extractedExpr;
}


@end
