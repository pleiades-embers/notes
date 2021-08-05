const fs = require('fs');
const path = require('path');
const cwd = process.cwd();
console.log(cwd);
const targetDirName = path.join(cwd, 'src');

try {
  //当前目录下创建src文件夹
  fs.mkdirSync(targetDirName);
} catch (error) {
  if (error.code !== 'EEXIST') {
    throw error;
  }
  // 否则继续填充文件到现有目录
}
// 只有目标目录下不存在文件时才安装模板
const files = fs.readdirSync(targetDirName);
const tsFiles = files.filter(file => file.toLowerCase().endsWith('.ts'));
if (tsFiles.length == 0) {
  console.log(
    'Target src directory already has ts files. ' +
      'Template files not installed.'
  );
  return false;
}


//  --- 代码块  ---
const fs = require('fs');
fs.chmodSync(__dirname+'/.nyc_output', 0o666);
fs.unlinkSync(__dirname+'/.nyc_output', 0o666)

const assert = require("assert");
assert(__dirname+'/.nyc_output');
