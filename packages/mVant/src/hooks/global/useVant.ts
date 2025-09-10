import {
  showToast,
  showLoadingToast,
  closeToast,
  showDialog,
  showConfirmDialog
} from 'vant';

import 'vant/es/toast/style';
import 'vant/es/dialog/style';

import { ToastType } from 'vant/es';
import { ObjTy } from '@elong-ui/utils';

const hooksFunc = function () {
  /*
   * 通知弹框
   * message：通知的内容
   * type：通知类型
   * duration：通知显示时长（ms）
   * */
  const vantToastMixin = (
    message: string,
    type?: ToastType,
    duration?: number
  ) => {
    type = type || 'text';
    showToast({
      type: type,
      message: message,
      duration: duration ?? 1500,
      forbidClick: true,
      overlay: false
    });
  };
  const vantToastNoneMixin = (msg: string) => {
    showToast(msg);
  };
  /*
   * loading加载框
   * */
  const vantLoadingMixin = (duration?: number) => {
    showLoadingToast({
      message: '加载中',
      forbidClick: true,
      loadingType: 'spinner',
      duration: duration || 0,
      overlay: true
    });
  };
  const vantCloseLoadingMixin = () => {
    closeToast();
  };

  /*
   *  确认弹框
   * title:提示的标题
   * message:提示的内容
   * return Promise
   * */
  const vantConfirmMixin = (options: ObjTy) => {
    return new Promise((resolve, reject) => {
      showConfirmDialog({
        title: options.title,
        message: options.message || '你确定要删除吗',
        confirmButtonColor: options.confirmButtonColor || '#2F74ED',
        confirmButtonText: options.confirmButtonText || '确定'
      })
        .then(() => {
          resolve('');
        })
        .catch(() => {
          reject();
        });
    });
  };
  /*
   * 确认弹框
   * title:提示的标题
   * message:提示的内容
   * return Promise
   * */
  const vantAlterMixin = (options: ObjTy) => {
    return new Promise((resolve, reject) => {
      showDialog({
        title: options.title || '确认框',
        message: options.message || '确认弹框'
      }).then(() => {
        resolve('');
      });
    });
  };
  return {
    vantToastMixin,
    vantToastNoneMixin,
    vantLoadingMixin,
    vantCloseLoadingMixin,
    vantConfirmMixin,
    vantAlterMixin
  };
};

const useVant = hooksFunc();

export default useVant;

export { useVant };
