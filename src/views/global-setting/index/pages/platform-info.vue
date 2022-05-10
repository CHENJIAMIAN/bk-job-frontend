<template>
    <div class="page-platform-info" v-bkloading="{ isLoading }">
        <smart-action offset-target="bk-form-content">
            <div class="wraper">
                <jb-form ref="platformForm" :model="formData" :rules="rules">
                    <bk-popover placement="top" :width="320" theme="light" :distance="-10">
                        <div class="backlist block-title">
                            <span>{{ '网页 Title 设置:' }}</span>
                        </div>
                        <div slot="content" class="title-example-popover">
                            <img src="/static/images/title-example.png" class="example-image">
                        </div>
                    </bk-popover>
                    <hgroup>
                        <jb-form-item
                            :label="'平台名称'"
                            required
                            property="titleHead">
                            <jb-input
                                style="width: 240px;"
                                v-model="formData.titleHead" />
                        </jb-form-item>
                        <jb-form-item
                            :label="'分隔符'"
                            required
                            property="titleSeparator"
                            class="title-separator-item">
                            <jb-input
                                style="width: 240px;"
                                v-model="formData.titleSeparator" />
                        </jb-form-item>
                        <bk-button
                            text
                            size="small"
                            class="reset"
                            @click="handleRestore">
                            {{ '恢复默认' }}
                        </bk-button>
                    </hgroup>
                    <div class="block-title">
                        <span>{{ '页脚信息设置' }}:</span>
                    </div>
                    <jb-form-item :label="'联系方式'">
                        <jb-input
                            style="width: 680px;"
                            v-model="formData.footerLink" />
                    </jb-form-item>
                    <jb-form-item :label="'版权信息'">
                        <jb-input
                            v-model="formData.footerCopyRight" />
                    </jb-form-item>
                </jb-form>
            </div>
            <template #action>
                <bk-button
                    theme="primary"
                    :loading="isSubmitting"
                    class="w120 mr10"
                    @click="handleSave">{{ '保存' }}</bk-button>
                <bk-button @click="handleReset">{{ '重置' }}</bk-button>
            </template>
        </smart-action>
    </div>
</template>
<script>
       import _ from 'lodash';
    import GlobalSettingService from '@service/global-setting';
    import SmartAction from '@components/smart-action';
    import JbInput from '@components/jb-input';

    const getDefaultData = () => ({
        titleHead: '',
        titleSeparator: '',
        footerLink: '',
        footerCopyRight: '',
    });

    export default {
        name: '',
        components: {
            SmartAction,
            JbInput,
        },
        data () {
            return {
                isLoading: false,
                isSubmitting: false,
                formData: getDefaultData(),
                currentTitleFooter: {},
                defaultTitleFooter: {},
            };
        },
        created () {
            this.fetchTitleAndFooter();
            this.rules = {
                titleHead: [
                    {
                        required: true,
                        message: '平台名称必填',
                        trigger: 'blur',
                    },
                ],
                titleSeparator: [
                    {
                        required: true,
                        message: '分隔符必填',
                        trigger: 'blur',
                    },
                ],
            };
        },
        methods: {
            fetchTitleAndFooter () {
                this.isLoading = true;
                GlobalSettingService.fetchTitleAndFooterConfig()
                    .then((data) => {
                        this.defaultTitleFooter = _.cloneDeep(data.defaultTitleFooter);
                        this.currentTitleFooter = _.cloneDeep(data.currentTitleFooter);
                        this.formData = { ...this.formData, ...data.currentTitleFooter };
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            handleRestore () {
                this.formData = _.cloneDeep(this.defaultTitleFooter);
            },
            handleReset () {
                this.formData = _.cloneDeep(this.currentTitleFooter);
            },
            handleSave () {
                this.$refs.platformForm.validate()
                    .then((validator) => {
                        this.isSubmitting = true;
                        GlobalSettingService.updateTitleAndFooterConfig(this.formData)
                            .then(() => {
                                window.changeAlert = false;
                                this.messageSuccess('保存成功');
                            })
                            .finally(() => {
                                this.isSubmitting = false;
                            });
                    });
            },
        },
    };
</script>
<style lang='postcss'>
    .page-platform-info {
        display: flex;
        justify-content: center;
        padding-top: 10px;
        padding-bottom: 40px;

        .wraper {
            margin-bottom: 10px;
        }

        .backlist {
            margin-top: 38px;

            span {
                border-bottom: 1px dashed #c4c6cc;
            }
        }

        .block-title {
            padding-bottom: 6px;
            margin-bottom: 12px;
        }

        .action-box {
            margin-top: 30px;
        }

        hgroup {
            display: flex;
            justify-content: flex-start;
            align-items: self-start;
            margin-bottom: 20px;

            .bk-label {
                text-align: left;
            }

            .bk-form-item {
                margin-top: 0;
                margin-bottom: 10px;
            }

            .reset {
                margin-top: 4px;
                margin-left: 2px;
            }

            .title-separator-item {
                .bk-label {
                    text-align: right;
                }
            }
        }
    }

    .title-example-popover {
        padding: 20px 10px;
        text-align: center;

        .example-image {
            width: 270px;
            height: 100px;
        }
    }
</style>
