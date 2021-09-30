<!--
 * @Description: 控件 - 手写签名
 * @Autor: fy
 * @Date: 2021-09-27 09:44:10
 * @LastEditors: fy
 * @LastEditTime: 2021-09-30 11:43:20
-->
<template>
    <!-- 了解：npm i elesigncode --save-dev https://blog.csdn.net/baidu_38766085/article/details/108427901、 https://github.com/yinhui1129754/elesigncode-->
    <div class="elesigncode-container">
        <!-- <div class="elesigncode-box">
            <ElesignCode
                ref="ElesignCode"
                :datas="datas"
                :pen="pen"
                :color="color"
                :lineWidth="lineWidth"
                :bgColor="bgColor"
                :writingMaxLine="writingMaxLine"
                :writingMinLine="writingMinLine"
                v-if="!disabled"
            />

            <el-image :src="imgUrl" lazy class="elesigncode-img" v-else />
        </div>-->

        <div class="elesigncode-box">
            <vue-ele-sign :pen="pen" class="elesigncode-content" />
        </div>

        <div>
            <el-button size="small" @click="undo">撤销</el-button>
            <el-button size="small" @click="redo">重做</el-button>
            <el-button size="small" @click="setPen('default')">切换笔</el-button>
            <el-button size="small" @click="getJson">获取数据</el-button>
            <el-button size="small" @click="getImg">获取图片</el-button>
        </div>
    </div>
</template>

<script>
import ElesignCode from 'elesigncode/lib/core/elesigncode'
import VueEleSign from 'vue-ele-sign'
import { elesigncodeData } from './data'
import { fileOssMultipartUpload } from '@/api/OssClient'

export default {
    name: 'c-elesigncode',
    components: { ElesignCode, VueEleSign },
    props: {
        color: {
            type: String,
            default: '#333333'
        },
        lineWidth: {
            type: Number,
            default: 4
        },
        bgColor: {
            type: String,
            default: '-1'
        },
        pen: {
            type: String,
            default: 'writing' // default 、 writing
        },
        writingMaxLine: {
            type: Number,
            default: 15
        },
        writingMinLine: {
            type: Number,
            default: 8
        },
        datas: {
            type: Object,
            default: () => {}
        },
        imgType: {
            type: String,
            default: 'png'
        },
        fileType: {
            type: String,
            default: 'base64'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        isUpload: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            elesigncodeData: elesigncodeData,
            imgUrl: ''
        }
    },
    computed: {
        ossFilePath() {
            return this.$store.state.ossFilePath
        }
    },
    methods: {
        // 撤销
        undo() {
            console.log('撤销')
            this.$refs.ElesignCode.undo()
        },

        // 撤销
        redo() {
            console.log('重做')
            this.$refs.ElesignCode.redo()
        },

        // 设置当前的笔类型
        setPen(name) {
            console.log('笔类型	')
            this.$refs.ElesignCode.setPen(name)
        },

        // 获取文件的json和图片
        getFile() {
            let obj = {}
            obj.data = this.getJson()
            obj.img = this.getImg()
            obj.img = this.getImg()
            return obj
        },

        // 获取json数据
        getJson() {
            console.log('获取数据', this.$refs.ElesignCode.getJson())
            return this.$refs.ElesignCode.getJson()
        },

        // 获取图片
        getImg() {
            let imgData = this.$refs.ElesignCode.toJpeg()
            if (this.imgType == 'png') {
                imgData = this.$refs.ElesignCode.toPng()
            }
            this.imgUrl = imgData
            if (this.fileType == 'file' || this.isUpload) {
                imgData = this.base64ImgtoFile(imgData)
            }

            console.log('获取图片', this.imgType, imgData)
            if (this.isUpload) {
                this.fileUpload(imgData)
            } else {
                return imgData
            }
        },

        // base64转成file文件
        base64ImgtoFile(dataurl, filename = '签名') {
            const arr = dataurl.split(',')
            const mime = arr[0].match(/:(.*?);/)[1]
            const suffix = mime.split('/')[1]
            const bstr = atob(arr[1])
            let n = bstr.length
            const u8arr = new Uint8Array(n)
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n)
            }
            return new File([u8arr], `${filename}.${suffix}`, {
                type: mime
            })
        },

        // 获取名字
        getFileName(file) {
            let timestamp = Date.parse(new Date())
            // console.log('ossFilePath', this.ossFilePath)
            return this.ossFilePath ? this.ossFilePath + '/' + timestamp + '_' + file.name : timestamp + '_' + file.name
        },

        // 文件上传
        async fileUpload(e) {
            console.log('文件上传', e)
            const fileName = this.getFileName(e)
            this.loading = true
            try {
                let res = await fileOssMultipartUpload(fileName, e)
                console.log(333, res)
                // this.loading = false
                // let url = res.length > 0 ? res[0] : ''
                // this.$refs.ShowUploadFileList.setUrl(url)
                this.$message.success('文件上传成功')
                // console.log('oss上传', res)
                // this.$emit('change', url, this.obj.type)
            } catch (e) {
                // console.error('oss上传失败', e)
                // this.loading = false
                this.$message.error('文件上传失败')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.elesigncode-container {
    width: 100%;
    height: 100%;
    min-height: 128px;

    .elesigncode-box {
        width: 100%;
        // height: 100%;
        height: 300px;
        background: #f5f5f5;
        margin-bottom: 10px;
    }

    .elesigncode-content {
        width: 100%;

        height: 100%;
    }

    .elesigncode-img {
        width: 100%;
        height: 100%;
    }
}
</style>