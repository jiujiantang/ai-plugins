#!/bin/bash
# git-proxy.sh
# 用法: ./git-proxy.sh on/off/status

# 代理配置 (你可以改成自己的代理地址)
PROXY_HTTP="http://127.0.0.1:7890"
PROXY_HTTPS="http://127.0.0.1:7890"

case "$1" in
  on)
    git config --global http.proxy $PROXY_HTTP
    git config --global https.proxy $PROXY_HTTPS
    echo "✅ Git 代理已开启 -> $PROXY_HTTP"
    ;;
  off)
    git config --global --unset http.proxy
    git config --global --unset https.proxy
    echo "❎ Git 代理已关闭"
    ;;
  status)
    echo "当前 Git 代理配置:"
    git config --global --get http.proxy || echo "http.proxy 未设置"
    git config --global --get https.proxy || echo "https.proxy 未设置"
    ;;
  *)
    echo "用法: $0 {on|off|status}"
    exit 1
    ;;
esac
