<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchWord = ref('');
function search() {
    if (searchWord.value == '') return;
    console.log('搜索词', searchWord.value);
    router.push({ path: '/search', query: { s: searchWord.value } });
}
</script>
<template>
    <div class="panel">
        <div class="description">玩机器烂梗收集</div>
        <div class="search">
            <input type="text" placeholder="此处输入搜索wjq烂梗" v-model="searchWord" @keydown.enter="search" />
            <img src="@/assets/icon/search.png" alt="" @click="search" />
        </div>
    </div>
</template>
<style lang="scss" scoped>
.panel {
    width: calc(100vw - 16px);
    min-width: 300px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #e0e0e0;
    border-radius: 0 0 10px 10px;

    .description {
        margin-left: 20px;
    }
    .search {
        height: 40px;
        width: 200px;
        margin-right: 20px;
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
@media (min-width: 768px) {
    .panel {
        width: calc(100vw - 30px);
    }
}
</style>
