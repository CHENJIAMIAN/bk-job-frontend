

<template>
    <div>
        <jb-form-item>
            <bk-checkbox v-model="executeBeforeNotify">{{ $t('cron.执行前通知') }}</bk-checkbox>
        </jb-form-item>
        <render-strategy v-if="executeBeforeNotify" left="55" class="notify-wraper">
            <execute-notify
                v-on="$listeners"
                v-bind="$attrs"
                mode="execute-beofre"
                :form-data="formData"
                :notify-offset-label="$t('cron.执行前')" />
        </render-strategy>
    </div>
</template>
<script>
    import RenderStrategy from '../../render-strategy';
    import ExecuteNotify from '../execute-notify';

    export default {
        name: '',
        components: {
            RenderStrategy,
            ExecuteNotify,
        },
        props: {
            formData: {
                type: Object,
                required: true,
            },
        },
        data () {
            return {
                executeBeforeNotify: false,
            };
        },
        watch: {
            formData: {
                handler (formData) {
                    if (this.formData.notifyOffset
                        || this.formData.notifyChannel.length > 0
                        || this.formData.notifyUser.roleList.length > 0
                        || this.formData.notifyUser.userList.length > 0) {
                        this.executeBeforeNotify = true;
                    }
                },
                immediate: true,
            },
        },
    };
</script>
<style lang="postcss">
    .notify-wraper {
        margin-top: -20px !important;
        margin-bottom: 20px;
    }
</style>
