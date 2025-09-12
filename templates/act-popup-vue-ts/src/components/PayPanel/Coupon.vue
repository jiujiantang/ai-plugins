<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import {CATEGORY_OPERATE_ATTR} from "@/buried/buried_config_all";
import {useWindowBridge} from "win-bridge";
import * as _ from "lodash";

interface Option {
  coupon_title: string;
  key: number;
}

const props = defineProps<{
  sideId: number;
  options: Option[];
  renderPayInfo: (couponId: number) => void;
}>();

const open = ref<Boolean>(false);
const dropdownRef = ref<HTMLElement | null>(null);
const couponId = ref<number>(0);
const {callExternalMethod} = useWindowBridge()
const ElementClick = (params: string) => {
  callExternalMethod("ElementUserBehavior", params)
};

// 计算当前选中项的标签
const selectedLabel = computed(() => {
  const current = props.options.find(o => o.key === couponId.value);
  return current?.coupon_title ?? '请选择';
});

// 切换下拉显示
const toggleDropdown = () => {
  open.value = !open.value;
};

// 选择某一项
const DebounceRenderPayInfo = _.debounce((key: number)=>{
  props.renderPayInfo(key);
},0)
const select = (item: Option) => {
  ElementClick(CATEGORY_OPERATE_ATTR[props.sideId]['change_coupon'])
  if(props.options.length === 1 && item.key === 0) return

  couponId.value=item.key;
  open.value = false;

  DebounceRenderPayInfo(item.key)
};

// 默认选中项
const defSelect = (value: number) => {
  couponId.value=value;
  open.value = false;
}

// 点击外部关闭菜单
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    open.value = false;
  }
};
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

defineExpose({
  defSelect
})
</script>

<template>
  <div class="dropdown" ref="dropdownRef">
    <!-- 选中项显示区域 -->
    <div class="dropdown-toggle" @click="toggleDropdown">
      <span class="ellipsis" v-ellipsis-title>{{ selectedLabel }}</span>
      <span class="arrow"></span>
    </div>

    <!-- 下拉列表 -->
    <ul v-if="open" class="dropdown-menu">
      <li
        v-for="item in options"
        :key="item.key"
        @click="select(item)"
        :class="{ selected: item.key === couponId }"
        v-ellipsis-title
      >
        {{ item.coupon_title }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.dropdown {
  position: relative;
  width: 185px;
  .dropdown-toggle {
    font-size: 14px;
    font-weight: 500;
    color: #999999;
    height: 37px;
    padding: 10px 20px 6px 10px;
    border-bottom: 1px dashed #ccc;
    text-align: left;
    position: relative;
    .arrow {
      display: inline-block;
      width: 10px;
      height: 6px;
      float: right;
      background: url("@{image-domain}/arrow.png") no-repeat center;
      position: absolute;
      right: 10px;
      top: 50%;
      margin-top: -3px;
      cursor: pointer;
    }
  }
  .dropdown-menu {
    position: absolute;
    z-index: 10;
    top: 100%;
    left: 0;
    right: 0;
    background: #fff;
    border: 1.5px solid #ccc;
    margin-top: 2px;
    list-style: none;
    border-radius: 4px;
    padding: 6.5px 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    li {
      width: 173px;
      height: 27px;
      line-height: 27px;
      border-radius: 4px;
      color: #999999;
      font-size: 14px;
      font-weight: normal;
      cursor: pointer !important;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        font-size: 12px;
        background: #F0F0F0;
      }
    }
    li.selected {
      //font-weight: bold;
    }
  }
}
</style>
