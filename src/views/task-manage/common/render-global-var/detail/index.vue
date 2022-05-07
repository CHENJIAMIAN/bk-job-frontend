

<template>
    <div class="job-variable-detail">
        <table class="info-table">
            <tr
                v-for="(item, index) in describeMap"
                :key="index"
                class="variable-item">
                <td class="info-label">{{ item.label }}</td>
                <td class="info-value">
                    <jb-edit-textarea :field="item.filed" :value="data[item.filed]" readonly />
                </td>
            </tr>
        </table>
        <template v-if="data.isHost">
            <server-panel
                style="margin-top: 20px;"
                detail-fullscreen
                :host-node-info="data.defaultTargetValue.hostNodeInfo" />
        </template>
    </div>
</template>
<script>
       import GlobalVariableModel from '@model/task/global-variable';
    import ServerPanel from '@components/choose-ip/server-panel';
    import JbEditTextarea from '@components/jb-edit/textarea';

    const type = () => ({ label: '变量类型', filed: 'typeText' });
    const name = () => ({ label: '变量名称', filed: 'name' });
    const defaultValue = (defaultField = '初始值') => ({ label: defaultField, filed: 'valueText' });
    const description = () => ({ label: '变量描述', filed: 'description' });
    const changeable = () => ({ label: '赋值可变', filed: 'changeableText' });
    const required = () => ({ label: '必填', filed: 'requiredText' });

    const generateVariableDescribeMap = (defaultField = '初始值') => ({
        [GlobalVariableModel.TYPE_STRING]: [type(), name(), defaultValue(defaultField), description(), changeable(), required()],
        [GlobalVariableModel.TYPE_NAMESPACE]: [type(), name(), defaultValue(defaultField), description(), required()],
        [GlobalVariableModel.TYPE_HOST]: [type(), name(), defaultValue(defaultField), description(), required()],
        [GlobalVariableModel.TYPE_PASSWORD]: [type(), name(), defaultValue(defaultField), description(), required()],
        [GlobalVariableModel.TYPE_RELATE_ARRAY]: [type(), name(), defaultValue(defaultField), description(), required()],
        [GlobalVariableModel.TYPE_INDEX_ARRAY]: [type(), name(), defaultValue(defaultField), description(), required()],
    });
    
    export default {
        name: 'GlobalVarView',
        components: {
            ServerPanel,
            JbEditTextarea,
        },
        props: {
            data: {
                type: Object,
                default () {
                    return {};
                },
            },
            defaultField: {
                type: String,
                default: '初始值',
            },
        },
        computed: {
            describeMap () {
                return generateVariableDescribeMap(this.defaultField)[this.data.type];
            },
        },
    };
</script>
<style lang='postcss' scoped>
    .job-variable-detail {
        padding-bottom: 20px;
        font-size: 14px;
        color: #63656e;

        .info-table {
            width: 100%;
            line-height: 24px;

            td {
                padding-top: 9px;
                padding-bottom: 9px;
                border: 1px solid #dde4eb;
            }
        }

        .info-label {
            width: 110px;
            padding-right: 20px;
            color: #b2b5bd;
            text-align: right;
        }

        .info-value {
            padding-left: 21px;
            word-break: break-all;
        }
    }
</style>
