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
  <div class="popup-mask" @click.self="close">
    <div class="popup-content" >
      <template v-if="type === 'html'">
        <HtmlContentPlugin :html="content" />
      </template>
      <div class="opt">
        <button @click="cancel"></button>
        <button @click="ok"></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.popup-mask {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup-content {
  position: relative;
}
</style>
