import useVant from '../../hooks/global/useVant';
import { isEmptyArray, isNull } from '@elong-ui/utils';

const SCOPE = 'ElUpload';

export type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail';

export interface UploadFile {
  name: string;
  percentage?: number;
  status: UploadStatus;
  size?: number;
  response?: unknown;
  uid: number;
  url?: string;
  raw?: UploadRawFile;
}

export type UploadUserFile = Omit<UploadFile, 'status' | 'uid'> &
  Partial<Pick<UploadFile, 'status' | 'uid'>>;

export type UploadFiles = UploadFile[];
export interface UploadRawFile extends File {
  uid: number;
}

export interface UploadProgressEvent extends ProgressEvent {
  percent: number;
}

export type UploadRequestHandler = (
  options: UploadRequestOptions
) => XMLHttpRequest | Promise<unknown>;

export interface UploadRequestOptions {
  action: string;
  method: string;
  data: Record<string, string | Blob | [string | Blob, string]>;
  filename: string;
  file: UploadRawFile;
  headers: Headers | Record<string, string | number | null | undefined>;
  onError: (evt: UploadAjaxError) => void;
  onProgress: (evt: UploadProgressEvent) => void;
  onSuccess: (response: any) => void;
  withCredentials: boolean;
}

export class UploadAjaxError extends Error {
  name = 'UploadAjaxError';
  status: number;
  method: string;
  url: string;

  constructor(message: string, status: number, method: string, url: string) {
    super(message);
    this.status = status;
    this.method = method;
    this.url = url;
  }
}

function getError(
  action: string,
  option: UploadRequestOptions,
  xhr: XMLHttpRequest
) {
  let msg: string;
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`;
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`;
  } else {
    msg = `fail to ${option.method} ${action} ${xhr.status}`;
  }

  return new UploadAjaxError(msg, xhr.status, option.method, action);
}

function getBody(xhr: XMLHttpRequest): XMLHttpRequestResponseType {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export function throwError(scope: string, m: string): never {
  throw new useVant.vantToastMixin(`[${scope}] ${m}`);
}

// export const ajaxUpload: UploadRequestHandler = (option) => {
export const ajaxUpload = (option) => {
  if (typeof XMLHttpRequest === 'undefined') {
    throwError(SCOPE, 'XMLHttpRequest is undefined');
  }

  const xhr = new XMLHttpRequest();
  const action = option.action;

  if (xhr.upload) {
    xhr.upload.addEventListener('progress', (evt) => {
      const progressEvt = evt as UploadProgressEvent;
      progressEvt.percent = evt.total > 0 ? (evt.loaded / evt.total) * 100 : 0;
      //   option.onProgress(progressEvt);
    });
  }

  const formData = new FormData();
  //   if (option.data) {
  //     for (const [key, value] of Object.entries(option.data)) {
  //       if (!isEmptyArray(value)) {
  //         formData.append(key, ...value);
  //       } else {
  //         formData.append(key, value);
  //       }
  //     }
  //   }
  formData.append(option.filename, option.file, option.file.name);

  xhr.addEventListener('error', () => {
    // option.onError(getError(action, option, xhr));
    console.log('上传失败:');
  });

  xhr.addEventListener('load', () => {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, option, xhr));
    }

    console.log('上传完成:');

    // option.onSuccess(getBody(xhr));
  });

  xhr.open(option.method, action, true);

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  const headers = option.headers || {};
  if (headers instanceof Headers) {
    headers.forEach((value, key) => xhr.setRequestHeader(key, value));
  } else {
    for (const [key, value] of Object.entries(headers)) {
      if (isNull(value)) {
        continue;
      }
      xhr.setRequestHeader(key, String(value));
    }
  }

  xhr.send(formData);
  return xhr;
};
