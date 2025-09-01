<script setup lang="ts">
import HtmlContentPlugin from "../plugins/HtmlContentPlugin.vue";
import ToastContentPlugin from "../plugins/ToastContentPlugin.vue";
import { PopupOptions } from "../types";

const props = defineProps<PopupOptions>();

const emit = defineEmits(["close","cancel","ok"]);

function handleMaskClick() {
  if(props.type === "toast") return;
  if (!props.showClose) {
    emit("close");
  }
}
const close = () => {
  emit("close");
};
const cancel = () => {
  emit("cancel");
};
const ok = () => {
  emit("ok");
};
</script>
<template>
  <div class="vue-popup-mask" :class="{vuePopupBg: type==='html'}" @click.self="handleMaskClick">
    <div class="vue-popup-content" >
      <template v-if="type === 'html'">
        <HtmlContentPlugin :html="content" />
        <button v-if="showClose" class="vue-popup-closeBtn" @click="close"></button>
        <button class="vue-popup-cancelBtn" @click="cancel"></button>
        <button class="vue-popup-okBtn" @click="ok"></button>
      </template>
      <template v-else-if="type === 'toast'">
        <ToastContentPlugin :text="content" />
      </template>
    </div>
  </div>
</template>

<style lang="less">
.vue-popup-mask {
  position: fixed;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.vuePopupBg {
  inset: 0;
  transform: none;
  background: rgba(0,0,0,0.5);
}
.vue-popup-content {
  position: relative;
}
.vue-popup-closeBtn{
  //border: none;
  padding: 5px;
  margin: 0;
  cursor: pointer;
  z-index: 9;
}
.vue-popup-cancelBtn, .vue-popup-okBtn{
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  z-index: 9;
}
</style>
