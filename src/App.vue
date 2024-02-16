<script setup lang="ts">
import { RouterView } from 'vue-router';
import GoToTop from '@/components/GoToTop.vue';
import MainPanel from '@/components/MainPanel.vue';
import MainTab from '@/components/MainTab.vue';
import { onMounted } from 'vue';
import { useGengStore } from '@/store/geng';
// 初始化的时候加载数据
onMounted(() => useGengStore().initializeData());
</script>

<template>
    <div class="title">
        <img src="@/assets/img/boom.jpg" alt="超级大爆" />
    </div>
    <MainPanel></MainPanel>
    <div class="main">
        <MainTab></MainTab>
        <div class="body">
            <RouterView />
        </div>
    </div>
    <GoToTop></GoToTop>
</template>

<style scoped lang="scss">
* {
    padding: 0;
    margin: 0;
}
.title {
    width: calc(100vw - 16px);
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
.main {
    width: calc(100vw - 16px);
    min-width: 300px;
    margin-top: 20px;
    border-radius: 10px 10px 0 0;
    background-color: #e0e0e0;
    .body {
        background-color: #f7f7f7;
        padding-top: 20px;
    }
}

@media (min-width: 768px) {
    .title,
    .main {
        width: calc(100vw - 30px);
    }
}
</style>
