<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { countdownManager } from '@/core/CountdownManager';
import { formatTime } from '@/plugins/formatPlugin';
import {CountdownCore} from "@/core/CountdownCore";

const props = defineProps({
  keyName: { type: String, required: true }, // 分组 key，必填
  end: { type: Number, required: true },     // 结束时间戳 ms
  autoStart: { type: Boolean, default: true },
  onFinish: { type: Function, default: null },
});

const formatted = ref('');
const left = ref(0);

let core:CountdownCore;
let unsubTick: (() => void) | null = null;
let unsubEnd: (() => void) | null = null;

function updateFormatted(ms: number | undefined) {
  if(ms && ms >= 0){
    formatted.value = formatTime(ms);
    left.value = ms;
  }
}

onMounted(() => {
  core = countdownManager.getCore(props.keyName);
  core.set(props.end);

  unsubTick = core.events.on('tick', updateFormatted);
  unsubEnd = core.events.on('end', ()=>{props.onFinish(props.keyName)});

  if (props.autoStart) core.start();

  watch(() => props.end, (newVal) => {
    core.set(newVal);
    if (!core.isRunning()) core.start();
  });
});

onBeforeUnmount(() => {
  unsubTick?.();
  unsubEnd?.();
  countdownManager.deleteCore(props.keyName);
});
</script>
<template>
  <slot :time="formatted" :left="left">
    {{ formatted }}
  </slot>
</template>