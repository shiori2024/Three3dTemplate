<template>
    <div class="triangle-box" :class="status ? 'active' : ''">
        <div class="circle-image" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
            <a :href="repoLink" target="_blank">
                <img :src="imgUrl" alt="logo" ref="logo" />
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
// props 默认定义
const props = defineProps({
    imgUrl: {
        type: String,
        default: "./src/assets/github-mark-white.svg"
    },
    repoLink: {
        type: String,
        default: "https://github.com/shiori2024/Three3dTemplate"
    }
})
// ref 定义
const logo = ref()
const status = ref<boolean>(false)
// v-bind 绑定的src属性url，实现父组件传值动态变化url
const imgUrl = props.imgUrl
const repoLink = props.repoLink
/**
 *  鼠标悬停事件
 *  @method mouseEnter,mouseLeave
 *  鼠标进入改变 status 状态，使之 动态class颜色发生改变
 *  鼠标退出恢复 status 状态
 * */
const mouseEnter = () => {
    status.value = !status.value
    logo.value.src = "./src/assets/github-mark.svg"
}
const mouseLeave = () => {
    status.value = !status.value
    logo.value.src = "./src/assets/github-mark-white.svg"
}
// 自定义事件，通过emit将修改的数据传给父组件
// const emit = defineEmits({
//     "update": (status: boolean) => status
// })
</script>

<!-- <script lang="ts">
import { defineComponent, ref } from "vue"
export default defineComponent({
    name: "subscript",
    props: {
        imgUrl: String
    },
    setup() {
        const logo = ref()
        const status = ref(false)
        /**
         *  鼠标悬停事件
         *  @method mouseEnter,mouseLeave
         *  鼠标进入改变 status 状态，使之 动态class颜色发生改变
         *  鼠标退出恢复 status 状态
         * */
        const mouseEnter = () => {
            status.value = true
        }
        const mouseLeave = () => {
            status.value = false
        }
        return {
            logo,
            status,
            mouseEnter,
            mouseLeave
            // handlerLogo
        }
    }
})
</script> -->

<style scoped>
.triangle-box {
    text-align: center;
    position: absolute;
    /* 固定到右上角 */
    right: 0px;
    top: 0px;
    width: 0;
    height: 0;
    /* 左边透明，上右有色 */
    border-left: 100px solid transparent;
    border-top: 100px solid rgb(238, 238, 238, 0.6);
}

.active {
    border-top: 100px solid white;
    transition: 0.6ms ease-in-out;
}

.circle-image {
    position: relative;
    bottom: 90px;
    right: 50px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
}

.circle-image img {
    width: 100%;
    height: auto;
    border-radius: 50%;
}
</style>