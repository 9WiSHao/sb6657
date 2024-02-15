<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { scrollToTop } from '@/utils/windowBOM';

const showBackToTop = ref(false);

function checkScroll() {
    showBackToTop.value = window.scrollY > 100;
}

onMounted(() => {
    window.addEventListener('scroll', checkScroll);
});
onUnmounted(() => {
    window.removeEventListener('scroll', checkScroll);
});
</script>
<template>
    <div class="back-to-top" v-if="showBackToTop" @click="scrollToTop">
        <div class="back">^</div>
        <div class="text">回顶部</div>
    </div>
</template>
<style>
.back-to-top {
    height: 40px;
    width: 40px;
    background-color: rgba(86, 86, 86, 0.6);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    position: fixed;
    right: 10px;
    bottom: 20px;
    &:hover {
        cursor: pointer;
    }

    .back {
        font-size: large;
        font-weight: bold;
        margin-bottom: -6px;
    }
    .text {
        font-size: x-small;
        font-weight: bold;
    }
}
</style>
