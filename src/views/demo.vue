<template>
    <div id="container" ref="threeRef"></div>
    <subscript :imgUrl="imgUrl" :repoLink="repoLink" @update="handleUpdate"></subscript>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import * as THREE from 'three'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
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
            // 是否显示线框
            material.wireframe = false
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube)
            // cube.position.set(2,1,0)
            // 设置相机位置
            camera.position.x = 1;
            camera.position.y = 0.5;
            camera.position.z = 5;
            // 是否开启辅助坐标系
            const axesHelper = new THREE.AxesHelper(5)
            axesHelper.visible = true
            scene.add(axesHelper)
            // 将渲染器添加到body中
            threeRef.value.appendChild(renderer.domElement)
            function animate() {
                requestAnimationFrame(animate);

                // cube.rotation.x += 0.01;
                // cube.rotation.y += 0.01;

                renderer.render(scene, camera);
            }

            animate()
            // 监听窗口变化
            window.addEventListener('resize', () => {
                // 重置渲染器大小
                renderer.setSize(window.innerWidth, window.innerHeight);
                // 重置相机高宽比
                camera.aspect = window.innerWidth / window.innerHeight;
                // 更新相机投影矩阵
                camera.updateProjectionMatrix();
            })
            // GUI
            const gui = new GUI()
            let btnObj = {
                FullScreen: () => {
                    document.body.requestFullscreen();
                },
                ExitFullScreen: () => {
                    document.exitFullscreen();
                }
            }
            // 在GUI中添加按钮
            gui.add(btnObj, 'FullScreen')
            gui.add(btnObj, 'ExitFullScreen')
            // GUI folder
            let cubeSet = gui.addFolder('立方体设置')
            cubeSet.add(cube.position, 'x').max(5).min(-5).step(1).name('立方体x轴').onFinishChange((val:String) => {
                console.log("最后一次更改x轴位置："+val)
            })
            cubeSet.add(cube.position, 'y').max(5).min(-5).step(1).name('立方体y轴')
            cubeSet.add(cube.position, 'z').max(5).min(-5).step(1).name('立方体z轴')

            cubeSet.add(axesHelper, 'visible').name('是否开启辅助坐标系')
            cubeSet.add(material, 'wireframe').name('线框模式')

            let colorParams = {
                cubeColor: '#00ff00'
            }
            cubeSet.addColor(colorParams, 'cubeColor').name('立方体颜色').onChange((val:String) => {
                material.color.set(val)
            })

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