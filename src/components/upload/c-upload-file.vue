<!--
 * @Description: 控件-上传附件
 * @Autor: fy
 * @Date: 2021-09-13 10:12:06
 * @LastEditors: fy
 * @LastEditTime: 2021-09-22 15:01:02
-->
<template>
    <div class="c-upload-file">
        <div class="c-upload-file-box">
            <!-- 上传后的文件 -->
            <show-upload-file-list ref="ShowUploadFileList" :obj="obj" :isDetail="isDetail" @change="getUploadLen" />

            <!-- 上传按钮框 -->
            <el-upload
                v-loading="loading"
                ref="avatarUploader"
                class="c-upload-file-btn"
                :class="[disabled ? 'disabled' : '']"
                element-loading-text="loading"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :action="actionUrl"
                :show-file-list="false"
                :on-exceed="onExceed"
                :on-progress="onProgress"
                :before-upload="onBeforeUpload"
                :on-error="onError"
                :on-success="onSuccess"
                :http-request="fileUpload"
                :auto-upload="isAutoUpload"
                :disabled="disabled || obj.disabled"
                :limit="Number(obj.max)"
                :multiple="obj.max > 1 ? true : false"
                :accept="accept"
                v-if="(!obj.max || (obj.max > 1 && obj.max > uploadLen)) && !isDetail"
            >
                <!-- <el-progress type="circle" :width="78" :percentage="percentage" v-if="isProgress"></el-progress> -->
                <span style="line-height:30px;">
                    <i class="el-icon-plus c-upload-file-btn-icon"></i>
                </span>
            </el-upload>
        </div>
    </div>
</template>

<script>
import { fileOssMultipartUpload } from '@/api/OssClient'
import ShowUploadFileList from '@/components/upload/show-upload-file-list.vue'

export default {
    name: 'c-upload-file',
    components: { ShowUploadFileList },
    props: {
        obj: {
            type: Object,
            default: () => {}
        },
        accept: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        },
        limit: {
            type: Number,
            default: null
        },
        urls: {
            type: Array,
            default: () => []
        },
        isAutoUpload: {
            type: Boolean,
            default: true
        },
        isDetail: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            loading: false, //上传时显示loading
            actionUrl: '',
            isProgress: false, //是否正在上传中
            percentage: 0, //上传进度
            uploadLen: 0
        }
    },
    computed: {
        ossFilePath() {
            return this.$store.state.ossFilePath
        }
    },
    methods: {
        // 上传限制
        onExceed(files, fileList) {
            this.$message.warning(`限制只可以选择${this.obj.max}个文件，超过限制！`)
        },

        // 上传时进度
        onProgress(e) {
            this.isProgress = true
            this.percentage = Math.floor(e.percent)
        },

        // 上传失败
        onError(e) {
            this.isProgress = false
            console.log('上传失败', e)
        },

        // 上传成功
        onSuccess(response, file, fileList) {
            this.isProgress = false
            console.log('上传成功', file, fileList)
        },

        // 上传之前
        onBeforeUpload(file) {
            if (this.accept == 'image/*') {
                if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(file.name)) {
                    this.$message.error('上传头像图片只能是 JPG 格式!')
                    return false
                }
                if (file.size > 2 * 1024 * 1024) {
                    this.$message.error('上传头像图片大小不能超过 2MB!')
                    return false
                }
            }

            return true
        },

        getUploadLen(fileList) {
            this.uploadLen = fileList.length || 0
        },

        // file转换dataurl地址
        getFileDataUrl(file) {
            let URL = window.URL || window.webkitURL
            return URL.createObjectURL(file.raw)
        },

        // 获取名字
        getFileName(file) {
            let timestamp = Date.parse(new Date())
            // console.log('ossFilePath', this.ossFilePath)
            return this.ossFilePath ? this.ossFilePath + '/' + timestamp + '_' + file.name : timestamp + '_' + file.name
        },

        // 文件上传
        async fileUpload(e) {
            const fileName = this.getFileName(e.file)
            this.loading = true
            try {
                let res = await fileOssMultipartUpload(fileName, e.file, e)
                this.loading = false
                let url = res.length > 0 ? res[0] : ''
                this.$refs.ShowUploadFileList.setUrl(url)
                this.$message.success('文件上传成功')
                // console.log('oss上传', res)
                this.$emit('change', url, this.obj.type)
            } catch (e) {
                // console.error('oss上传失败', e)
                this.loading = false
                this.$message.error('文件上传失败')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.c-upload-file {
    line-height: normal;
    display: inline-block;

    .c-upload-file-box {
        position: relative;

        .disabled {
            /deep/ .el-upload {
                background: #f5f7fa;
                &:hover {
                    border-color: #e0e5eb !important;
                }
            }
        }

        .c-upload-file-btn {
            width: 80px;
            height: 80px;
            overflow: hidden;
            display: inline-block;
            border: 1px solid #e0e5eb;
            /deep/ .el-upload {
                cursor: pointer;
                position: relative;
                overflow: hidden;
                &:hover {
                    border-color: #00c2b3;
                }
            }
            .c-upload-file-btn-icon {
                font-size: 28px;
                min-width: 80px;
                height: 80px;
                line-height: 80px;
                text-align: center;
                color: #00c2b3;
            }
        }

        .progress-box {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            width: 99%;
            height: 99%;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>