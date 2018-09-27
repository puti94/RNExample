const fs = require("fs");

fs.writeFile('./build/env.js', 'export const NODE_ENV = "test";',function(err){
    if(err) console.error('配置测试环境失败');
    else console.log('配置测试环境成功');
});