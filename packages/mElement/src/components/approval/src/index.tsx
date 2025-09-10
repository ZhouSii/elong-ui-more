import { defineComponent, ref } from 'vue';
import { ElButton, ElEmpty, ElMessageBox } from 'element-plus';
import {
  View,
  ArrowLeft,
  Check,
  Warning,
  MoreFilled,
  Edit,
  BellFilled
} from '@element-plus/icons-vue';

import { OPERATE_TYPE } from '../../../constants';

// 导入hooks
import { useBoolean } from '@elong-ui/hooks';

// 导入审批上下文
import { setupApprovalContext } from './context';

import StreamCom from './components/StreamCom.vue';
import OperateCom from './components/OperateCom.vue';
import AddSignatureCom from './components/AddSignatureCom.vue';

import styles from './index.module.scss';

// 导入类型定义
import {
  nmApprovalProps,
  type NmApprovalEmits,
  type ApprovalFlowItem
} from './types';

export default defineComponent({
  name: 'NmApproval',
  props: nmApprovalProps,
  emits: ['onBack'] as (keyof NmApprovalEmits)[],
  setup(props, { slots, emit }) {
    // 设置审批上下文，传入所有审批相关的方法
    setupApprovalContext({
      taskItemId: props.taskItemId,
      fetchApprovalFlow: props.fetchApprovalFlow,
      fetchRefuseSelect: props.fetchRefuseSelect,
      fetchPersonnel: props.fetchPersonnel,
      approvalAgree: props.approvalAgree,
      approvalRefuse: props.approvalRefuse,
      approvalRevoke: props.approvalRevoke,
      approvalAddSign: props.approvalAddSign,
      uploadConfig: props.uploadConfig,
      onBack: props.onBack
    });

    // 使用 useBoolean hook 管理对话框状态
    const { bool: showStream, setBool: setStream } = useBoolean();
    const { bool: showOperate, setBool: setOperate } = useBoolean();
    const { bool: showAddSignature, setBool: setAddSignature } = useBoolean();

    // 当前操作类型
    const operateType = ref<OPERATE_TYPE>(OPERATE_TYPE.AGREE);

    // 审批流的数据
    const streamList = ref<ApprovalFlowItem[]>([]);
    // 回退操作选择的数据
    const revertList = ref<any[]>([]);

    // 返回操作
    const handleClick = () => {
      props.onBack?.(OPERATE_TYPE.BACK);
    };

    // 查看审批流
    const handleView = async () => {
      try {
        if (props.fetchApprovalFlow) {
          const { data } = await props.fetchApprovalFlow();
          streamList.value = data || [];
        }
        setStream(true);
      } catch (error) {
        console.error('获取审批流数据失败:', error);
      }
    };

    // 撤回操作
    const handleRevoke = () => {
      ElMessageBox.confirm('确认执行撤回操作吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            if (!props.approvalRevoke) {
              throw new Error('请传入撤回接口');
            }
            await props.approvalRevoke({ id: props.instanceId });
            props.onBack?.(OPERATE_TYPE.REVOKE);
          } catch (error) {
            console.error('撤回操作失败:', error);
          }
        })
        .catch(() => {
          // 用户取消操作，不需要处理
        });
    };

    // 重新编辑
    const handleReEdit = () => {
      props.onReEdit?.();
    };

    // 加签
    const handleAddSign = () => {
      setAddSignature(true);
    };

    // 回退
    const handleRevert = async () => {
      try {
        if (props.fetchRefuseSelect) {
          const { data } = await props.fetchRefuseSelect();
          revertList.value = data || [];
        }
        operateType.value = OPERATE_TYPE.REFUSE;
        setOperate(true);
      } catch (error) {
        console.error('获取回退节点数据失败:', error);
      }
    };

    // 同意
    const handleApprove = () => {
      operateType.value = OPERATE_TYPE.AGREE;
      setOperate(true);
    };

    // 加载默认插槽
    const renderMain = () => (
      <main class="flex-1 overflow-auto w-full">
        {slots.default ? (
          slots.default()
        ) : (
          <ElEmpty description="暂无主体内容" />
        )}
      </main>
    );

    // 默认展示按钮
    const renderDefaultButtons = () => (
      <>
        <ElButton class="mr-20px" icon={ArrowLeft} onClick={handleClick}>
          返回
        </ElButton>
        <ElButton icon={View} type="primary" onClick={handleView}>
          查看审批流程
        </ElButton>
      </>
    );

    // 撤回按钮
    const renderRevoke = () =>
      props.isRevoke && (
        <ElButton icon={Warning} type="warning" onClick={handleRevoke}>
          撤回
        </ElButton>
      );

    // 重新编辑按钮
    const renderReEdit = () =>
      props.isReEdit && (
        <ElButton icon={Edit} onClick={handleReEdit}>
          重新编辑
        </ElButton>
      );

    // 审批操作按钮
    const renderApprove = () =>
      props.isPending && (
        <>
          <ElButton icon={MoreFilled} onClick={handleAddSign}>
            加签
          </ElButton>
          <ElButton icon={BellFilled} type="danger" onClick={handleRevert}>
            回退
          </ElButton>
          <ElButton icon={Check} type="success" onClick={handleApprove}>
            同意
          </ElButton>
        </>
      );

    return () => (
      <>
        <div class="h-full w-full flex flex-col bg-white">
          {renderMain()}
          <footer
            class={`flex justify-center items-center bg-white p-10px w-full ${styles.footer}`}
          >
            {renderDefaultButtons()}
            {renderRevoke()}
            {renderReEdit()}
            {renderApprove()}
          </footer>
        </div>

        <StreamCom
          modelValue={showStream.value}
          onUpdate:modelValue={(value: boolean) => setStream(value)}
          list={streamList.value}
        />

        <OperateCom
          modelValue={showOperate.value}
          onUpdate:modelValue={(value: boolean) => setOperate(value)}
          revertList={revertList.value}
          type={operateType.value}
        />

        <AddSignatureCom
          modelValue={showAddSignature.value}
          onUpdate:modelValue={(value: boolean) => setAddSignature(value)}
        />
      </>
    );
  }
});
