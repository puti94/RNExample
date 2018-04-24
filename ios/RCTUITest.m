//
//  RCTUITest.m
//  RNExample
//
//  Created by puti on 2018/4/22.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(RCTUITest, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(customText,NSString);
@end

