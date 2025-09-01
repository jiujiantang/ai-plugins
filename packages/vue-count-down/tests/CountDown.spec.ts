import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import CountDown from '@/components/Countdown.vue';

/**
 * CountDown.vue 组件测试用例
 *
 * 测试覆盖点：
 *  1. 初始渲染时间是否正确
 *  2. 随着时间流逝倒计时是否正确递减
 *  3. 倒计时结束时是否触发 onFinish 回调
 *  4. 相同 keyName 的多个组件是否表现一致但互不干扰
 *  5. 卸载组件时是否清除定时器，避免内存泄漏
 */
describe('CountDown.vue', () => {
    // 每个测试用例前启用假的定时器（模拟 setInterval / setTimeout）
    beforeEach(() => {
        vi.useFakeTimers();
    });

    // 每个测试用例后恢复真实定时器，避免污染其他测试
    afterEach(() => {
        vi.useRealTimers();
    });

    it('should render initial time correctly', async () => {
        const wrapper = mount(CountDown, {
            props: { end: Date.now() + 3000, keyName: 'test1' }
        })
        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain('0,00,00,03')
    });

    it('should count down over time', async () => {
        const wrapper = mount(CountDown, {
            props: { end: Date.now() + 3000, keyName: 'test2' }
        });

        // 模拟过 1 秒
        vi.advanceTimersByTime(1000);
        await wrapper.vm.$nextTick();
        expect(wrapper.text()).toContain('0,00,00,02'); // 还剩 2 秒

        // 再过 2 秒
        vi.advanceTimersByTime(2000);
        await wrapper.vm.$nextTick();
        expect(wrapper.text()).toContain('0,00,00,00'); // 倒计时结束
    });

    it('should trigger onFinish when countdown ends', async () => {
        const onFinish = vi.fn();

        // 倒计时 1 秒，绑定 onFinish 事件
        mount(CountDown, {
            props: { end: Date.now() + 1000, keyName: 'finish-test', onFinish }
        });

        // 让定时器前进到结束
        vi.advanceTimersByTime(1000);
        await Promise.resolve(); // 等待事件循环执行回调

        expect(onFinish).toHaveBeenCalled(); // 回调被触发
    });

    it('two components with same key should behave consistently but independently', async () => {
        // 创建两个相同 keyName 的倒计时组件
        const wrapper1 = mount(CountDown, {
            props: { end: Date.now() + 2000, keyName: 'sync-key1' }
        });
        const wrapper2 = mount(CountDown, {
            props: { end: Date.now() + 2000, keyName: 'sync-key1' }
        });
        const wrapper3 = mount(CountDown, {
            props: { end: Date.now() + 2000, keyName: 'sync-key3' }
        });

        // 同步前进 1 秒
        vi.advanceTimersByTime(1000);
        await Promise.all([wrapper1.vm.$nextTick(), wrapper2.vm.$nextTick()]);

        // 两个组件的显示应当一致
        expect(wrapper1.text()).toContain('0,00,00,01');
        expect(wrapper2.text()).toContain('0,00,00,01');

        // 卸载第一个组件
        wrapper1.unmount();

        // 再过 1 秒
        vi.advanceTimersByTime(1000);
        await wrapper3.vm.$nextTick();

        // 第二个组件应当独立完成倒计时
        expect(wrapper3.text()).toContain('0,00,00,00');
    });

    it('should clear timer on unmount', () => {
        // 监听 clearInterval 是否被调用
        const clearIntervalSpy = vi.spyOn(global, 'clearInterval');

        const wrapper = mount(CountDown, {
            props: { end: Date.now() + 3000, keyName: 'clear-test' }
        });

        // 卸载组件
        wrapper.unmount();

        // 卸载时应清除定时器
        expect(clearIntervalSpy).toHaveBeenCalled();
    });
});
