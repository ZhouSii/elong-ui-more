<template>
  <ElSelectV2
    v-model="models"
    :options="personLiableColumns"
    placeholder="请选择"
    filterable
    remote
    :multiple="multiple"
    :loading="loading"
    :remote-method="remoteMethod"
    :props="selectPersonProps"
    style="width: 100%"
    @change="handlePersonChange"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineEmits } from 'vue';
import { ElSelectV2 } from 'element-plus';

defineOptions({
  name: 'NmPerson'
});

/**
 * 人员数据接口
 */
interface PersonData {
  id: number | string;
  nameInfo?: string;
  simpleName?: string;
  [key: string]: any;
}

interface SelectPersonProps {
  label: string;
  value: string;
}

interface ChangeResult {
  value: any;
  valueStr: string;
}

const props = defineProps({
  modelValue: {
    type: [Object, Array, Number, String],
    default: () => ''
  },
  fetchPersonnel: {
    type: Function,
    required: true,
    default: () => []
  },
  data: {
    type: Object,
    default: () => ({})
  },
  defaultColumns: {
    type: Array as PropType<PersonData[]>,
    default: () => []
  },
  selectPersonProps: {
    type: Object as PropType<SelectPersonProps>,
    default: () => ({
      label: 'nameInfo',
      value: 'id'
    })
  },
  multiple: {
    type: Boolean,
    default: false
  }
});
console.log('🚀 ~ props.fetchPersonnel:获取人员的方法', props.fetchPersonnel);

// 是否正在加载
const loading = ref(false);

// 选项列表
const personLiableColumns = ref<PersonData[]>([]);
// 缓存已选择的选项
const cachedColumns = ref<PersonData[]>([]);

const emit = defineEmits(['update:modelValue', 'change']);

// 双向绑定值
const models = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});

// 初始化默认选项
onMounted(() => {
  if (props.defaultColumns?.length) {
    personLiableColumns.value = [...props.defaultColumns];
    cachedColumns.value = [...props.defaultColumns];
  }
});

// 防抖封装
const debounce = (fn: Function, delay: number) => {
  let timer: number | null = null;
  return function (this: any, ...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

// 远程搜索方法
const remoteMethod = debounce(async (query: string) => {
  if (!query) {
    personLiableColumns.value = [...cachedColumns.value];
    return;
  }

  try {
    loading.value = true;
    const { data } = await props.fetchPersonnel({ searchKey: query });
    // 合并并去重
    const uniqueColumns = data.filter(
      (item: PersonData) =>
        !cachedColumns.value.some(
          (cached) => String(cached.id) === String(item.id)
        )
    );
    personLiableColumns.value = [...cachedColumns.value, ...uniqueColumns];
  } catch (error) {
    console.error('人员搜索失败:', error);
  } finally {
    loading.value = false;
  }
}, 300);

// 选择人员时触发
const handlePersonChange = (val: number | number[]) => {
  // 修复isEmpty对数字的处理，改为检查val是否为undefined、null或空数组
  if (
    val === undefined ||
    val === null ||
    (Array.isArray(val) && val.length === 0)
  ) {
    cachedColumns.value = [];
    emitChangeEvent(val, '');
    return;
  }

  // 将选择的值转换为数组进行处理
  const valArray = Array.isArray(val) ? val : [val];

  // 更新已选中项缓存
  cachedColumns.value = valArray.map((itemId) => {
    // 使用严格比较避免类型转换问题
    const person = personLiableColumns.value.find(
      (p) => String(p.id) === String(itemId)
    );

    return {
      id: itemId,
      nameInfo: person?.nameInfo || '',
      simpleName: person?.simpleName || person?.nameInfo || ''
    };
  });

  // 构建显示用的字符串
  const valueStr = cachedColumns.value
    .map((item) => item.simpleName)
    .filter(Boolean)
    .join(';');

  // 触发change事件
  emitChangeEvent(val, valueStr);
};

// 触发change事件的辅助函数
const emitChangeEvent = (value: any, valueStr: string) => {
  const result: ChangeResult = { value, valueStr };
  emit('change', result);
};
</script>

<style scoped lang="scss"></style>
