//
//  RCTUITest.swift
//  RNExample
//
//  Created by puti on 2018/4/22.
//  Copyright © 2018年 Facebook. All rights reserved.
//

import Foundation

class RCTUITest: UILabel {

  override init(frame: CGRect) {
    super.init(frame: frame)
    self.text = "原生字符"
    self.font = UIFont(name: "Georgia", size: 20)
    self.textAlignment = .center
    self.textColor = .black
  }


  func setCustomText(_ text: String) {
    self.text = text
  }

  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

}
