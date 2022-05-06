

<template>
    <jb-dialog
        :value="value"
        class="template-select-dialog"
        :title="$t('template.新建执行方案')"
        header-position="left"
        render-directive="if"
        :mask-close="false"
        :esc-close="false"
        :width="480"
        :draggable="false"
        @cancel="handleCancel">
        <jb-form ref="form" :model="formData" form-type="vertical" :rules="rules">
            <jb-form-item :label="$t('template.作业模板')" required property="templateId">
                <bk-select
                    v-model="formData.templateId"
                    :placeholder="$t('template.请选择作业模板')"
                    :clearable="false"
                    searchable
                    :remote-method="fetchData">
                    <bk-option
                        v-for="item in templateList"
                        :key="item.id"
                        :id="item.id"
                        :name="item.name" />
                    <template slot="extension">
                        <auth-component auth="job_template/create">
                            <div @click="handleCreate" style="cursor: pointer;">
                                <i class="bk-icon icon-plus-circle" />{{ $t('template.新建模板') }}
                            </div>
                            <div slot="forbid">
                                <i class="bk-icon icon-plus-circle" />{{ $t('template.新建模板') }}
                            </div>
                        </auth-component>
                    </template>
                </bk-select>
            </jb-form-item>
        </jb-form>
        <div slot="footer">
            <auth-button
                :resource-id="formData.templateId"
                :auth="formData.templateId ? 'job_plan/create' : ''"
                theme="primary"
                
                class="mr10"
                @click="handleSubmit">
                {{ $t('template.确定') }}
            </auth-button>
            <bk-button @click="handleCancel">{{ $t('template.取消') }}</bk-button>
        </div>
    </jb-dialog>
</template>
<script>
    import I18n from '@/i18n';
    import TaskManageService from '@service/task-manage';
    import {
        leaveConfirm,
    } from '@utils/assist';

    export default {
        name: '',
        props: {
            value: {
                type: Boolean,
                default: false,
            },
        },
        data () {
            return {
                templateList: [{},{},{}],
                formData: {
                    templateId: '',
                },
            };
        },
        watch: {
            value: {
                handler  (value) {
                    if (value) {
                        this.fetchData();
                    }
                },
                immediate: true,
            },
        },
        created () {
            this.rules = {
                templateId: [
                    {
                        required: true,
                        message: I18n.t('template.请选择作业模板'),
                        trigger: 'blur',
                    },
                ],
            };
        },
        methods: {
            fetchData (search) {
                TaskManageService.taskList({
                    name: search,
                    start: 0,
                    pageSize: 10,
                }).then((data) => {
                    this.templateList = Object.freeze(data.data);
                });
            },
            handleCreate () {
                const router = this.$router.resolve({
                    name: 'templateCreate',
                });
                window.open(router.href);
            },
            handleSubmit () {
                this.$refs.form.validate()
                    .then(() => {
                        window.changeAlert = false;
                        this.handleCancel();
                        this.$emit('on-change', this.formData.templateId);
                    });
            },
            handleCancel () {
                leaveConfirm()
                    .then(() => {
                        this.$emit('input', false);
                    });
            },
        },
    };
</script>
<style lang='postcss'>
    .template-select-dialog {
        .bk-dialog-header {
            padding-bottom: 0 !important;
        }

        .bk-form-item:last-child {
            margin-bottom: 0 !important;
        }
    }
</style>
