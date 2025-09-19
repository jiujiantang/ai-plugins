#!/usr/bin/env node
/**
 * ai-agent.js
 * 用法：
 *  node ai-agent.js generate button "{\"label\":\"提交\"}"
 *
 * 环境变量：
 *   OPENAI_API_KEY   必填，OpenAI 的 Key
 *   API2D_KEY        选填，API2D 的 Key（自动回退时使用）
 *   OPENAI_BASE      选填，默认 https://api.openai.com/v1
 *   OPENAI_PROXY     选填，代理地址，支持 http:// 或 socks5://
 */

import fs from 'fs/promises';
import { execSync } from 'child_process';
import { ProxyAgent } from 'undici';

const API_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_BASE = process.env.OPENAI_BASE || 'https://api.openai.com/v1';
const API2D_KEY = 'fk234955-K8cb3LWQ0MJOnWZCV9G1c6epqInAS3Sh';
const API2D_BASE = 'https://openai.api2d.net/v1';
const PROXY_URL = process.env.OPENAI_PROXY;

if (!API_KEY && !API2D_KEY) {
  console.error('❌ 请设置 OPENAI_API_KEY 或 API2D_KEY 环境变量');
  process.exit(1);
}

// 代理支持
let dispatcher = undefined;
if (PROXY_URL) {
  dispatcher = new ProxyAgent(PROXY_URL);
}

const model = 'gpt-4o-mini'; // 可换成 gpt-4o / gpt-4.1-mini

// 读取 prompts 文件
async function loadPrompt(name) {
  return fs.readFile(`prompts/${name}.md`, 'utf8');
}

// 替换 {{var}}
function buildMessage(promptTemplate, variables) {
  let s = promptTemplate;
  for (const k of Object.keys(variables)) {
    s = s.replaceAll(`{{${k}}}`, String(variables[k]));
  }
  return s;
}

// 通用调用函数
async function requestAPI(base, key, promptText) {
  const res = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: '你是一个前端工程师，输出可运行的 Vue/React 组件代码。' },
        { role: 'user', content: promptText }
      ],
      temperature: 0,
      max_tokens: 2000
    }),
    dispatcher
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`${base} 返回错误: ${res.status} ${txt}`);
  }

  const j = await res.json();
  return j.choices?.[0]?.message?.content;
}

// 调用 OpenAI，失败则回退 API2D
async function callModel(promptText) {
  try {
    if (API_KEY) {
      console.log('🌐 正在调用 OpenAI...');
      return await requestAPI(OPENAI_BASE, API_KEY, promptText);
    } else {
      throw new Error('未设置 OPENAI_API_KEY');
    }
  } catch (err) {
    console.warn('⚠️ OpenAI 调用失败:', err.message);
    if (API2D_KEY) {
      console.log('🔄 切换到 API2D...');
      return await requestAPI(API2D_BASE, API2D_KEY, promptText);
    } else {
      throw new Error('没有可用的 API2D_KEY，无法回退');
    }
  }
}

// 主入口
async function main() {
  const [,, cmd, promptName, varsJson] = process.argv;
  if (cmd !== 'generate' || !promptName) {
    console.log('用法: node ai-agent.js generate <promptName> <jsonVars>');
    return;
  }

  const vars = varsJson ? JSON.parse(varsJson) : {};
  const template = await loadPrompt(promptName);
  const promptText = buildMessage(template, vars);

  console.log('调用模型...');
  const out = await callModel(promptText);

  const outPath = `out/${promptName}.generated.js`;
  await fs.mkdir('out', { recursive: true });
  await fs.writeFile(outPath, out, 'utf8');
  console.log('✅ 已写入：', outPath);

  // try {
  //   execSync(`npx eslint ${outPath} --max-warnings=0`, { stdio: 'inherit' });
  //   console.log('✅ eslint 通过');
  // } catch {
  //   console.warn('⚠️ eslint 未通过或未安装');
  // }
}

main().catch(err => {
  console.error('❌ 运行出错:', err);
  process.exit(1);
});