<script setup lang="ts">
import HtmlContentPlugin from "@/plugins/HtmlContentPlugin.vue";

const props = defineProps<{
  type: "html";
  content: string;
}>();

const emit = defineEmits(["close","cancel","ok"]);

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
  <div class="vue-popup-mask" @click.self="close">
    <div class="vue-popup-content" >
      <template v-if="type === 'html'">
        <HtmlContentPlugin :html="content" />
      </template>
      <button class="vue-popup-closeBtn" @click="close"></button>
      <button class="vue-popup-cancelBtn" @click="cancel"></button>
      <button class="vue-popup-okBtn" @click="ok"></button>
    </div>
  </div>
</template>

<style lang="less">
.vue-popup-mask {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.vue-popup-content {
  position: relative;
}
.vue-popup-closeBtn, .vue-popup-cancelBtn, .vue-popup-okBtn{
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  z-index: 9;
}
</style>
