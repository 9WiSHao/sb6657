<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import fkEachother from '@/data/fk-eachother.json';
import fkPlayer from '@/data/fk-player.json';
import fkWjq from '@/data/fk-wjq.json';
import repeat from '@/data/repeat.json';
import showTime from '@/data/showtime.json';
import { copyToClipboard } from '@/utils/windowBOM';

const combinedData = [...fkEachother, ...fkPlayer, ...fkWjq, ...repeat, ...showTime];

const route = useRoute();
const searchQuery = computed(() => route.query.s);

const filteredData = computed(() => {
    if (typeof searchQuery.value !== 'string') return [];

    // 都转小写，实现不区分大小写搜索
    const query = searchQuery.value.toLowerCase();
    return combinedData.filter((item) => item.toLocaleLowerCase().includes(query));
});
</script>

<template>
    <div class="search">
        <div v-if="filteredData.length > 0">
            <div class="list">
                <div class="data" v-for="(item, index) in filteredData" :key="index">
                    <div class="index">{{ index + 1 }}</div>
                    <div class="text">{{ item }}</div>
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
