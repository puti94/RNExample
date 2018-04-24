//
//  RCTUITestManager.swift
//  RNExample
//
//  Created by puti on 2018/4/24.
//  Copyright © 2018年 Facebook. All rights reserved.
//

import Foundation

@objc(RCTUITest)
class RCTUITestManager: RCTViewManager {
  override func view() -> UIView! {
    return RCTUITest()
  }
  
  
  
}
