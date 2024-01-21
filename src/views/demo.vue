<template>
    <div id="container" ref="threeRef"></div>
    <subscript :imgUrl="imgUrl" :repoLink="repoLink" @update="handleUpdate"></subscript>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import * as THREE from 'three'
import subscript from '@/components/subscript.vue'

export default defineComponent({
    name: "demo",
    components: {
        subscript
    },
    setup() {
        // 图片url
        const imgUrl = './src/assets/github-mark-white.svg'
        // 仓库链接
        const repoLink = "https://github.com/shiori2024/Three3dTemplate"
        const threeRef = ref()
        function init() {
            // 创建场景
            const scene = new THREE.Scene()
            // 创建相机
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
            // 创建渲染器
            const renderer = new THREE.WebGLRenderer()
            renderer.setClearColor(new THREE.Color('black'))
            renderer.setSize(window.innerWidth, window.innerHeight)
            // 创建几何体
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshBasicMaterial({ color: '#00ff00' })
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube)
            // 设置相机位置
            camera.position.z = 5;
            // 将渲染器添加到body中
            threeRef.value.appendChild(renderer.domElement)
            function animate() {
                requestAnimationFrame(animate);

                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;

                renderer.render(scene, camera);
            }

            animate()
        }
        const handleUpdate = () => {
            console.log("test")
        }
        onMounted(() => {
            console.log("模型开始渲染...")
            init()
        })
        return {
            imgUrl,
            repoLink,
            threeRef,
            handleUpdate
        }
    }
})
</script>

<style scoped>
#container {
    width: 100vw;
    height: 100vh;
    display: block;
    position: fixed;
}
</style>