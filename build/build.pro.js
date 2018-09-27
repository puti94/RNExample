const fs = require("fs");

fs.writeFile('./build/env.js', 'export const NODE_ENV = "pro";',function(err){
    if(err) console.error('配置正式环境失败');
    else console.log('配置正式环境成功');
});