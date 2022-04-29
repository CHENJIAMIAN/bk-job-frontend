

<template>
    <jb-dialog
        :value="value"
        class="choose-source-file"
        header-position="left"
        :esc-close="false"
        :mask-close="false"
        :width="1200"
        :title="$t('选择文件源文件')"
        @input="handleCancle">
        <div v-bkloading="{ isLoading }">
            <component
                v-if="value"
                :is="panelCom"
                class="dialog-content"
                :file-source-id="fileSourceId"
                :file-location="fileLocation"
                @on-source-change="handleSourceChange"
                @on-file-change="handelFileChange" />
        </div>
        <template #footer>
            <bk-button
                class="mr10"
                theme="primary"
                :disabled="isSelectedEmpty"
                @click="handleSubmit">
                <span>{{ $t('添加') }}</span>
                <span v-if="!isSelectedEmpty" class="result-nums">{{ fileLocation.length }}</span>
            </bk-button>
            <bk-button @click="handleCancle">{{ $t('取消') }}</bk-button>
        </template>
    </jb-dialog>
</template>
<script>
    import SourceFileVO from '@domain/variable-object/source-file';
    import SelectFileSource from './select-file-source';
    import SelectFile from './select-file';

    const SELECT_FILE_SOURCE = 'selectFileSource';
    const SELECT_FILE = 'selectFile';
    
    export default {
        components: {
            SelectFileSource,
            SelectFile,
        },
        props: {
            value: {
                type: Boolean,
                defaule: false,
            },
            sourceFile: {
                type: Object,
                defaule: () => ({}),
            },
        },
        data () {
            return {
                isLoading: false,
                selectStep: SELECT_FILE_SOURCE,
                fileSourceId: '',
                fileLocation: [],
            };
        },
        computed: {
            panelCom () {
                if (!this.fileSourceId) {
                    return SelectFileSource;
                }
                const comMap = {
                    [SELECT_FILE_SOURCE]: SelectFileSource,
                    [SELECT_FILE]: SelectFile,
                };
                return comMap[this.selectStep];
            },
            isSelectedEmpty () {
                return this.fileLocation.length < 1;
            },
        },
        watch: {
            value: {
                /**
                 * @desc 显示源文件选择框
                 *
                 * 1，有指定fileSourceId进入编辑状态
                 * 解析fileSourceId、bucketName，定位到已选的文件夹
                 * 2，没有指定fileSourceId进行新建状态
                 *  先选择文件源
                 *
                 */
                handler (value) {
                    if (!value) {
                        return;
                    }
                    if (this.sourceFile.fileSourceId) {
                        const {
                            fileSourceId,
                            fileLocation,
                        } = this.sourceFile;
                        this.fileSourceId = fileSourceId;
                        this.fileLocation = fileLocation;
                        this.selectStep = SELECT_FILE;
                    } else {
                        this.fileSourceId = '';
                        this.fileLocation = [];
                        this.selectStep = SELECT_FILE_SOURCE;
                    }
                },
                immediate: true,
            },
        },
        methods: {
            /**
             * @desc 选中文件源
             * @param {Object} fileSource 选中的文件源
             *
             * 选中fileSource时列表需要切换成bucket列表
             *
             */
            handleSourceChange (fileSource) {
                this.fileSourceId = fileSource.id;
                this.selectStep = SELECT_FILE;
                this.fileLocation = [];
            },
            /**
             * @desc 选中文件
             * @param {Array} fileLocation 选中的文件源
             */
            handelFileChange (fileLocation) {
                this.fileLocation = Object.freeze([...fileLocation]);
            },

            /**
             * @desc 确认按钮事件
             *
             * 选中文件后,过滤重新选择的文件与已选中文件
             * 数据传递到父组件,关闭对话框
             */
            handleSubmit () {
                const fileSourceObj = new SourceFileVO({
                    fileSourceId: this.fileSourceId,
                    fileType: 3,
                    fileLocation: this.fileLocation,
                });
                this.$emit('on-change', fileSourceObj);
                this.handleCancle();
            },

            /**
             * @desc 取消按钮事件
             */
            handleCancle () {
                this.$emit('input', false);
            },

        },
    };
</script>
<style lang="postcss">
    .choose-source-file {
        .result-nums {
            display: inline-block;
            min-width: 18px;
            min-height: 18px;
            padding: 0 5px;
            font-size: 12px;
            line-height: 18px;
            color: #3a84ff;
            text-align: center;
            background-color: #fff;
            border-radius: 10px;
        }

        .dialog-content {
            height: 570px;
        }
    }
</style>
