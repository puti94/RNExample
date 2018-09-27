const fs = require("fs");

fs.writeFile('./build/env.js', 'export const NODE_ENV = "dev";',function(err){
    if(err) console.error('配置开发环境失败');
    else console.log('配置开发环境成功');
});