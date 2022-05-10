<template>
    <div v-if="isShowNotify">
        <jb-form-item>
            <bk-checkbox v-model="isFinishBeforeNotify">{{ '结束前通知' }}</bk-checkbox>
        </jb-form-item>
        <render-strategy v-if="isFinishBeforeNotify" left="55" class="notify-wraper">
            <execute-notify
                v-on="$listeners"
                v-bind="$attrs"
                :form-data="formData"
                :notify-offset-label="'结束前'" />
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
                isFinishBeforeNotify: false,
            };
        },
        computed: {
            isShowNotify () {
                if (!this.formData.endTime) {
                    return false;
                }
                if (this.isFinishBeforeNotify) {
                    return true;
                }
                return true;
            },
        },
        watch: {
            formData: {
                handler (formData) {
                    if (this.formData.notifyOffset
                        || this.formData.notifyChannel.length > 0
                        || this.formData.notifyUser.roleList.length > 0
                        || this.formData.notifyUser.userList.length > 0) {
                        this.isFinishBeforeNotify = true;
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
    }
</style>
