import { reactive } from 'vue';

type CollectCallback = (component: string, params: any) => any;

export const eventBus = reactive({
  collectResults: [] as object[],
  callbacks: new Map<string, CollectCallback>(),

  publishFilter(component: string, params: any) {
    this.resetResults();
    this.collectResults.push(params);
    this.callbacks.forEach((callback: CollectCallback, key) => {
      if(key !== component) {
        const collected = callback(component, params);
        if (collected !== undefined) {
          this.collectResults.push(collected);
        }
      }
    });

    this.triggerCollectEnd();
  },

  subscribeFilter(component: string, callback: CollectCallback) {
    this.callbacks.set(component, callback); // 自动覆盖旧回调
  },

  resetResults() {
    this.collectResults = [];
  },

  triggerCollectEnd() {
    // console.log('All parameter collections are complete.');
  },

  getCollectResults() {
    return Object.assign({}, ...this.collectResults);
  }
});