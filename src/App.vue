<script setup lang="ts">
import { ref } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import { tabEle } from '@/data/tab';
const route = useRoute();
const router = useRouter();
function navigateTo(path: string): void {
    console.log(path);
    router.push(path);
}
// 搜索相关
const searchWord = ref('');
function search() {
    if (searchWord.value == '') return;
    console.log('搜索词', searchWord.value);
    router.push({ path: '/search', query: { s: searchWord.value } });
}
</script>

<template>
    <div class="title">
        <img src="@/assets/img/boom.png" alt="超级大爆" />
    </div>
    <div class="panel">
        <div class="description">玩机器烂梗收集</div>
        <div class="search">
            <input type="text" placeholder="此处输入搜索wjq烂梗" v-model="searchWord" @keyup.enter="search" />
            <img src="@/assets/icon/search.png" alt="" @click="search" />
        </div>
    </div>
    <div class="main">
        <div class="tab">
            <div :class="`home ${'/' === route.path ? 'selected' : 'none'}`" @click="navigateTo('/')">首页</div>
            <div :class="`tab1 ${item.path === route.path ? 'selected' : 'none'}`" v-for="item in tabEle" :key="item.path" @click="navigateTo(item.path)">
                {{ item.text }}
            </div>
        </div>
        <div class="body">
            <RouterView />
        </div>
    </div>
</template>

<style scoped lang="scss">
* {
    padding: 0;
    margin: 0;
}
.title {
    top: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: start;
    // max-height: 250px;
    // overflow: hidden;

    img {
        height: auto;
        width: 60vw;
        max-width: 600px;
        object-fit: cover;
    }
}
.panel {
    width: calc(100vw - 64px);
    min-width: 460px;
    height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #e0e0e0;
    border-radius: 0 0 10px 10px;

    .search {
        height: 40px;
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 8px rgb(199, 199, 199);

        input {
            height: 40px;
            width: 180px;
            outline: none;
            border: none;
            background-color: transparent;
        }
        img {
            height: 20px;
        }
    }
}
.main {
    width: calc(100vw - 24px);
    min-width: 500px;
    margin-top: 20px;
    border-radius: 10px 10px 0 0;
    background-color: #e0e0e0;

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
    .body {
        background-color: #f7f7f7;
        padding-top: 20px;
    }
}
</style>
