import { withInstall } from '@elong-ui/utils';
import { ElUpload, ElIcon } from 'element-plus';
import { UploadFilled } from '@element-plus/icons-vue';

import upload from './src/index';

export const NmUpload = withInstall({
  ...upload,
  __dependencies__: [ElUpload, ElIcon, UploadFilled]
});

export default NmUpload;

export type NmUpload = typeof NmUpload;
