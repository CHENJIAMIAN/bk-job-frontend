

<template>
    <div v-if="value" id="chooseIPServerPreview" class="server-preview">
        <div class="preview-header">
            <div>{{ $t('已选项预览') }}</div>
            <div class="server-description">
                <span v-html="resultText" />
            </div>
        </div>
        <scroll-faker class="preview-content" style="height: calc(100% - 118px);">
            <server-panel
                :host-node-info="hostNodeInfo"
                :host-detail-append="getElementTarget"
                editable
                render-with-empty
                @on-change="handleServerPanelChange" />
        </scroll-faker>
        <div class="preview-footer">
            <bk-button class="mr10" theme="primary" @click="handleSubmit">{{ $t('确定') }}</bk-button>
            <bk-button @click="handleClose">{{ $t('关闭') }}</bk-button>
        </div>
    </div>
</template>
<script>
/**
     * 预览已选主机数据
    */
    import I18n from '@/i18n';
    import ServerPanel from './server-panel';

    export default {
        name: '',
        components: {
            ServerPanel,
        },
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            host: {
                type: Array,
                default: () => [],
            },
            node: {
                type: Array,
                default: () => [],
            },
            group: {
                type: Array,
                default: () => [],
            },
        },
        data () {
            return {
                hostNodeInfoLocal: {},
            };
        },
        computed: {
            hostNodeInfo () {
                return {
                    ipList: this.host,
                    dynamicGroupList: this.group,
                    topoNodeList: this.node,
                };
            },
            /**
             * @desc 选择结果的展示
             * @returns {String}
             */
            resultText () {
                const {
                    dynamicGroupList = [],
                    ipList = [],
                    topoNodeList = [],
                } = this.hostNodeInfoLocal;

                const result = [];
                if (ipList.length > 0) {
                    result.push(`<span class="strong number choose-host">${ipList.length}</span>${I18n.t('台主机.select')}`);
                }
                if (topoNodeList.length > 0) {
                    result.push(`<span class="strong number choose-node">${topoNodeList.length}</span>${I18n.t('个节点.select')}`);
                }
                if (dynamicGroupList.length > 0) {
                    result.push(`<span class="strong number choose-group">${dynamicGroupList.length}</span>${I18n.t('个分组.select')}`);
                }
                if (result.length < 1) {
                    return `（${I18n.t('暂无已选项')}）`;
                }
                return `（${result.join('，')}）`;
            },
        },
        watch: {
            hostNodeInfo: {
                handler (hostNodeInfo) {
                    this.hostNodeInfoLocal = Object.freeze(hostNodeInfo);
                },
                immediate: true,
            },
        },
        created () {
            this.innerChange = false;
        },
        methods: {
            getElementTarget () {
                return document.querySelector('#chooseIPServerPreview');
            },
            handleServerPanelChange (hostNodeInfo) {
                this.innerChange = true;
                this.hostNodeInfoLocal = Object.freeze(hostNodeInfo);
            },
            handleSubmit () {
                if (this.innerChange) {
                    this.$emit('on-change', this.hostNodeInfoLocal);
                }
                this.handleClose();
            },
            handleClose () {
                this.innerChange = false;
                this.$emit('input', false);
                this.$emit('change', false);
            },
        },
    };
</script>
<style lang='postcss'>
    .server-preview {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 9;
        display: flex;
        flex-direction: column;
        background: #fff;

        .preview-header {
            display: flex;
            align-items: center;
            flex: 0 0 68px;
            height: 68px;
            padding-left: 24px;
            margin-bottom: -1px;
            font-size: 20px;
            color: #000;
            border-bottom: 1px solid #dcdee5;

            .server-description {
                padding-top: 6px;
                margin-left: 12px;
                font-size: 12px;
                line-height: 1em;
                color: #63656e;
            }
        }

        .preview-footer {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            height: 60px;
            padding-right: 24px;
            background: #fafbfd;
        }
    }
</style>
