<template>
  <ev-title label="Elong-Vant" />
  <van-tabs v-model:active="active">
    <van-tab title="基础组件">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="EvInput" name="EvInput">
          <EvInput maxlength="3" label="elong-vant" placeholder="xxxxxx" />
          <EvInput label="elong-vant" />
          <EvInput required label="elong-vant-slot"> 需要展示slot </EvInput>
        </van-collapse-item>
        <van-collapse-item title="EvSelect" name="EvSelect">
          <EvSelect
            v-model="testForm.select"
            label="evSelect"
            :columns="columns"
            required
          />
        </van-collapse-item>
        <van-collapse-item title="EvRadio" name="EvRadio">
          <EvRadio
            v-model="testForm.radio"
            label="EvRadio"
            :columns="columns"
            required
          />
        </van-collapse-item>
        <van-collapse-item title="EvSwitch" name="EvSwitch">
          <EvSwitch
            v-model="testForm.switch"
            label="EvSwitch"
            :columns="columns"
            required
          />
        </van-collapse-item>
        <van-collapse-item title="EvCheck" name="EvCheck">
          <EvCheck
            v-model="testForm.check"
            label="EvCheck"
            :columns="columns"
            required
          />
        </van-collapse-item>
        <van-collapse-item title="EvCheckPicker" name="EvCheckPicker">
          <EvCheckPicker
            v-model="testForm.check"
            label="EvCheckPicker"
            :columns="columns"
            required
          />
        </van-collapse-item>
        <van-collapse-item title="EvDate" name="EvDate">
          <EvDate v-model="testForm.date" label="EvDate" />
        </van-collapse-item>
        <van-collapse-item title="EvCalendar" name="EvCalendar">
          <EvCalendar
            v-model="testForm.date"
            label="EvCalendar"
            :attrs="{ minDate: new Date() }"
          />
        </van-collapse-item>
        <van-collapse-item title="EvDatePickerGroup" name="EvDatePickerGroup">
          <EvDatePickerGroup
            v-model="testForm.datePickerGroup"
            label="EvDatePickerGroup"
          />
        </van-collapse-item>
        <van-collapse-item title="EvUpload" name="EvUpload">
          <EvUpload v-model="testForm.upload" label="EvUpload" />
        </van-collapse-item>
        <van-collapse-item title="EvTree" name="EvTree">
          <EvTree ref="treeRefs" :tree-data="items" :auto-open="true" />
        </van-collapse-item>
      </van-collapse>
    </van-tab>
    <van-tab title="功能组件">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="EvTitle" name="EvTitle">
          <ev-title label="EvTitle" :is-tips="true" tips-color="#000">
          </ev-title>
        </van-collapse-item>
        <van-collapse-item title="EvCeil" name="EvCeil">
          <ev-ceil label="EvCeil" content="EvCeil" is-link />
          <ev-ceil label="EvCeil" content="EvCeil" />
          <ev-ceil label="EvCeil  default solot" content="EvCeil">
            <span>EvCeil default solot</span>
          </ev-ceil>
          <ev-ceil label="" content="EvCeilSlot">
            <template #label>
              <span>EvCeil12321321</span>
            </template>
          </ev-ceil>
        </van-collapse-item>
        <van-collapse-item title="EvBMap" name="EvTitle">
          <ev-title label="EvTitle" :is-tips="true" tips-color="#000">
          </ev-title>
        </van-collapse-item>
        <van-collapse-item title="EvEcharts" name="EvTitle">
          <ev-title label="EvTitle" :is-tips="true" tips-color="#000">
          </ev-title>
        </van-collapse-item>
      </van-collapse>
    </van-tab>
    <van-tab title="业务组件">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="EvHotel" name="EvTitle">
          <ev-title label="EvTitle" :is-tips="true" tips-color="#000">
          </ev-title>
        </van-collapse-item>
        <van-collapse-item title="EvList" name="EvCeil">
          <ev-ceil label="EvCeil" content="EvCeil" is-link />
          <ev-ceil label="EvCeil" content="EvCeil" />
          <ev-ceil label="EvCeil  default solot" content="EvCeil">
            <span>EvCeil default solot</span>
          </ev-ceil>
          <ev-ceil label="" content="EvCeilSlot">
            <template #label>
              <span>EvCeil12321321</span>
            </template>
          </ev-ceil>
        </van-collapse-item>
        <van-collapse-item title="EvPerson" name="EvTitle">
          <ev-title label="EvTitle" :is-tips="true" tips-color="#000">
          </ev-title>
        </van-collapse-item>
        <van-collapse-item title="EvPage" name="EvTitle">
          <ev-title label="EvTitle" :is-tips="true" tips-color="#000">
          </ev-title>
        </van-collapse-item>
      </van-collapse>
    </van-tab>
  </van-tabs>
</template>

<script setup lang="ts">
import { useCommon } from '@elong-ui/vant/src/hooks';

console.log('useCommon:', useCommon.day().format());
const active = ref(0);
const activeNames = ref([] as any);
// 加签方式
const columns = ref([
  { value: '1', text: '在我之前' },
  { value: '2', text: '在我之后' }
]);

const testForm = ref({
  upload: [],
  select: '2',
  radio: '1',
  switch: true,
  check: '1,2',
  date: '',
  datePickerGroup: ''
});

const items = [
  {
    name: '浙江',
    children: [
      { name: '杭州', id: 1 },
      { name: '温州', id: 2 },
      { name: '宁波', id: 3, disabled: true }
    ]
  },
  {
    name: '江苏',
    children: [
      { name: '南京', id: 4 },
      { name: '无锡', id: 5 },
      { name: '徐州', id: 6 }
    ]
  },
  { name: '福建', disabled: true }
];
</script>
