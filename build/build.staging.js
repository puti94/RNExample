const fs = require("fs");

fs.writeFile('./build/env.js', 'export const NODE_ENV = "staging";',function(err){
    if(err) console.error('配置灰度环境失败');
    else console.log('配置灰度环境成功');
});