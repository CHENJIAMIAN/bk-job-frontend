<template>
    <div>
        <div class="name">
            <span>{{ data.name }}</span>
            <span class="remove-flag" @click="handleRemove">
                <Icon type="reduce-fill" />
            </span>
        </div>
        <div>
            <bk-button v-if="isValueEmpty" @click="handleChooseIp" style="width: 160px;">
                <Icon type="plus" />
                {{ '添加服务器' }}
            </bk-button>
            <div v-else class="host-value-text" @click="handleChooseIp">
                <div class="host-type">
                    <Icon type="host" />
                </div>
                <div>
                    {{ valueText }}
                </div>
                <Icon class="host-edit" type="edit-2" />
            </div>
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

    export default {
        components: {
            ChooseIp,
        },
        props: {
            data: {
                type: Object,
                required: true,
            },
            value: {
                type: Object,
                default: () => new TaskHostNodeModel({}),
            },
        },
        data () {
            return {
                isShowChooseIp: false,
                hostNodeInfo: {},
            };
        },
        computed: {
            isValueEmpty () {
                return TaskHostNodeModel.isHostNodeInfoEmpty(this.value.hostNodeInfo);
            },
            valueText  () {
                return new TaskHostNodeModel(this.value).text;
            },
        },
        
        methods: {
            handleRemove () {
                this.$emit('on-remove');
            },
            handleChooseIp () {
                this.isShowChooseIp = true;
                this.hostNodeInfo = this.value.hostNodeInfo;
            },
            handleClear () {
                this.$emit('on-change', new TaskHostNodeModel({}));
            },
            handleChange (hostNodeInfo) {
                this.$emit('on-change', {
                    hostNodeInfo,
                });
            },
        },
    };
</script>
<style lang='postcss' scoped>
    .host-value-text {
        display: flex;
        width: 333px;
        height: 32px;
        overflow: hidden;
        font-size: 12px;
        color: #63656e;
        cursor: pointer;
        background: #fff;
        border: 1px solid #c4c6cc;
        border-radius: 3px;
        transition: all 0.1s;
        align-items: center;

        .host-type {
            display: flex;
            width: 32px;
            height: 32px;
            margin-right: 10px;
            font-size: 17px;
            color: #fff;
            background: #c4c6cc;
            transition: all 0.1s;
            align-items: center;
            justify-content: center;
        }

        .host-edit {
            margin-right: 8px;
            margin-left: auto;
            font-size: 16px;
            color: #3a84ff;
            opacity: 0%;
        }

        &:hover {
            border-color: #3a84ff;

            .host-type {
                background: #3a84ff;
            }

            .host-edit {
                opacity: 100%;
            }
        }
    }
</style>
