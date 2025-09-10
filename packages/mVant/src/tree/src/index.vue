<template>
  <div class="m-tree">
    <van-collapse ref="collapseRef" v-model="activeNames">
      <template v-for="item in treeData" :key="item.id">
        <template v-if="item[defaultProps.children]?.length">
          <van-collapse-item :name="item.id">
            <template #title>
              <span
                >{{ item[defaultProps.label] }}
                {{
                  item[defaultProps.children].length
                    ? '( ' + item[defaultProps.children].length + ' )'
                    : ''
                }}</span
              >
            </template>
            <ev-tree
              v-if="item[defaultProps.children]"
              ref="collapseChildRef"
              class="m-tree-child"
              :tree-data="item[defaultProps.children]"
              :auto-open="autoOpen"
              :default-props="defaultProps"
              @clickItem="emits('clickItem', $event)"
            ></ev-tree>
          </van-collapse-item>
        </template>
        <template v-else>
          <span class="collapse-title" @click.stop="clickItem(item)">{{
            item[defaultProps.label]
          }}</span>
        </template>
      </template>
    </van-collapse>
  </div>
</template>

<script setup lang="ts" name="EvTree">
import { isEmptyArray } from '@elong-ui/utils';
import { toRefs, ref, nextTick, watchEffect } from 'vue';

const props = defineProps({
  treeData: {
    type: Object,
    default: () => ({})
  },
  // 是否加载时展开全部
  autoOpen: {
    type: Boolean,
    default: false
  },
  defaultProps: {
    type: Object,
    default: () => {
      return {
        label: 'name',
        children: 'children'
      };
    }
  }
});

const { autoOpen, defaultProps, treeData } = toRefs(props);

const collapseRef = ref<any>();

const emits = defineEmits(['clickItem']);

const activeNames = ref([]);

const clickItem = (item) => {
  emits('clickItem', item); //事件依然采用emits向上触发事件
};

const openAll = () => {
  nextTick(() => {
    collapseRef.value?.toggleAll(true);
  });
};

const toggleAll = (status: boolean) => {
  collapseRef.value?.toggleAll(status);
};

watchEffect(() => {
  if (!isEmptyArray(props.treeData) && props.autoOpen) {
    openAll();
  }
});

defineExpose({ toggleAll });
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.m-tree {
  background: #fff;
}
.collapse-title {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
  overflow: hidden;
  color: var(--van-cell-text-color);
  font-size: var(--van-cell-font-size);
  line-height: var(--van-cell-line-height);
  background: var(--van-cell-background);

  &::after {
    position: absolute;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    top: 0;
    right: var(--van-padding-md);
    left: var(--van-padding-md);
    border-top: 1px solid var(--van-border-color);
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}

.m-tree-child {
  .collapse-title:first-child::after {
    display: none;
  }
  .van-hairline--top-bottom:after,
  .van-hairline-unset--top-bottom:after {
    border-width: 0;
  }
}

:deep(.van-collapse-item__content) {
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0;
}
</style>
