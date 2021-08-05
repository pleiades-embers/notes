"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var DEFAULT_PACKAGE_JSON = {
    name: "",
    version: "0.0.0",
    description: "",
    main: "build/src/index.js",
    types: "build/src/index.d.ts",
    files: ["build/src"],
    license: "Apache-2.0",
    keywords: [],
    scripts: { test: 'echo "Error: no test specified" && exit 1' }
};
console.log(DEFAULT_PACKAGE_JSON);
// interface Options {
//   dryRun: boolean;
//   gtsRootDir: string;
//   targetRootDir: string;
//   yes: boolean;
//   no: boolean;
//   logger: Logger;
//   yarn?: boolean;
// }
console.log(fs_1["default"].readFile);
