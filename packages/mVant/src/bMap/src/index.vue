<template>
  <div id="bMap"></div>
</template>

<script setup lang="ts" name="EvBMap">
import { isEmptyArray, isEmptyObject } from '@elong-ui/utils';
import { reactive, ref } from 'vue';
import { ObjTy } from '@elong-ui/utils';
import useVant from '../../hooks/global/useVant';

declare const window: Window & { BMAP_STATUS_SUCCESS: any };

const BMapGL = (window as any).BMapGL;
// 地图实例
const map = ref();
// 经纬度
let point = reactive({});
// 搜索
// const localSearch: any = ref(null);
/**
 * 初始化地图实例，添加地图点击事件
 * @param {object} pointObj 经纬度
 * @param {boolean} scrollWheelZoom 是否需要滚轮缩放
 * @return {void}
 */
const createdMap = (pointObj: any, scrollWheelZoom = true): void => {
  map.value = new BMapGL.Map('bMap');
  point = new BMapGL.Point(pointObj.lng, pointObj.lat);
  // 缩放倍数其实也可以通过参数传进来
  map.value.centerAndZoom(point, 15);
  // 鼠标滚轮是否可以缩放
  if (scrollWheelZoom) {
    map.value.enableScrollWheelZoom(true);
  }
  // 点击地图
  map.value.addEventListener('click', function (e: any) {
    emit('clickMap', e);
  });
};

/**
 * 坐标常量说明：
 * COORDINATES_WGS84 = 1, WGS84坐标
 * COORDINATES_WGS84_MC = 2, WGS84的平面墨卡托坐标
 * COORDINATES_GCJ02 = 3，GCJ02坐标
 * COORDINATES_GCJ02_MC = 4, GCJ02的平面墨卡托坐标
 * COORDINATES_BD09 = 5, 百度bd09经纬度坐标
 * COORDINATES_BD09_MC = 6，百度bd09墨卡托坐标
 * COORDINATES_MAPBAR = 7，mapbar地图坐标
 * COORDINATES_51 = 8，51地图坐标
 */
const translatePoint = ({ x, y }, translateCallback): void => {
  const ggPoint = new BMapGL.Point(x, y);
  const convertor = new BMapGL.Convertor();
  const pointArr = [] as any;
  pointArr.push(ggPoint);
  convertor.translate(pointArr, 1, 5, translateCallback);
};

/**
 * 添加标注（此处也应该把经纬度作为参数传递进来比较好）
 * @return {void}
 */
const createdMarker = (pointObj: ObjTy): void => {
  let pio: {};
  if (!isEmptyObject(pointObj)) {
    pio = new BMapGL.Point(pointObj.lng, pointObj.lat);
  } else {
    pio = point;
  }

  const marker = new BMapGL.Marker(pio);
  map.value.addOverlay(marker);
  map.value.setCenter(pio);
};

const clearMarkers = () => {
  map.value.clearOverlays();
};

/**
 *获取坐标的地址描述
 * @param {object} point  经纬度
 * @return {Promise}
 */
const getLocation = (point: ObjTy): Promise<unknown> => {
  return new Promise((res, reg) => {
    const pointObj = new BMapGL.Point(point.lng, point.lat);
    const myGeo = new BMapGL.Geocoder();
    myGeo.getLocation(pointObj, function (result: ObjTy) {
      if (result) {
        res(result);
      } else {
        reg('...');
      }
    });
  });
};

/**
 *获取坐标的地址描述
 * @param {object} point  经纬度
 * @return {Promise}
 */
const getLocationSearch = (search: string) => {
  return new Promise((res, reg) => {
    const localSearch = new BMapGL.LocalSearch(map.value, {
      // renderOptions: { map: map.value },
      onSearchComplete: (results) => {
        useVant.vantCloseLoadingMixin();

        if (localSearch.getStatus() === window.BMAP_STATUS_SUCCESS) {
          if (!isEmptyArray(results._pois)) {
            res(results._pois);
          } else {
            reg('未查找到相关数据，请输入包含省市区的地址！');
          }
          //搜索成功时的处理
        } else {
          reg('未查找到相关数据，请输入包含省市区的地址！');
        }
      }
    });
    useVant.vantLoadingMixin();

    localSearch.search(search);
  });
};
/**
 *获取经纬度
 * @param {string} place 地点
 * @return {Promise}
 */
const getPoint = (place: string): Promise<unknown> => {
  return new Promise((res, reg) => {
    const myGeo = new BMapGL.Geocoder();
    myGeo.getPoint(place, function (point: any) {
      if (point) {
        res(point);
      } else {
        reg('找不到');
      }
    });
  });
};

//
const emit = defineEmits(['clickMap']);
defineExpose({
  createdMap,
  createdMarker,
  getLocation,
  getLocationSearch,
  getPoint,
  clearMarkers,
  translatePoint
});
</script>

<style scoped lang="scss">
#bMap {
  width: 100%;
  height: 100%;
}

:deep(.BMap_cpyCtrl),
:deep(.anchorBL) {
  display: none !important;
}
</style>
