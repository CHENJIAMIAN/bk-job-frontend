

<template>
    <div class="variable-type-host" :class="{ 'variable-value-error': isError }">
        <div>
            <div>
                <bk-button
                    class="mr10"
                    
                    @click="handleChooseIp"
                    v-bk-tooltips="descPopover">
                    <Icon type="plus" />
                    {{ $t('添加服务器') }}
                </bk-button>
                <bk-button
                    v-show="isNotEmpty"
                    
                    @click="handleClear">
                    {{ $t('清空') }}
                </bk-button>
            </div>
            <server-panel
                v-show="isNotEmpty"
                ref="choostIP"
                class="host-value-panel"
                :host-node-info="hostNodeInfo"
                detail-fullscreen
                :editable="!readonly"
                @on-change="handleChange" />
            <p v-if="isError" class="variable-error">{{ $t('该变量的值必填') }}</p>
        </div>
        <choose-ip
            v-model="isShowChooseIp"
            :host-node-info="hostNodeInfo"
            @on-change="handleChange" />
    </div>
</template>
<script>
    import TaskHostNodeModel from '@model/task-host-node';
    import ChooseIp from '@components/choose-ip';
    import ServerPanel from '@components/choose-ip/server-panel';

    export default {
        components: {
            ChooseIp,
            ServerPanel,
        },
        props: {
            data: {
                type: Object,
                required: true,
            },
            readonly: {
                type: Boolean,
                default: false,
            },
        },
        data () {
            return {
                isShowChooseIp: false,
                hostNodeInfo: {},
            };
        },
        computed: {
            isNotEmpty () {
                return !TaskHostNodeModel.isHostNodeInfoEmpty(this.hostNodeInfo);
            },
            isError () {
                if (this.data.required !== 1) {
                    return false;
                }
                return !this.isNotEmpty;
            },
            descPopover () {
                return {
                    theme: 'light',
                    extCls: 'variable-desc-tippy',
                    trigger: 'click mouseenter',
                    hideOnClick: false,
                    content: this.data.description,
                    disabled: !this.data.description,
                };
            },
        },
        created () {
            this.init();
        },
        methods: {
            /**
             * @desc 解析默认值
             */
            init () {
                if (this.data.defaultTargetValue) {
                    this.hostNodeInfo = this.data.defaultTargetValue.hostNodeInfo;
                } else {
                    this.hostNodeInfo = this.data.targetValue.hostNodeInfo;
                }
            },
            /**
             * @desc 外部调用——移除无效主机
             */
            removeAllInvalidHost () {
                window.changeAlert = true;
                this.$refs.choostIP.removeAllInvalidHost();
            },
            /**
             * @desc 编辑主机列表
             */
            handleChooseIp () {
                this.isShowChooseIp = true;
            },
            /**
             * @desc 清空主机列表
             */
            handleClear () {
                const { hostNodeInfo } = new TaskHostNodeModel({});
                this.hostNodeInfo = hostNodeInfo;
                window.changeAlert = true;
            },
            /**
             * @desc 提交编辑的数据
             */
            handleChange (hostNodeInfo) {
                this.hostNodeInfo = Object.freeze(hostNodeInfo);
                window.changeAlert = true;
            },
            /**
             * @desc 外部调用——还原默认值
             */
            reset () {
                this.init();
            },
            /**
             * @desc 外部调用——值验证
             * @returns {Promise}
             */
            validate () {
                const { type, id, name } = this.data;
                
                const data = {
                    id,
                    name,
                    type,
                    value: '',
                    targetValue: {
                        hostNodeInfo: this.hostNodeInfo,
                    },
                };
                return new Promise((resolve, reject) => {
                    if (this.isError) {
                        return reject(new Error('host error'));
                    }
                    resolve(data);
                });
            },
        },
    };
</script>
<style lang='postcss' scoped>
    .variable-type-host {
        .host-value-panel {
            margin-top: 10px;
        }
    }

</style>
