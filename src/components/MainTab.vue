<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { tabEle } from '@/data/tab';

const route = useRoute();
const router = useRouter();
function navigateTo(path: string): void {
    console.log('路由', path);
    router.push(path);
}
</script>
<template>
    <div class="tab">
        <div :class="`home ${'/' === route.path ? 'selected' : 'none'}`" @click="navigateTo('/')">首页</div>
        <div :class="`tab1 ${item.path === route.path ? 'selected' : 'none'}`" v-for="item in tabEle" :key="item.path" @click="navigateTo(item.path)">
            {{ item.text }}
        </div>
    </div>
</template>
<style lang="scss" scoped>
.tab {
    display: flex;
    padding-top: 15px;
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */

    & > div {
        white-space: nowrap;
        padding: 5px;
        margin-left: 10px;
        border-radius: 6px 6px 0 0;
    }
    & > div:hover {
        cursor: pointer;
    }
    .selected {
        background-color: #f7f7f7;
    }
    .none {
        background-color: #9c9c9c;
    }
}
</style>
