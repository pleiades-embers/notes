// 在node中，child_process这个模块非常重要。
// 掌握了它，等于在node的世界开启了一扇新的大门。
// 可以用它来完成很多有意思的事情，比如文件压缩、增量部署等
const cp = require("child_process");
const options = { yarn: true };
function getPkgManagerCommand(isYarnUsed) {
  return (
    (isYarnUsed ? "yarn" : "npm") + (process.platform === "win32" ? ".cmd" : "")
  );
}
// console.log(getPkgManagerCommand(options.yarn));
cp.spawnSync(
  getPkgManagerCommand(options.yarn),
  ["install", "--ignore-scripts"],
  {
    stdio: "inherit",
  }
);

/*
child_process.spawn(command[, args][, options])

command <string> 要运行的命令。

args <string[]> 字符串参数列表。

options <Object>
    cwd <string> | <URL> 子进程的当前工作目录。
    env <Object> 环境变量键值对。 默认值: process.env。
    argv0 <string> 显式设置发送给子进程的 argv[0] 的值。 如果未指定，这将设置为 command。
    stdio <Array> | <string> 子进程的标准输入输出配置（参见 options.stdio）。
    detached <boolean> 准备子进程独立于其父进程运行。 具体行为取决于平台，参见 options.detached。
    uid <number> 设置进程的用户标识（参见 setuid(2)）。
    gid <number> 设置进程的群组标识（参见 setgid(2)）。
    serialization <string> 指定用于在进程之间发送消息的序列化类型。 可能的值为 'json' 和 'advanced'。 有关更多详细信息，请参阅高级序列化。 默认值: 'json'。
    shell <boolean> | <string> 如果是 true，则在 shell 内运行 command。 在 Unix 上使用 '/bin/sh'，在 Windows 上使用 process.env.ComSpec。 可以将不同的 shell 指定为字符串。 请参阅 shell 的要求和默认的 Windows shell。 默认值: false （没有 shell）
    windowsVerbatimArguments <boolean> 在 Windows 上不为参数加上引号或转义。 在 Unix 上被忽略。 当指定了 shell 并且是 CMD 时，则自动设置为 true。 默认值: false。
    windowsHide <boolean> 隐藏通常在 Windows 系统上创建的子进程控制台窗口。 默认值: false。
    signal <AbortSignal> 允许使用中止信号中止子进程。
    timeout <number> 允许进程运行的最长时间（以毫秒为单位）。 默认值: undefined。
    killSignal <string> | <integer> 当衍生的进程将被超时或中止信号杀死时要使用的信号值。 默认值: 'SIGTERM'。

返回: <ChildProcess>
*/
//  --- 代码块  ---
const cp = require("child_process");
const ls = cp.spawn("ls", ["-lh", "/usr"]);

ls.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

ls.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});

//  声明stdio
var spawn = require("child_process").spawn;
spawn("ls", ["-al"], {
  stdio: "inherit",
});

// 声明shell
var spawn = require('child_process').spawn;
spawn('bash', ['-c', 'echo "hello nodejs" | wc'], {
    stdio: 'inherit',
    shell: true
});

// 例子4：错误处理，包含两种场景，这两种场景有不同的处理方式。

//     场景1：命令本身不存在，创建子进程报错。
//     场景2：命令存在，但运行过程报错。
var spawn = require('child_process').spawn;
var child = spawn('bad_command');

child.on('error', (err) => {
  console.log('Failed to start child process 1.');
});

var child2 = spawn('ls', ['nonexistFile']);

child2.stderr.on('data', function(data){
    console.log('Error msg from process 2: ' + data);
});

child2.on('error', (err) => {
  console.log('Failed to start child process 2.');
});


// echo "hello nodejs" | grep "nodejs"
var child_process = require('child_process');
var echo = child_process.spawn('echo', ['hello nodejs']);
var grep = child_process.spawn('grep', ['nodejs']);
grep.stdout.setEncoding('utf8');
echo.stdout.on('data', function(data){
    grep.stdin.write(data);
});
echo.on('close', function(code){
    if(code!==0){
        console.log('echo exists with code: ' + code);
    }
    grep.stdin.end();
});
grep.stdout.on('data', function(data){
    console.log('grep: ' + data);
});
grep.on('close', function(code){
    if(code!==0){
        console.log('grep exists with code: ' + code);
    }
});


