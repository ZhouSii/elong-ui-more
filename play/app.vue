<template>
  <div h-full p-4>
    <h2>上传组件测试</h2>
    <div style="margin: 20px 0">
      <h3>Picture Card 模式测试</h3>
      <NmUpload
        v-model="fileList"
        :upload-config="uploadConfig"
        :limited="3"
        :multiple="true"
        :size="10"
        accept=".jpg,.png,.gif,.pdf,.doc,.docx"
      />
    </div>

    <div style="margin: 20px 0">
      <p>当前文件列表:</p>
      <pre>{{ JSON.stringify(fileList, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
import { ref } from 'vue';

const fileList = ref([]);

// 模拟上传配置
const uploadConfig = {
  action: 'https://jsonplaceholder.typicode.com/posts', // 使用一个测试接口
  headers: () => ({
    'Content-Type': 'multipart/form-data'
  })
};
</script>

<style scoped lang="scss"></style>
