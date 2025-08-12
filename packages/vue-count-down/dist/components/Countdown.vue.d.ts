declare function __VLS_template(): {
    default?(_: {
        time: string;
        left: number;
    }): any;
};
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    keyName: {
        type: StringConstructor;
        required: true;
    };
    end: {
        type: NumberConstructor;
        required: true;
    };
    autoStart: {
        type: BooleanConstructor;
        default: boolean;
    };
    onFinish: {
        type: FunctionConstructor;
        default: null;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    keyName: {
        type: StringConstructor;
        required: true;
    };
    end: {
        type: NumberConstructor;
        required: true;
    };
    autoStart: {
        type: BooleanConstructor;
        default: boolean;
    };
    onFinish: {
        type: FunctionConstructor;
        default: null;
    };
}>> & Readonly<{}>, {
    autoStart: boolean;
    onFinish: Function;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
