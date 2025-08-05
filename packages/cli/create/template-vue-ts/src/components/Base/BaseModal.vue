<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="close-button" @click="close"></button>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:show'],
  setup(_, { emit }) {
    const close = () => {
      emit('update:show', false);
    };

    return { close };
  }
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  border-radius: 8px;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  width: 50px;
  height: 50px;
  cursor: pointer;
  z-index: 9;
}
</style>