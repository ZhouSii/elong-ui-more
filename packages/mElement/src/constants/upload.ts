// 上传相关常量

// 文件大小限制（MB）
export const UPLOAD_SIZE_LIMIT = {
  IMAGE: 5, // 图片文件 5MB
  DOCUMENT: 20, // 文档文件 20MB
  VIDEO: 100, // 视频文件 100MB
  DEFAULT: 10 // 默认 10MB
} as const;

// 支持的文件类型
export const UPLOAD_FILE_TYPES = {
  IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'],
  DOCUMENT: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'],
  ARCHIVE: ['zip', 'rar', '7z', 'tar', 'gz'],
  VIDEO: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'],
  AUDIO: ['mp3', 'wav', 'aac', 'flac', 'ogg']
} as const;

// 文件预览图标映射
export const FILE_PREVIEW_ICONS = {
  // Excel 文件
  xls: 'https://file.40017.cn/tuojianfilestoreage/2025-09-08/xls-f2b90312ac6749f3810f3146444569f2.png',
  xlsx: 'https://file.40017.cn/tuojianfilestoreage/2025-09-08/xls-f2b90312ac6749f3810f3146444569f2.png',
  // Word 文件
  doc: 'https://file.40017.cn/tuojianfilestoreage/2025-09-08/doc-7c3c3d2c6b9646ef9ff851689f360470.png',
  docx: 'https://file.40017.cn/tuojianfilestoreage/2025-09-08/doc-7c3c3d2c6b9646ef9ff851689f360470.png',
  // PDF 文件
  pdf: 'https://file.40017.cn/tuojianfilestoreage/2025-09-08/pdf-abe5ca6da4bf4b0b9d649932dcb0288e.png',
  // 文本文件
  txt: 'https://file.40017.cn/tuojianfilestoreage/2025-09-08/txt-cdc40ab45a8e45168b16464097740fb0.png',
  // 压缩包
  zip: 'https://file.40017.cn/tuojianfilestoreage/2025-09-08/zip-1fa5c8e402f441568b4960dff1af5173.png',
  rar: 'https://file.40017.cn/tuojianfilestoreage/2025-09-08/rar-a3bfe2a51edb46279ac927b8d2fa4452.png'
} as const;

// 上传状态
export const UPLOAD_STATUS = {
  READY: 'ready',
  UPLOADING: 'uploading',
  SUCCESS: 'success',
  FAIL: 'fail'
} as const;

// 类型导出
export type UploadSizeLimit = typeof UPLOAD_SIZE_LIMIT;
export type UploadFileTypes = typeof UPLOAD_FILE_TYPES;
export type FilePreviewIcons = typeof FILE_PREVIEW_ICONS;
export type UploadStatusType =
  (typeof UPLOAD_STATUS)[keyof typeof UPLOAD_STATUS];
