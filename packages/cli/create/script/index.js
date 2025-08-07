var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import minimist from 'minimist'; // 获取参数
import chalk from 'chalk'; // 颜色
import prompts from 'prompts'; // 交互（text、select）
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
const argv = minimist(process.argv.slice(2), {
    alias: { h: 'help', t: 'template' }, // 设置参数的别名
    string: ['_']
});
// 帮助信息字符串，描述如何使用此命令行工具
const helpMessage = `
Usage: create [OPTION]... [DIRECTORY]

Create a new project in JavaScript or TypeScript.
With no arguments, start the CLI in interactive mode.

Options:
  -t, --template NAME        use a specific template

Available templates:
${chalk.green('vue-ts')}`;
// 格式化目标目录名，去掉空格并删除尾部的斜杠
function formatTargetDir(targetDir) {
    return targetDir === null || targetDir === void 0 ? void 0 : targetDir.trim().replace(/\/+$/g, '');
}
// 定义可用的框架列表
const FRAMEWORKS = [
    // Vue 框架及其变体
    {
        name: 'vue',
        display: 'Vue',
        color: chalk.yellow,
        variants: [
            { name: 'vue-ts', display: 'TypeScript', color: chalk.yellow },
        ],
    }
];
// 将框架的变体名称扁平化为一个数组
const TEMPLATES = FRAMEWORKS.map((f) => f.variants.map((v) => v.name)).flat();
const defaultTargetDir = 'vue-project'; // 默认创建的项目目录名
// 初始化函数，负责项目的创建
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const argTargetDir = formatTargetDir(argv._[0]); // 获取并格式化目标目录
        console.log(argv._[0]);
        const argTemplate = argv.template || argv.t; // 获取模板参数
        const help = argv.help;
        if (help) { // 如果请求了帮助信息，打印帮助信息并退出
            console.log(helpMessage);
            return;
        }
        let targetDir = argTargetDir || defaultTargetDir;
        // 声明存储 prompts 的结果
        let result;
        try {
            result = yield prompts([
                {
                    type: argTargetDir ? null : 'text', // 如果提供了目录参数，则跳过此问题
                    name: 'projectName',
                    message: chalk.reset('Project name:'),
                    initial: defaultTargetDir,
                    onState: (state) => {
                        targetDir = formatTargetDir(state.value) || defaultTargetDir; // 动态设置目标目录
                    }
                },
                {
                    type: argTemplate && TEMPLATES.includes(argTemplate) ? null : 'select', // 选择框架
                    name: 'framework',
                    message: chalk.reset('Select a framework:'),
                    initial: 0,
                    choices: FRAMEWORKS.map((framework) => ({
                        title: framework.color(framework.display),
                        value: framework,
                    })),
                },
                {
                    type: (framework) => framework && framework.variants ? 'select' : null, // 选择框架变体
                    name: 'variant',
                    message: chalk.reset('Select a variant:'),
                    choices: (framework) => framework.variants.map((variant) => ({
                        title: variant.color(variant.display),
                        value: variant.name,
                    })),
                },
            ], {
                onCancel: () => {
                    throw new Error(chalk.red('✖') + ' Operation cancelled'); // 捕获用户取消操作并抛出错误
                },
            });
        }
        catch (cancelled) {
            console.log(cancelled.message);
            return; // 出错时返回
        }
        const { variant, projectName } = result;
        const currentDir = process.cwd(); // 获取当前执行目录
        const dir = path.resolve(currentDir, './packages'); // 解析 `../../../` 的路径
        const root = path.join(dir, targetDir); // 计算项目创建的根路径
        let template = variant || argTemplate; // 如果变体或模板参数可用，优先选用
        console.log(`Scaffolding project in ${root}...`); // 控制台输出项目搭建信息
        // 计算并获取模板的路径
        const templateDir = path.resolve(fileURLToPath(import.meta.url), '../..', `template-${template}`);
        // 用于重命名特定文件
        const renameFiles = {
            _gitignore: '.gitignore',
        };
        const write = (file, content) => {
            var _a;
            const targetPath = path.join(root, (_a = renameFiles[file]) !== null && _a !== void 0 ? _a : file); // 目标路径可能需要重命名
            if (content) {
                fs.writeFileSync(targetPath, content); // 写入内容
            }
            else {
                copy(path.join(templateDir, file), targetPath); // 复制文件
            }
        };
        function copyDir(srcDir, destDir) {
            fs.mkdirSync(destDir, { recursive: true }); // 递归创建目录
            for (const file of fs.readdirSync(srcDir)) { // 遍历目录中的文件
                const srcFile = path.resolve(srcDir, file);
                const destFile = path.resolve(destDir, file);
                copy(srcFile, destFile); // 复制每一个文件
            }
        }
        function copy(src, dest) {
            const stat = fs.statSync(src);
            if (stat.isDirectory()) {
                copyDir(src, dest); // 如果是目录，使用 copyDir 复制
            }
            else {
                fs.copyFileSync(src, dest); // 如果是文件，直接复制
            }
        }
        if (!fs.existsSync(root)) { // 如果根目录不存在，创建它
            fs.mkdirSync(root, { recursive: true });
        }
        else {
            console.error("Project name already exists.");
            return false;
        }
        const files = fs.readdirSync(templateDir); // 读取模板目录下的文件
        for (const file of files) { // 迭代文件列表
            write(file); // 写入或复制文件
        }
        // 定义 package.json 文件的路径
        const packageJsonPath = path.join(root, 'package.json');
        // 读取 package.json 文件
        fs.readFile(packageJsonPath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading package.json:', err);
                return;
            }
            // 解析 JSON 数据
            const packageJson = JSON.parse(data);
            // 设置新的项目名称
            packageJson.name = targetDir;
            // 将更新后的 JSON 数据写回文件
            fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing package.json:', err);
                    return;
                }
                console.log('package.json updated successfully!');
            });
        });
        console.log(`Done. Now run:`); // 项目创建完毕后输出
        if (root !== process.cwd()) {
            console.log(`  cd ${root}`);
        }
        console.log(`  pnpm install`); // 提示用户安装依赖
        console.log(`  npm run dev`); // 提示用户运行开发服务器
        console.log();
    });
}
// 初始化异步函数并捕获潜在的错误
init().catch(e => {
    console.error(e);
});
