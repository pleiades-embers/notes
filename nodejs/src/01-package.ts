import { PackageJson } from "@npm/types";
import * as fs from "fs";
import { promisify } from 'util';
import chalk = require('chalk');
const DEFAULT_PACKAGE_JSON: PackageJson = {
  name: "",
  version: "0.0.0",
  description: "",
  main: "build/src/index.js",
  types: "build/src/index.d.ts",
  files: ["build/src"],
  license: "MIT",
  keywords: [],
  scripts: { test: 'echo "Error: no test specified" && exit 1' },
};


interface Logger {
  log: (...args: Array<{}>) => void;
  error: (...args: Array<{}>) => void;
  dir: (obj: {}, options?: {}) => void;
}
interface Options {
  dryRun: boolean;
  gtsRootDir: string;
  targetRootDir: string;
  yes: boolean;
  no: boolean;
  logger: Logger;
  yarn?: boolean;
}
const readFilep = promisify(fs.readFile);
async function readJson(jsonPath: string) {
  const contents = await readFilep(jsonPath, { encoding: 'utf8' });
  return JSON.parse(contents);
}
async function query(
  message: string,
  question: string,
  defaultVal: boolean,
  options: Options
): Promise<boolean> {
  if (options.yes) {
    return true;
  } else if (options.no) {
    return false;
  }
}
async function init(options?:Options):Promise<boolean> {
  let generatedPackageJson=false
  let packageJson
  try{
    packageJson= await readJson('../package.json')
  }catch(err){
    console.log(err)
    if(err.code!=="ENOENT"){
      throw new Error(`Unable to open package.json file: ${err.message}`);
    }
    const generate=await query(
      `${chalk.bold('package.json')} does not exist.`,
      'Generate',
      true,
      options
    )
    console.log(generate)
    if (!generate) {
      options.logger.log('Please run from a directory with your package.json.');
      return false;
    } 
    packageJson = DEFAULT_PACKAGE_JSON;
    generatedPackageJson = true;
  }


  console.log(packageJson)
  return true
}

init()
