<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { copyToClipboard } from '@/utils/windowBOM';
import { useMemesStore } from '@/store/memes';

const combinedData = useMemesStore().combinedData;
const route = useRoute();
const searchQuery = computed(() => route.query.s);

const filteredData = computed(() => {
    if (typeof searchQuery.value !== 'string') return [];
    // 都转小写，实现不区分大小写搜索
    const query = searchQuery.value.toLowerCase();
    // 搜索结果数组
    const result = combinedData.filter((item) => item.toLocaleLowerCase().includes(query));
    // 去重
    return [...new Set(result)];
});
// 转义特殊字符串正则
function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
// 高亮搜索关键字
const hightLightData = computed(() => {
    if (typeof searchQuery.value !== 'string') return [];
    const query = searchQuery.value.toLowerCase();
    // 以搜索词做正则匹配，不区分大小写
    const regex = new RegExp(escapeRegExp(query), 'gi');
    // 把之前搜索完成后的数组，加上高亮
    return filteredData.value.map((item) => item.replace(regex, (match) => `<span style="background-color: yellow">${match}</span>`));
});
</script>

<template>
    <div class="search">
        <div v-if="filteredData.length > 0">
            <div class="tip">搜索结果:</div>
            <div class="list">
                <div class="data" v-for="(item, index) in filteredData" :key="index">
                    <div class="index">{{ index + 1 }}</div>
                    <div class="text" v-html="hightLightData[index]"></div>
                    <div class="copy" @click="copyToClipboard(item)">复制</div>
                </div>
            </div>
        </div>
        <div class="cant" v-else>没有找到搜索结果。<a href="https://wj.qq.com/s2/14141336/3385/">想要补充更多烂梗？点击这里投稿！</a></div>
    </div>
</template>

<style scoped lang="scss">
a {
    color: #308bf2;
    text-decoration: none;
}
.tip {
    margin-left: 20px;
    font-size: 30px;
    color: rgb(71, 71, 71);
}
.list {
    width: 100%;
    .data {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 0;
        &:nth-child(even) {
            background-color: #e5e5e5;
        }
        .index {
            width: 60px;
            font-size: 30px;
            font-style: italic;
            color: gray;
            text-align: center;
            margin-right: 10px;
        }
        .text {
            overflow: hidden;
            word-wrap: break-word;
            word-break: normal;
            flex: 1;
        }
        .copy {
            height: 36px;
            width: 70px;
            border-radius: 20px;
            background-color: #e84444;
            color: #fff;
            font-size: 20px;
            font-weight: bolder;
            text-align: center;
            line-height: 36px;
            margin: 0 10px;
            &:hover {
                background-color: #c93535;
                cursor: pointer;
            }
        }
    }
}
.cant {
    margin: 20px;
    padding-bottom: 40px;
}
</style>
