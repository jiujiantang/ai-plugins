<template>
  <div class="method-tester">
    <template v-if="zoomed">
      <button @click="toggleZoom">{{ zoomed ? 'Debugger' : 'Debugger' }}</button>
    </template>
    <template v-else>
      <h1>LYK Method Tester</h1>
      <input
        v-model="methodName"
        placeholder="如: window.external.CloseLykWindow"
      />
      <div>
        <h3>Parameters</h3>
        <div v-for="(param, index) in parameters" :key="index" class="parameter">
          <input
            v-model="parameters[index]"
            placeholder="Enter parameter"
          />
          <button @click="removeParameter(index)" style="margin-top: 0;">Remove</button>
        </div>
        <button @click="addParameter">添加参数</button>
      </div>
      <button @click="testMethod">测试方法</button>
      <button @click="toggleZoom">{{ zoomed ? 'Debugger放大' : 'Debugger缩小' }}</button>
      <div class="log-panel">
      </div>
    </template>
    <p>log:</p>
    <div id="log-panel"></div>
  </div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, ref} from 'vue';
import {useWindowBridge} from "../src";

const {debugPanel, logger, callExternalMethod, registerClientMethod} = useWindowBridge()
const methodName = ref('');
const parameters = ref([]);
const log = ref('');
const zoomed = ref(true)

onMounted(() => {
  nextTick(()=>{
    debugPanel("#log-panel")
    callExternalMethod("CloseLykWindow", 1,2,3)
    registerClientMethod("CloseLyk", (val)=>{
      console.log(val)
    })
  })
})

function testMethod() {
  const methodParts = methodName.value.split('.');
  let context = window;
  try{
    for (let part of methodParts) {
      if (context[part] !== undefined) {
        context = context[part];
      } else {
        log.value = `Method or path not found: ${part}`
        return
      }
    }
  }catch (e) {
    console.error(e)
  }
  if (typeof context  === 'function') {
    try {
      const result = context(...parameters.value);
      log.value = `Successfully executed: ${methodName.value}
Return: ${result}`;
    }catch (e){
      log.value = e
    }
  } else {
    log.value = `${methodName.value} is not a function`;
  }
}

function addParameter() {
  parameters.value.push('');
}

function removeParameter(index) {
  parameters.value.splice(index, 1);
}

function toggleZoom() {
  zoomed.value = !zoomed.value;
}
</script>

<style>
.method-tester {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: Arial, sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
}

input {
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  display: block;
  padding: 10px;
  margin-top: 5px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 120px;
}

button:hover {
  background-color: #0056b3;
}

.parameter {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  justify-content: center;
}

.log-panel {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  border-radius: 4px;
  color: black;
}

pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.zoomed {
  transform: scale(0.2);

}
</style>