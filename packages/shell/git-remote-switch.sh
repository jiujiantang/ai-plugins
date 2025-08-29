#!/bin/bash
# git-remote-switch.sh
# 用法: ./git-remote-switch.sh
# 自动检测并切换 GitHub 远程地址 (SSH <-> HTTPS)

# 获取当前仓库 remote 地址
current_url=$(git remote get-url origin)

# 解析用户名/仓库名
repo_path=$(echo "$current_url" | sed -E 's#(git@github.com:|https://github.com/)##' | sed 's/.git$//')

echo "当前远程地址: $current_url"

# 判断当前是 SSH 还是 HTTPS
if [[ "$current_url" == git@github.com:* ]]; then
    echo "🔄 检测到 SSH，切换为 HTTPS..."
    new_url="https://github.com/${repo_path}.git"
    git remote set-url origin "$new_url"
    echo "✅ 已切换为 HTTPS: $new_url"
elif [[ "$current_url" == https://github.com/* ]]; then
    echo "🔄 检测到 HTTPS，切换为 SSH..."
    new_url="git@github.com:${repo_path}.git"
    git remote set-url origin "$new_url"
    echo "✅ 已切换为 SSH: $new_url"
else
    echo "⚠️ 无法识别远程地址: $current_url"
    exit 1
fi

# 测试连接
echo "测试连接..."
git ls-remote origin &> /dev/null
if [[ $? -eq 0 ]]; then
    echo "🚀 连接成功，可以使用 git push 了"
else
    echo "❌ 连接失败，可能需要配置代理或 SSH 设置"
fi