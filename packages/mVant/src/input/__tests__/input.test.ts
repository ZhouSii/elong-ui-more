import { expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import EvInput from '../index';

test('EvInput placeholder', () => {
  const wrapper = mount(EvInput, {
    props: {
      placeholder: '12323232'
    }
  });

  expect(wrapper.html()).toMatchInlineSnapshot(
    '"<van-field modelvalue=\\"\\" placeholder=\\"12323232\\" label-width=\\"90\\" data-v-0ce8b691=\\"\\"></van-field>"'
  );
});

test('EvInput isInput slots', () => {
  const wrapper = mount(EvInput, {
    props: {
      isInput: false
    },
    slots: 'Custom Input'
  });

  expect(wrapper.text()).toMatchInlineSnapshot('""'); // 替换成你期望的默认内容
});

test('should render word limit correctly when modelValue is undefined', () => {
  const wrapper = mount(EvInput, {
    props: {
      modelValue: undefined,
      maxlength: 3,
      showWordLimit: true
    }
  });
  expect(wrapper.html()).toMatchInlineSnapshot(
    '"<van-field maxlength=\\"3\\" showwordlimit=\\"true\\" modelvalue=\\"\\" placeholder=\\"请输入\\" label-width=\\"90\\" data-v-0ce8b691=\\"\\"></van-field>"'
  );
});
