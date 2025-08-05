<script setup>
import Common from 'common'
import {reactive, ref} from "vue"
import axios from 'axios';

const {useUrl, useVersionUpdater} = Common

const {getLykstaticUrl} = useUrl()
useVersionUpdater("xxx", getLykstaticUrl("liuyunku/application/packages/spring_sale/public/version.json"))

const state = reactive({
  isVisible: false,
})
</script>

<template>
  <a>点击跳转工程文档 →</a>
</template>

<style scoped lang="less">
a{
  color: blue;
  cursor: pointer;
}
</style>
