

<template>
    <tbody>
        <tr v-if="!isEdit">
            <td colspan="5">
                <bk-button
                    text
                    @click="handleToggle">
                    <Icon type="plus" />
                    {{ $t('dangerousRule.新增检测规则') }}
                </bk-button>
            </td>
        </tr>
        <tr v-else>
            <td>
                <bk-input
                    v-model="formData.expression"
                    class="input" />
            </td>
            <td>
                <bk-input
                    v-model="formData.description"
                    class="input" />
            </td>
            <td>
                <bk-select
                    v-model="formData.scriptTypeList"
                    :clearable="false"
                    multiple
                    show-select-all>
                    <bk-option
                        v-for="item in scriptTypeList"
                        :key="item.id"
                        :name="item.name"
                        :id="item.id" />
                </bk-select>
            </td>
            <td>
                <bk-select
                    v-model="formData.action"
                    :clearable="false">
                    <bk-option
                        :name="$t('dangerousRule.扫描')"
                        :id="1" />
                    <bk-option
                        :name="$t('dangerousRule.拦截')"
                        :id="2" />
                </bk-select>
            </td>
            <td>
                <bk-button
                    text
                    @click="handleSubmit">
                    {{ $t('dangerousRule.保存') }}
                </bk-button>
                <bk-button
                    text
                    @click="handleCancel">
                    {{ $t('dangerousRule.取消') }}
                </bk-button>
            </td>
        </tr>
    </tbody>
</template>
<script>
    import I18n from '@/i18n';
    import DangerousRuleService from '@service/dangerous-rule';
    import PublicScriptManageService from '@service/public-script-manage';

    const generatorDefautlData = () => ({
        expression: '',
        description: '',
        scriptTypeList: 1,
        action: 1,
    });

    export default {
        data () {
            return {
                isEdit: false,
                isSubmiting: false,
                formData: generatorDefautlData(),
                scriptTypeList: [],
            };
        },
        created () {
            this.fetchScriptType();
        },
        methods: {
            /**
             * @desc 获取脚本类型列表
             */
            fetchScriptType () {
                PublicScriptManageService.scriptTypeList()
                    .then((data) => {
                        this.scriptTypeList = data;
                    });
            },
            /**
             * @desc 切换编辑状态
             */
            handleToggle () {
                this.isEdit = true;
            },
            /**
             * @desc 取消编辑状态，重置表单数据
             */
            handleCancel () {
                this.isEdit = false;
                this.formData = generatorDefautlData();
            },
            /**
             * @desc 提交用户数据
             */
            handleSubmit () {
                if (this.isSubmiting) {
                    return;
                }
                if (!this.formData.expression || !this.formData.description) {
                    this.messageError(I18n.t('dangerousRule.请填写完整的语法检测表达式和说明'));
                    return;
                }
                this.isSubmiting = true;
                DangerousRuleService.update({
                    id: -1,
                    ...this.formData,
                }).then(() => {
                    this.messageSuccess(I18n.t('dangerousRule.新增成功'));
                    this.$emit('on-change');
                    this.handleCancel();
                })
                    .finally(() => {
                        this.isSubmiting = false;
                    });
            },
        },
    };
</script>
