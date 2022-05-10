<template>
    <div class="render-file-source-name" v-bkloading="{ isLoading }">
        <div @click="handleGoFileSource(fileSourceId)">
            {{ fileSourceAlias || '--' }}
            <Icon type="edit" class="link-flag" svg />
        </div>
    </div>
</template>
<script>
    import FileManageService from '@service/file-source-manage';

    export default {
        props: {
            fileSourceId: {
                type: Number,
                required: true,
            },
        },
        data () {
            return {
                isLoading: false,
                fileSourceAlias: '',
            };
        },
        created () {
            this.fetchSourceFileInfo();
        },
        methods: {
            /**
             * @desc 通过文件源id获取文件详细信息
             */
            fetchSourceFileInfo () {
                FileManageService.getSourceInfo({
                    id: this.fileSourceId,
                }).then((data) => {
                    this.fileSourceAlias = data.alias;
                });
            },
            /**
             * @desc 新窗口打开文件源列表页面
             */
            handleGoFileSource () {
                const { href } = this.$router.resolve({
                    name: 'fileList',
                    query: {
                        fileSourceId: this.fileSourceId,
                    },
                });
                window.open(href, '_blank');
            },
        },
    };
</script>
<style lang="postcss">
    .render-file-source-name {
        cursor: pointer;

        .link-flag {
            opacity: 0%;
        }

        &:hover {
            color: #3a84ff !important;

            .link-flag {
                opacity: 100%;
            }
        }
    }
</style>
