import { defineStore } from 'pinia';
import { ref } from 'vue';
import { shuffleArray } from '@/utils/algorithm';

type JsonData = string[];
interface TabDataMap {
    [key: string]: JsonData;
}

export const useGengStore = defineStore('geng', () => {
    // 分类存放烂梗对象
    const tabDataMap = ref<TabDataMap>({});
    // 合并起来的烂梗数组
    const combinedData = ref<JsonData>([]);

    // vite导入data里存烂梗数组的json文件
    function initializeData() {
        // 同步导入形成文件类数组
        const dataFiles = import.meta.glob('/src/data/*.json', { eager: true });
        // dataFiles里面元素的第一项是文件路径，第二项是这个文件的内容
        Object.entries(dataFiles).forEach(([path, module]) => {
            // 文件名，和路由同名
            const name = path.split('/').pop()?.replace('.json', '') ?? '';
            // 文件内容，这里统一是一个放字符串的数组，里面是一条一条的烂梗
            const dataList = (module as { default: JsonData }).default;
            // 每次重新打开网页的时候，数据是重新排序的
            tabDataMap.value[`/${name}`] = shuffleArray([...dataList]);
            combinedData.value = [...combinedData.value, ...dataList];
        });
    }

    return { tabDataMap, combinedData, initializeData };
});
