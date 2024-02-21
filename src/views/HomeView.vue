<script setup lang="ts">
import HomeHello from '@/components/HomeView/HomeHello.vue';
</script>
<template>
    <div class="home">
        <HomeHello></HomeHello>
        <div class="submission">
            <div class="top">
                <div class="line1"></div>
                <div class="top-title">投稿</div>
                <div class="line2"></div>
                <img src="@/assets/img/wjq.png" alt="" />
            </div>
            <div class="more"><a href="https://wj.qq.com/s2/14141336/3385/">想要补充更多烂梗？点击这里投稿！</a></div>
        </div>
        <div class="message">
            <div class="top">
                <div class="line1"></div>
                <div class="top-title">关于此网站</div>
                <div class="line2"></div>
                <img src="@/assets/img/github.png" alt="" />
            </div>
            <div class="more">
                <div class="github">此项目github<a href="https://github.com/9WiSHao/sb6657">源码地址</a>、<a href="https://github.com/AmorDL/fk6657.github.io">部署地址</a></div>
                <div class="author">网站制作：<a href="https://github.com/AmorDL">AmorDL</a> 、<a href="https://github.com/9WiSHao">9WiSHao</a></div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 0 20px;
}
a {
    color: #308bf2;
    text-decoration: none;
}

.submission,
.message {
    width: 100%;
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 18px;
    border: 1px solid #9c9c9c;

    .top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        .line1,
        .line2 {
            height: 20px;
            background: #e0e0e0;
        }
        .line1 {
            width: 5%;
        }
        .line2 {
            flex-grow: 1;
        }

        .top-title {
            font-size: x-large;
            font-weight: bold;
            margin: 0 5px;
        }
    }
}
.submission {
    .top {
        img {
            position: absolute;
            right: 20px;
            top: -20px;
        }
    }
    .more {
        margin-top: 40px;
        margin-bottom: 40px;
        font-size: large;
    }
}

.message {
    margin-bottom: 20px;
    .top {
        img {
            height: 60px;
            position: absolute;
            right: 16px;
            top: -10px;
        }
    }
    .more {
        display: flex;
        flex-direction: column;
        align-items: center;
        div {
            margin-top: 20px;
        }
        .author {
            margin-bottom: 20px;
        }
    }
}
</style>
