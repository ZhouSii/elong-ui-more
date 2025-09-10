import dayjs from 'dayjs/esm';

export const hooksFunc = function () {
  const day = dayjs;

  //function
  const sleepMixin = (time: number) => {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        resolve('');
      }, time);
    });
  };

  // 回到顶部
  const scrollTop = (el?: string | undefined | null, top = 0) => {
    setTimeout(() => {
      const elStr = el || '#elong-st-ele';
      const element = document.querySelector(elStr);
      element?.scrollTo({ top: top || 0, behavior: 'smooth' });
    }, 300);
  };
  return {
    day,
    sleepMixin,
    scrollTop
  };
};

const useCommon = hooksFunc();

export default useCommon;

export { useCommon };
