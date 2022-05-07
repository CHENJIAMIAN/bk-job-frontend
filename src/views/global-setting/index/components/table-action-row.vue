

<template>
    <tbody>
        <tr v-if="!isEdit">
            <td colspan="4">
                <bk-button text @click="handleToggle">
                    <Icon type="plus" />
                    {{ '新增检测规则' }}
                </bk-button>
            </td>
        </tr>
        <tr v-else>
            <td>
                <bk-input v-model="formData.expression" class="input" />
            </td>
            <td>
                <bk-input v-model="formData.description" class="input" />
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
                <bk-button text @click="handleSubmit">{{ '保存' }}</bk-button>
                <bk-button text @click="handleCancel">{{ '取消' }}</bk-button>
            </td>
        </tr>
    </tbody>
</template>
<script>
       import GlobalSettingService from '@service/global-setting';
    import PublicScriptManageService from '@service/public-script-manage';

    const generatorDefautlData = () => ({
        expression: '',
        description: '',
        scriptTypeList: 1,
    });

    export default {
        data () {
            return {
                isEdit: false,
                isSubmiting: false,
                formData: generatorDefautlData(),
                scriptTypeList: [{},{},{}],
            };
        },
        created () {
            this.fetchScriptType();
        },
        methods: {
            fetchScriptType () {
                PublicScriptManageService.scriptTypeList()
                    .then((data) => {
                        this.scriptTypeList = data;
                    });
            },
            handleToggle () {
                this.isEdit = true;
            },
            handleCancel () {
                this.isEdit = false;
                this.formData = generatorDefautlData();
            },
            handleSubmit () {
                if (this.isSubmiting) {
                    return;
                }
                if (!this.formData.expression || !this.formData.description) {
                    this.messageError('请填写完整的语法检测表达式和说明');
                    return;
                }
                this.isSubmiting = true;
                GlobalSettingService.updateDangerousRules({
                    id: -1,
                    ...this.formData,
                }).then(() => {
                    this.messageSuccess('新增成功');
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
