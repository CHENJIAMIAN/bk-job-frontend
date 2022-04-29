

<template>
    <div class="page-storage-strategy" v-bkloading="{ isLoading }">
        <div class="wraper">
            <div class="execute-block">
                <div class="block-title">{{ $t('setting.执行历史保留') }}：</div>
                <jb-form ref="form" :model="formData" :rules="rules" form-type="vertical">
                    <jb-form-item property="days">
                        <bk-input v-model="formData.days" type="number" :min="1">
                            <template slot="append">
                                <div class="group-text">{{ $t('setting.天') }}</div>
                            </template>
                        </bk-input>
                    </jb-form-item>
                </jb-form>
            </div>
            <div class="action-box">
                <bk-button
                    class="w120 mr10"
                    theme="primary"
                    :loading="isSubmiting"
                    @click="handleSave">
                    {{ $t('setting.保存') }}
                </bk-button>
                <bk-button @click="handleReset">{{ $t('setting.重置') }}</bk-button>
            </div>
        </div>
    </div>
</template>
<script>
    import I18n from '@/i18n';
    import GlobalSettingService from '@service/global-setting';

    export default {
        name: '',

        data () {
            return {
                isLoading: false,
                isSubmiting: false,
                formData: {
                    days: 0,
                },
            };
        },
        created () {
            this.fetchData();
            this.memoDay = 0;
            this.rules = {
                days: [
                    {
                        validator: value => value >= 1,
                        message: I18n.t('setting.保留天数必须大于0'),
                        trigger: 'blur',
                    },
                ],
            };
        },
        methods: {
            fetchData () {
                this.isLoading = true;
                GlobalSettingService.fetchHistroyExpire()
                    .then((data) => {
                        this.formData.days = data;
                        this.memoDay = data;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            handleSave () {
                this.$refs.form.validate().then(() => {
                    this.isSubmiting = true;
                    GlobalSettingService.updateHistroyExpire({
                        ...this.formData,
                    }).then(() => {
                        this.messageSuccess(I18n.t('setting.设置执行保留时间成功'));
                    })
                        .finally(() => {
                            this.isSubmiting = false;
                        });
                });
            },
            handleReset () {
                this.formData.days = this.memoDay;
            },
        },
    };
</script>
<style lang='postcss'>
    .page-storage-strategy {
        display: flex;
        padding: 40px 0;
        justify-content: center;

        .wraper {
            width: 600px;
        }

        .storage-block {
            margin-bottom: 40px;
        }

        .storage-tips {
            margin-top: 10px;
            font-size: 12px;
            color: #63656e;
        }

        .action-box {
            margin-top: 10px;
        }
    }
</style>
