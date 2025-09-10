import { ref, watch, computed, defineComponent, Teleport } from 'vue';
import {
  ElMessage,
  ElUpload,
  ElIcon,
  ElImage,
  ElImageViewer
} from 'element-plus';
import {
  UploadFilled,
  ZoomIn,
  Delete,
  Document
} from '@element-plus/icons-vue';
import type { UploadProps, UploadUserFile, UploadFile } from 'element-plus';

// 导入常量
import { UPLOAD_FILE_TYPES, FILE_PREVIEW_ICONS } from '../../../constants';

// 定义上传成功后的响应类型
interface UploadResponse {
  url?: string;
  data?: {
    url?: string;
    id?: string;
    fileId?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

import './index.scss';

export default defineComponent({
  name: 'NmUpload',
  emits: ['update:modelValue', 'upload-success', 'upload-error', 'file-remove'],
  props: {
    modelValue: {
      type: [Array, String, Object] as any,
      required: false,
      default: () => []
    },
    uploadConfig: {
      type: Object,
      required: false,
      default: () => ({ action: '', headers: () => {} })
    },
    limited: { type: Number, required: false, default: 0 }, // 限制上传文件数量，0表示不限制
    multiple: { type: Boolean, required: false, default: true }, // 是否支持多选
    size: { type: Number, required: false, default: 30 }, // 文件大小
    accept: { type: String, required: false, default: () => '' } // 上传文件的接受类型
  },

  setup(props, { slots, emit }) {
    const actions = computed(() => props.uploadConfig?.action || '');
    const headers = computed(() => props.uploadConfig?.headers || {});

    console.log('🚀 ~ props.accept:', props.accept);

    const fileList = ref<UploadUserFile[]>([]);

    const showImgPreview = ref(false); // 控制图片预览组件显示

    const previewUrl = ref(''); // 预览图片的URL

    // 上传文件相关的一些状态和方法
    const uploadId = ref(
      Math.random().toString(36).substr(2).toLocaleUpperCase()
    );

    // 获取文件名的工具函数
    const getFileName = (file: any): string => {
      try {
        // 优先使用 name 或 fileName 属性
        const fileName = file.name || file.fileName;
        if (fileName) {
          return decodeURIComponent(fileName);
        }

        // 从 URL 中提取文件名
        if (file.url) {
          const urlParts = file.url.split('/');
          return urlParts[urlParts.length - 1] || '';
        }

        // 从 publicUrl 中提取文件名
        if (file.publicUrl) {
          const urlParts = file.publicUrl.split('/');
          return urlParts[urlParts.length - 1] || '';
        }

        return '未知文件';
      } catch (error) {
        console.warn('解析文件名失败:', error);
        return '未知文件';
      }
    };

    // 监听 modelValue 变化并同步到 fileList
    watch(
      () => props.modelValue,
      (newValue: any) => {
        if (!newValue) {
          fileList.value = [];
          return;
        }

        // 统一处理为数组格式
        const urlList: any[] = Array.isArray(newValue)
          ? newValue
          : [{ url: newValue }];

        // 避免不必要的更新
        if (
          urlList.length === fileList.value.length &&
          urlList.every(
            (item: any, index: number) =>
              fileList.value[index]?.url === item.url
          )
        ) {
          return;
        }

        // 更新文件列表
        fileList.value = urlList.map((item: any, index: number) => ({
          ...(typeof item === 'object' ? item : { url: item }),
          name: getFileName(item),
          uid: item.uid || Date.now() + index, // 确保每个文件都有唯一标识
          status: 'success' as const
        }));
      },
      {
        immediate: true,
        deep: true
      }
    );

    // 上传成功后emit 事件
    const uploadSuccess = () => {
      const files = fileList.value.map((file) => {
        delete file?.raw;
        delete file?.response;
        return {
          ...file
        };
      });
      console.log('🚀 ~ uploadSuccess ~ files:', files);
      emit('update:modelValue', files);
    };

    // 处理从操作区域删除文件
    const handleDeleteFile = (file: UploadUserFile) => {
      console.log('🚀 ~ handleDeleteFile ~ file:', file);
      // 从 fileList 中移除对应的文件
      const targetIndex = fileList.value.findIndex(
        (item) =>
          item.uid === file.uid ||
          (item.name === file.name && item.size === file.size)
      );

      if (targetIndex !== -1) {
        fileList.value.splice(targetIndex, 1);
      }

      uploadSuccess();
    };

    const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
      console.log('🚀 ~ handleRemove ~ fileList.value:', fileList.value);
      uploadSuccess();
    };

    const getFileType = (fileName: string): string => {
      if (!fileName) return '';
      return (
        fileName?.substring(fileName.lastIndexOf('.'))?.toLowerCase() || ''
      );
    };

    const handleBeforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
      const fileSuffix: string = getFileType(rawFile.name); // 当前文件后缀名
      console.log('🚀 ~ handleBeforeUpload ~ fileSuffix:', fileSuffix);
      const acceptArr: string[] =
        props.accept && (props.accept as string).length
          ? (props.accept as string).split(',')
          : [];
      console.log('🚀 ~ handleBeforeUpload ~ acceptArr:', acceptArr);

      // 校验类型
      if (!acceptArr.includes(fileSuffix.toLocaleLowerCase())) {
        ElMessage.warning(
          `当前仅支持上传${props.accept}类型的文件,请联系管理员!!`
        );
        return false;
      }

      const isSize = rawFile.size / 1024 / 1024 < props.size;
      if (!isSize) {
        ElMessage({
          message: `上传图片大小不能超过 ${props.size}MB!`,
          type: 'error'
        });
      }
      return isSize;
    };

    // 上传限制
    const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
      ElMessage.warning(`当前限制上传 ${props.limited} 个文件, 已超出限制!`);
    };

    const handleSuccess: UploadProps['onSuccess'] = (
      response: UploadResponse,
      uploadFile: UploadFile
    ) => {
      // 找到 fileList 中对应的文件项
      const targetIndex = fileList.value.findIndex((file) => {
        // 通过 uid 或者文件名来匹配
        return (
          file.uid === uploadFile.uid ||
          (file.name === uploadFile.name && file.size === uploadFile.size)
        );
      });
      console.log('🚀 ~ handleSuccess ~ targetIndex:', targetIndex);

      // 更新对应文件的数据
      fileList.value[targetIndex] = {
        ...fileList.value[targetIndex],
        // 上传后的数据
        ...response.data
      };

      uploadSuccess();
    };

    const handleError: UploadProps['onError'] = (error, uploadFile) => {
      // 找到对应的文件并更新状态
      const targetIndex = fileList.value.findIndex(
        (file) =>
          file.uid === uploadFile.uid ||
          (file.name === uploadFile.name && file.size === uploadFile.size)
      );

      if (targetIndex !== -1) {
        fileList.value[targetIndex] = {
          ...fileList.value[targetIndex],
          status: 'fail'
        };
      }

      // 触发错误回调给父组件
      emit('upload-error', {
        error,
        file: uploadFile,
        fileList: fileList.value
      });

      // 显示错误提示
      ElMessage({
        message: `文件 ${uploadFile.name} 上传失败`,
        type: 'error'
      });
    };

    // 处理上传进度
    const handleProgress: UploadProps['onProgress'] = (evt, uploadFile) => {
      // 找到对应的文件并更新进度
      const targetIndex = fileList.value.findIndex(
        (file) =>
          file.uid === uploadFile.uid ||
          (file.name === uploadFile.name && file.size === uploadFile.size)
      );

      if (targetIndex !== -1) {
        fileList.value[targetIndex] = {
          ...fileList.value[targetIndex],
          percentage: evt.percent || 0,
          status: 'uploading'
        };
      }
    };

    const fileHandlers = {
      // 图片文件直接返回原始URL
      image: (file: UploadUserFile) => file.url || '',
      // 使用统一的文件图标配置
      ...FILE_PREVIEW_ICONS
    };

    const suffix = ref({
      image: UPLOAD_FILE_TYPES.IMAGE,
      xls: ['xls', 'xlsx'],
      doc: ['doc', 'docx'],
      pdf: ['pdf'],
      txt: ['txt'],
      zip: ['zip'],
      rar: ['rar']
    });

    /**
     * 文件类型处理方法，根据文件类型返回对应的处理 URL
     */
    const checkSuffix = (file: UploadUserFile) => {
      // 从文件名或URL中提取扩展名
      const fileName = file.name || file.url || '';
      const fileExtension = fileName.toLowerCase().split('.').pop() || '';

      // 遍历 suffix 配置，找到匹配的文件类型
      for (let handlerType in suffix.value) {
        if (suffix.value[handlerType].includes(fileExtension)) {
          console.log('🚀 ~ checkSuffix ~ 匹配的文件类型:', handlerType);

          // 返回对应的处理函数结果
          const handler = fileHandlers[handlerType];
          if (typeof handler === 'function') {
            return handler(file);
          } else {
            return handler;
          }
        }
      }
      return '';
    };

    // 渲染文件预览
    const renderFilePreview = (file: UploadUserFile) => {
      const filePreviewUrl = checkSuffix(file); // 改名避免冲突

      // 如果文件正在上传中，显示进度条
      if (file.status === 'uploading' && file.percentage !== undefined) {
        return (
          <div class="upload-progress-wrapper">
            {/* 显示上传进度 */}
            <div class="progress-content">
              <div class="progress-circle">
                <svg viewBox="0 0 120 120" class="progress-svg">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#e4e7ed"
                    stroke-width="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#409eff"
                    stroke-width="8"
                    stroke-linecap="round"
                    stroke-dasharray="314.16"
                    stroke-dashoffset={
                      314.16 - (314.16 * file.percentage) / 100
                    }
                    style={{
                      transition: 'stroke-dashoffset 0.3s ease',
                      transform: 'rotate(-90deg)',
                      transformOrigin: '60px 60px'
                    }}
                  />
                </svg>
                <div class="progress-text">{Math.round(file.percentage)}%</div>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div class="thumbnail flex">
          {/* 预览图片 */}
          {filePreviewUrl ? (
            <ElImage
              style="width:100%; height: 100%"
              src={filePreviewUrl}
              fit="contain"
              preview-src-list={[filePreviewUrl]}
            />
          ) : (
            <ElIcon class="file-icon" style="font-size: 32px; color: #909399;">
              <Document />
            </ElIcon>
          )}

          {/* 文件名 */}
          <div class="filename" title={file.name}>
            {file.name}
          </div>

          {/* 操作区域 */}
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              onClick={() => handlePreview(file)}
            >
              <ElIcon>
                <ZoomIn />
              </ElIcon>
            </span>
            <span
              class="el-upload-list__item-delete"
              onClick={() => handleDeleteFile(file)}
            >
              <ElIcon>
                <Delete />
              </ElIcon>
            </span>
          </span>
        </div>
      );
    };

    // 处理预览
    const handlePreview = (file: UploadUserFile) => {
      console.log('预览文件:', file);

      // 检查是否是图片文件
      const fileName = file.name || file.url || '';
      const fileExtension = fileName.toLowerCase().split('.').pop() || '';
      const isImage = (UPLOAD_FILE_TYPES.IMAGE as readonly string[]).includes(
        fileExtension
      );

      if (isImage && file.url) {
        previewUrl.value = file.url;
        showImgPreview.value = true;
      } else {
        ElMessage.warning('该文件类型不支持预览');
      }
    };

    return () => (
      <>
        <ElUpload
          ref="Uploader"
          class="nm-upload"
          v-model:file-list={fileList.value}
          list-type="picture-card"
          action={actions.value}
          headers={headers.value}
          name={uploadId.value}
          accept={props.accept}
          limit={props.limited}
          multiple={props.multiple}
          before-upload={handleBeforeUpload}
          onSuccess={handleSuccess}
          onError={handleError}
          onProgress={handleProgress}
          onRemove={handleRemove}
          onExceed={handleExceed}
          v-slots={{
            file: ({ file }: { file: UploadUserFile }) =>
              renderFilePreview(file)
          }}
        >
          <ElIcon>
            <UploadFilled />
          </ElIcon>
        </ElUpload>

        {/* 图片预览组件 - 移到ElUpload外部，使用条件渲染 */}
        {showImgPreview.value && previewUrl.value && (
          <Teleport to="body">
            <ElImageViewer
              visible={showImgPreview.value}
              urlList={[previewUrl.value]}
              onClose={() => {
                showImgPreview.value = false;
                previewUrl.value = ''; // 清空预览URL
              }}
            />
          </Teleport>
        )}
      </>
    );
  }
});
