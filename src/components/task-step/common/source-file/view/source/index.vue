<template>
    <div>
        <table>
            <thead>
                <th style="width: 40%;">{{ '文件名称' }}</th>
                <th style="width: auto;">{{ '文件源'}}</th>
                <th>{{ '操作' }}</th>
            </thead>
            <tbody>
                <tr v-for="(sourceFile, index) in list" :key="index">
                    <td>
                        <div class="path-text-style" @click="handleEditSourceFile(index)">
                            <render-file-name :data="sourceFile.fileLocation" />
                        </div>
                    </td>
                    <td>
                        <render-source-name :file-source-id="sourceFile.fileSourceId" />
                    </td>
                    <td>
                        <div class="action-box">
                            <bk-button text @click="handlerRemove(index)">{{ '移除' }}</bk-button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <lower-component level="custom" :custom="isShowSourceFile">
            <choose-source-file
                v-model="isShowSourceFile"
                :source-file="data[editSourceFileIndex] || {}"
                @on-change="handleSourceFileChange" />
        </lower-component>
    </div>
</template>
<script>
    import ChooseSourceFile from './components/choose-source-file/';
    import RenderSourceName from './components/render-source-name';
    import RenderFileName from './components/render-file-name';

    export default {
        components: {
            ChooseSourceFile,
            RenderFileName,
            RenderSourceName,
            
        },
        props: {
            data: {
                type: Array,
                default: () => [],
            },
        },
        data () {
            return {
                isShowSourceFile: false,
                editSourceFileIndex: -1,
                list: [{},{},{}],
            };
        },
        watch: {
            data: {
                handler (newData) {
                    if (this.innerChange) {
                        this.innerChange = false;
                        return;
                    }
                    this.list = Object.freeze(newData);
                },
                immediate: true,
            },
        },
        methods: {
            /**
             * @desc 触发文件源 更新
             */
            triggerChange () {
                this.innerChange = true;
                this.$emit('on-change', [...this.list]);
            },
            /**
             * @desc 更新文件源文件
             * @param {Object} payload 文件源文件数据
             */
            handleSourceFileChange (payload) {
                const newData = [...this.list];
                if (this.editSourceFileIndex > -1) {
                    newData.splice(this.editSourceFileIndex, 1, payload);
                } else {
                    newData.push(payload);
                }

                this.list = Object.freeze(newData);
                
                this.editSourceFileIndex = -1;
                this.triggerChange();
            },
            /**
             * @desc 组件外部调用，显示选择文件源弹层
             */
            handleShowSourceDialog () {
                this.isShowSourceFile = true;
                this.editSourceFileIndex = -1;
            },
            /**
             * @desc 显示选择文件源对话框模板
             */
            handleEditSourceFile (index) {
                this.isShowSourceFile = true;
                this.editSourceFileIndex = index;
            },

            /**
             * @desc 移除选中的文件源数据
             * @param {Number} index 已选中的文件源数据数组对应下标
             */
            handlerRemove (index) {
                const newData = [...this.list];
                newData.splice(this.editSourceFileIndex, 1);
                this.list = Object.freeze(newData);
                this.triggerChange();
            },
        },
    };
</script>
