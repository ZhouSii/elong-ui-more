export declare const defaultProps: {
    modelValue: {
        type: any[];
        default: string;
    };
    customerType: {
        type: StringConstructor;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    keyWord: {
        type: StringConstructor;
        default: string;
    };
    labelWidth: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    columns: {
        type: any;
        default: never[];
    };
    shape: {
        type: any;
        default: string;
    };
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    rules: {
        type: ArrayConstructor;
        default: () => never[];
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    scoped: {
        type: StringConstructor;
        default: string;
    };
    attrs: {
        type: ObjectConstructor;
        default: () => {};
    };
};
