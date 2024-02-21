<script setup lang="ts">
import { ref } from 'vue';
import { useMemesStore } from '@/store/memes';
import { copyToClipboard } from '@/utils/windowBOM';
const memesArray = useMemesStore().combinedData;
const LENTH = memesArray.length;

const currentMeme = ref(memesArray[Math.floor(Math.random() * LENTH)]);
const animatedImage = ref<HTMLElement>();
function changeMemes() {
    // 按钮旋转
    if (!animatedImage.value) return;
    animatedImage.value.style.animation = 'none';
    // 下一tick触发，保证重绘，能重新旋转按钮
    setTimeout(() => {
        if (!animatedImage.value) return;
        animatedImage.value.style.animation = 'turnaround 1s';
    }, 10);
    // 随机烂梗
    currentMeme.value = memesArray[Math.floor(Math.random() * LENTH)];
}
</script>
<template>
    <div class="hello">
        <div class="hello1">你好，玩小将</div>
        <div class="hello2">这是一个玩机器弹幕烂梗收集网站，尽情欣赏你们的烂梗吧。</div>
        <div class="random">
            <div class="r1">随机烂梗:</div>
            <div class="change" @click="changeMemes">换一换</div>
            <img src="@/assets/icon/random.png" alt="" @click="changeMemes" ref="animatedImage" />
        </div>
        <div class="random-memes" @click="copyToClipboard(currentMeme)">{{ currentMeme }}</div>
        <span>(点击烂梗以复制)</span>
    </div>
</template>
<style lang="scss">
// 这个css不能加scoped，不然js控制的动画应用不生效
.hello {
    width: 100%;
    padding: 20px 0;
    border: 6px solid #e0e0e0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 18px;
    .hello1 {
        font-size: 40px;
        font-weight: 800;
        color: red;
        margin-bottom: 20px;
    }
    .hello2 {
        margin: 10px;
    }
    .random {
        margin: 20px 10px 5px;
        display: flex;
        align-items: center;
        .r1 {
            margin-right: 60px;
            font-size: larger;
            font-weight: bold;
        }
        .change {
            color: #308bf2;
            cursor: pointer;
            &:hover ~ img {
                animation: turnaround 1s;
            }
        }
        img {
            margin: 5px;
            height: 20px;
            width: 20px;
            cursor: pointer;
            &:hover {
                animation: turnaround 1s;
            }
        }
        @keyframes turnaround {
            from {
                transform: rotate(0);
            }
            to {
                transform: rotate(360deg);
            }
        }
    }
    .random-memes {
        margin: 0 10px 5px;
        color: deepskyblue;
        &:hover {
            cursor: pointer;
            color: purple;
        }
    }
    span {
        color: gray;
    }
}
</style>
