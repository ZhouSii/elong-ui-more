import { defineComponent, computed } from 'vue';
import { Icon, TextEllipsis } from 'vant';
import styles from './index.module.scss';

export default defineComponent({
  name: 'EvCeil',
  props: {
    label: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    row: {
      type: Number,
      default: 2
    },
    isLink: {
      type: Boolean,
      default: false
    },
    isColumn: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const columnStyles: any = computed(() => {
      if (props.isColumn) {
        return {
          'text-align': 'left',
          'margin-top': props.label ? '10px' : '0'
        };
      }

      return {
        'text-align': 'right',
        'margin-top': '0px'
      };
    });
    return () => (
      <>
        <div
          class={styles['m-ceil']}
          style={{ flexDirection: props.isColumn ? 'column' : 'row' }}
        >
          <span
            class={styles.label}
            style={{ 'white-space': props.isColumn ? 'normal' : 'nowrap' }}
          >
            {props.label}
            {slots.label ? slots.label() : null}
          </span>

          <span class={styles.content} style={{ ...columnStyles.value }}>
            {slots.default ? (
              slots.default()
            ) : (
              <TextEllipsis
                content={props.content}
                rows={props.row}
                expand-text="展开"
                collapse-text="收起"
              />
            )}
          </span>
          {props.isLink ? (
            <Icon name="arrow" class={styles['m-ceil-right-icon']} />
          ) : null}
        </div>
      </>
    );
  }
});
