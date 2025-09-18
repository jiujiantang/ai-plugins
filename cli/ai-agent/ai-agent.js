#!/usr/bin/env node
/**
 * ai-agent.js
 * 用法：
 * set OPENAI_API_KEY=xxx node ai-agent.js generate button "{\"label\":\"提交\",\"disabled\":false}"
 *
 * 环境变量：
 *   OPENAI_API_KEY   必填，OpenAI 的 Key
 *   OPENAI_BASE      选填，默认 https://api.openai.com/v1
 *   OPENAI_PROXY     选填，代理地址，支持 http:// 或 socks5://
 */

import fs from 'fs/promises';
import { execSync } from 'child_process';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { SocksProxyAgent } from 'socks-proxy-agent';

const API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_BASE = process.env.OPENAI_BASE || 'https://api.openai.com/v1';
const PROXY_URL = process.env.OPENAI_PROXY || 'http://127.0.0.1:7890';

if (!API_KEY) {
  console.error('❌ 请设置 OPENAI_API_KEY 环境变量');
  process.exit(1);
}

// 代理支持
let dispatcher = undefined;
if (PROXY_URL) {
  if (PROXY_URL.startsWith('http://') || PROXY_URL.startsWith('https://')) {
    dispatcher = new HttpsProxyAgent(PROXY_URL);
  } else if (PROXY_URL.startsWith('socks://') || PROXY_URL.startsWith('socks5://')) {
    dispatcher = new SocksProxyAgent(PROXY_URL);
  } else {
    console.warn(`⚠️ 未识别的代理协议: ${PROXY_URL}`);
  }
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

// 调用 OpenAI
async function callOpenAI(promptText) {
  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
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
    dispatcher // ✅ Node18+ 的 fetch 用 dispatcher 来挂代理
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenAI 返回错误: ${res.status} ${txt}`);
  }

  const j = await res.json();
  return j.choices?.[0]?.message?.content;
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
  const out = await callOpenAI(promptText);

  const outPath = `out/${promptName}.generated.js`;
  await fs.mkdir('out', { recursive: true });
  await fs.writeFile(outPath, out, 'utf8');
  console.log('✅ 已写入：', outPath);

  // 可选 ESLint 检查
  try {
    execSync(`npx eslint ${outPath} --max-warnings=0`, { stdio: 'inherit' });
    console.log('✅ eslint 通过');
  } catch {
    console.warn('⚠️ eslint 未通过或未安装');
  }
}

main().catch(err => {
  console.error('❌ 运行出错:', err);
  process.exit(1);
});