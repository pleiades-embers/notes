const fs = require('fs');
const util = require('util');
const path = require('path');
const JSON5 = require('json5');
const ncp = require('ncp').ncp;

/**
 * demo util.promisify 1
 */
// const stat = util.promisify(fs.stat);
// console.log(stat);
// async function callStat() {
//   const stats = await stat('.');
//   console.log(`此目录被 ${stats.uid} 拥有`);
// }
// callStat();

/**
 * demo util.promisify 2
 */
// const readFilep = util.promisify(fs.readFile);

// async function readJsonp(jsonPath) {
//   const contents = await readFilep(jsonPath, { encoding: 'utf8' });
//   return JSON.parse(contents);
// }

// let packageJson;
// try {
//   packageJson = readJsonp('../promise/package.json');
// } catch (err) {}

// packageJson.then(res => {
//   console.log(res);
// });

/**
 * demo ncp package
 */
const ncpp = util.promisify(ncp);

async function installDefaultTemplate() {
  const cwd = process.cwd();
  const sourceDirName = path.join(__dirname, './template');
  const targetDirName = path.join(cwd, 'src');
  await ncpp(sourceDirName, targetDirName);
}
installDefaultTemplate();
