

<template>
    <div class="task-import-step4">
        <jb-form ref="form" class="form" :model="formData" :rules="rules">
            <jb-form-item :label="$t('template.重名后缀')" required property="duplicateSuffix">
                <bk-input v-model.trim="formData.duplicateSuffix" class="input" />
            </jb-form-item>
            <jb-form-item :label="$t('template.作业ID处理')" required>
                <bk-select v-model="formData.duplicateIdHandler" class="input" :clearable="false">
                    <bk-option :id="0" :name="$t('template.不保留，全部按自增处理')" />
                    <bk-option :id="1" :name="$t('template.保留，ID 冲突时自增处理')" />
                    <bk-option :id="2" :name="$t('template.保留，ID 冲突时不导入')" />
                </bk-select>
            </jb-form-item>
        </jb-form>
        <action-bar>
            <bk-button class="mr10" @click="handleCancel">{{ $t('template.取消') }}</bk-button>
            <bk-button class="mr10" @click="handleLast">{{ $t('template.上一步') }}</bk-button>
            <bk-button class="w120" :loading="isSubmiting" theme="primary" @click="handleNext">{{ $t('template.下一步') }}</bk-button>
        </action-bar>
    </div>
</template>
<script>
    import I18n from '@/i18n';
    import BackupService from '@service/backup';
    import {
        taskImport,
    } from '@utils/cache-helper';
    import ActionBar from '../components/action-bar';

    export default {
        name: '',
        components: {
            ActionBar,
        },
        data () {
            return {
                isSubmiting: false,
                formData: {
                    duplicateSuffix: '_imported',
                    duplicateIdHandler: 0,
                },
            };
        },
        created () {
            this.id = taskImport.getItem('id');
            this.templateInfo = taskImport.getItem('templateInfo');
            this.rules = {
                duplicateSuffix: [
                    { required: true, message: I18n.t('template.请输入重名后缀'), trigger: 'blur' },
                ],
            };
        },
        methods: {
            handleCancel () {
                this.$emit('on-cancle');
            },
            handleLast () {
                this.$emit('on-change', 3);
            },
            handleNext () {
                this.isSubmiting = true;
                this.$refs.form.validate()
                    .then(() => BackupService.import({
                        ...this.formData,
                        id: this.id,
                        templateInfo: this.templateInfo,
                    }).then(() => {
                        window.changeAlert = false;
                        this.$emit('on-change', 5);
                    }))
                    .finally(() => {
                        this.isSubmiting = false;
                    });
            },
        },
    };
</script>
<style lang='postcss'>
    .task-import-step4 {
        .form {
            width: 520px;
            margin: 60px auto 0;
        }

        .input {
            width: 420px;
        }
    }
</style>
