<!--
 * @Description: 控件-上传附件展示的列表
 * @Autor: fy
 * @Date: 2021-09-13 10:12:06
 * @LastEditors: fy
 * @LastEditTime: 2021-09-26 14:29:57
-->
<template>
    <ul class="show-upload-file-list">
        <li v-for="(item, index) in fileUrls" :key="index" class="c-upload-file-item">
            <el-image :src="item" :data-source="item" class="c-upload-file-item-img" lazy @mouseover.stop="previewUrl = item" />

            <i class="el-icon-error c-upload-file-item-delete" v-if="(!disabled || clearable) && !isDetail" @click="deleteFile(index)"></i>

            <!-- 显示查看和下载的按钮弹窗 -->
            <div class="c-upload-file-item-popup" v-show="item && previewUrl == item" @mouseleave.stop="previewUrl = null">
                <i class="el-icon-zoom-in" @click.stop="onPreview(item, index)"></i>
                <i class="el-icon-download" @click.stop="downloadFile(item, index)"></i>
            </div>
        </li>

        <li class="upload-text" v-if="fileUrls.length <1 && isDetail">--</li>
    </ul>
</template>

<script>
export default {
    name: 'c-upload-file',
    props: {
        obj: {
            type: Object,
            default: () => {}
        },
        disabled: {
            type: Boolean,
            default: false
        },
        clearable: {
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
            previewUrl: '', //预览图片地址
            fileUrls: [], //多个图片地址
            imgUrls: []
        }
    },
    filters: {
        imgItem: url => {
            if (!url) return ''
            if (['jpg', 'jpeg', 'png', 'JPG', 'PNG'].indexOf(url) > -1) {
                return url
            } else {
                return '../../assets/img/doc.png'
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.fileUrls = this.obj.value || []
        })
    },
    methods: {
        // 删除文件
        deleteFile(index) {
            this.fileUrls.splice(index, 1)
            this.$emit('change', this.fileUrls)
        },

        // 预览图片
        onPreview(item, index) {
            this.$viewerApi({
                options: {
                    initialViewIndex: index
                },
                images: this.fileUrls
            })
        },

        // 下载文件
        downloadFile(e) {
            // window.location.href = e
            window.open(e)
        },

        setUrl(url) {
            this.fileUrls.push(url)
            this.obj.value = this.fileUrls
            this.$emit('change', this.fileUrls)
            this.setImgUrls()
        },

        setImgUrls() {
            this.imgUrls = this.fileUrls.map(item => {
                if (['jpg', 'jpeg', 'png', 'JPG', 'PNG'].indexOf(item) > -1) {
                    return item
                } else {
                    return '../../assets/img/doc.png'
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.show-upload-file-list {
    display: inline-block;

    .c-upload-file-item {
        position: relative;
        line-height: 0;
        width: fit-content; //  收缩与包裹,收缩到合适
        max-width: 100px;
        display: inline-block;
        margin-right: 15px;
        margin-top: 8px;
        margin-bottom: 8px;
        border: 1px solid #e0e5eb;

        .c-upload-file-item-img {
            display: inline-block;
            width: 80px;
            height: 80px;
        }

        .c-upload-file-item-delete {
            position: absolute;
            right: -7px;
            top: -7px;
            z-index: 3;
            color: #606266;
            font-size: 18px;
        }

        .c-upload-file-item-popup {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            width: 100%;
            height: 100%;
            background: rgba($color: #000000, $alpha: 0.5);
            display: flex;
            justify-content: space-around;
            align-items: center;
            color: #fff;
            font-size: 20px;
            i {
                width: 30%;
                text-align: center;
                padding: 0 5%;
                font-size: 18px;
            }
        }
    }
}

.disabled {
    /deep/ .el-upload {
        background: #f5f7fa;
        &:hover {
            border-color: #e0e5eb !important;
        }
    }
}

.upload-text {
    line-height: 40px;
}
</style>