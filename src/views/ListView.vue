<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import fkEachother from '@/data/fk-eachother.json';
import fkPlayer from '@/data/fk-player.json';
import fkWjq from '@/data/fk-wjq.json';
import repeat from '@/data/repeat.json';
import showTime from '@/data/showtime.json';
import { copyToClipboard } from '@/utils/copy';

interface TabDataMap {
    [key: string]: string[];
}
const tabDataMap: TabDataMap = {
    '/fk-wjq': fkWjq,
    '/fk-eachother': fkEachother,
    '/fk-player': fkPlayer,
    '/repeat': repeat,
    '/showtime': showTime
};
const route = useRoute();
const currentDataList = computed(() => tabDataMap[route.path]);
onBeforeRouteUpdate(() => {
    currentPage.value = 1;
});
// 分页相关内容
const currentPage = ref(1);
const itemsPerPage = ref(50);
// 当前页渲染的数据
const paginatedDataList = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return currentDataList.value.slice(start, end);
});
// 总页数
const totalPages = computed(() => Math.ceil(currentDataList.value.length / itemsPerPage.value));
// 翻页函数
const gotoPage = ref('');
function goToPage(page: number | string) {
    if (typeof page !== 'number' || page === currentPage.value) return;
    if (page < 0 || page > totalPages.value) {
        alert('请输入合理页码');
        return;
    }
    currentPage.value = page;
}
function nextPage() {
    if (currentPage.value < totalPages.value) currentPage.value++;
}
function prevPage() {
    if (currentPage.value > 1) currentPage.value--;
}
function usePagination(currentPage: Ref<number>, totalPages: Ref<number>) {
    return computed(() => {
        const wingSize = 2; // 当前页码两侧显示的页码数量
        let pages: (number | string)[] = [];

        pages.push(1); // 始终显示第一页

        let startPage = Math.max(2, currentPage.value - wingSize);
        let endPage = Math.min(totalPages.value - 1, currentPage.value + wingSize);

        // 如果当前页码靠近起始页
        if (startPage > 2) {
            pages.push('...');
        }

        // 生成中间页码
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // 如果当前页码靠近末尾页
        if (endPage < totalPages.value - 1) {
            pages.push('...');
        }

        pages.push(totalPages.value); // 始终显示最后一页

        return pages;
    });
}
const pagination = usePagination(currentPage, totalPages);
</script>
<template>
    <div class="list">
        <div class="data" v-for="(item, index) in paginatedDataList" :key="index">
            <div class="index">{{ index + (currentPage - 1) * itemsPerPage + 1 }}</div>
            <div class="text">{{ item }}</div>
            <div class="copy" @click="copyToClipboard(item)">复制</div>
        </div>
    </div>
    <div class="pagination" v-if="totalPages > 1">
        <div class="page-jump">
            <div @click="prevPage">&lt;</div>
            <template v-for="(page, index) in pagination" :key="index">
                <div v-if="page !== '...'" :class="{ active: page === currentPage }" @click="goToPage(page)">
                    {{ page }}
                </div>
                <span v-else>{{ page }}</span>
            </template>
            <div @click="nextPage">&gt;</div>
        </div>
        <div class="goto">
            <input type="text" v-model.number="gotoPage" placeholder="跳转到" @keyup.enter="goToPage(gotoPage)" />
            <div @click="goToPage(gotoPage)">跳转</div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
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
.pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    .page-jump {
        display: flex;
        div {
            height: 30px;
            width: 30px;
            margin-left: 6px;
            text-align: center;
            line-height: 30px;
            background-color: #f5f7fa;
            color: #808080;
            font-weight: bolder;
            &:hover {
                cursor: pointer;
                color: #c2c2c2;
            }
        }
        .active {
            background-color: #9c9c9c;
            color: #fff;
            &:hover {
                cursor: default;
                color: #fff;
            }
        }
    }
    .goto {
        display: flex;
        input {
            width: 42px;
            outline: none;
            border: none;
            background-color: transparent;
            border-bottom: #9c9c9c solid 1px;
        }
        div {
            height: 30px;
            padding: 0 6px;
            line-height: 30px;
            &:hover {
                cursor: pointer;
                color: #c2c2c2;
            }
        }
    }
}
</style>
