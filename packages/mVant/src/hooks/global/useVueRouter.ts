// import router from '@/router';
// import { ObjTy } from '~/common';
// const hooksFunc = function () {
//   const route: any = router.currentRoute;

//   const getQueryParam = () => {
//     if (route.value.query.params) {
//       return JSON.parse(route.value.query.params);
//     }
//   };

//   const getLocationParam = (url?: string | null) => {
//     const location = url || window.location.href;
//     const search = location.substring(location.lastIndexOf('?') + 1);
//     const obj = {};
//     const reg = /([^?&=]+)=([^?&=]*)/g;
//     search.replace(reg, (rs: any, $1: string, $2: string) => {
//       const name = decodeURIComponent($1);
//       let val = decodeURIComponent($2);
//       val = String(val);
//       obj[name] = val;
//       return rs;
//     });
//     return obj;
//   };

//   // vue router
//   const routerPushMixin = (name: string, params?: ObjTy) => {
//     let data = {};
//     if (params) {
//       data = {
//         params: JSON.stringify(params)
//       };
//     } else {
//       data = {};
//     }
//     router.push({
//       name: name,
//       query: data
//     });
//   };

//   const routerReplaceMixin = (name: string, params?: ObjTy) => {
//     let data = {};
//     if (params) {
//       data = {
//         params: JSON.stringify(params)
//       };
//     } else {
//       data = {};
//     }
//     router.replace({
//       name: name,
//       query: data
//     });
//   };

//   const routerBackMixin = () => {
//     router.go(-1);
//   };

//   return {
//     routerPushMixin,
//     routerReplaceMixin,
//     routerBackMixin,
//     getQueryParam,
//     getLocationParam
//   };
// };

// const useVueRouter = hooksFunc();

// export { useVueRouter };
