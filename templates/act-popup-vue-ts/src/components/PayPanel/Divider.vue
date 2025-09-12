<script setup lang="ts">

</script>

<template>
<div class="divideLine">
  <div class="line"></div>
  <svg t="1754632955497" class="arrow" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10761" width="200" height="200"><path d="M737.43529 48.189595L713.167148 21.494639 280.269733 498.421397a20.223451 20.223451 0 0 0-0.115563 26.579393l427.523756 478.775759 15.600948-13.520822 8.782756-12.943008L316.44082 511.884437 737.43529 48.189595z" fill="" p-id="10762"></path><path d="M756.965365 48.189595l-33.050897-36.402212-10.689538-11.787383L269.40685 488.714141q-20.685701 22.88139-0.115562 45.878343L706.233394 1024l27.850581-24.094797 16.178761-23.805891L335.855333 511.942219 756.965365 48.189595zM713.167148 42.989279L290.785927 508.128654q-3.235752 3.58244 0 7.222661L708.949114 983.553098l3.466878-3.004627 1.386751-2.022345L296.968525 511.826656 717.905214 48.189595l-4.680284-5.200316z" fill="" p-id="10763"></path></svg>
  <div class="line"></div>
</div>
</template>

<style scoped lang="less">
.divideLine {
  width: 1px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  .line {
    width: 100%;
    height: calc(50% - 6px);
    background: var(--border-payPanel);
  }
  .arrow {
    width: auto;
    height: 18px;
    fill: var(--border-payPanel);
    position: relative;
    left: -4px;
  }
}
</style>