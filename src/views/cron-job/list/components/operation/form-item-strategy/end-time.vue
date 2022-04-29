

<template>
    <jb-form-item>
        <bk-checkbox :value="isEndTime" @change="handleChange">{{ $t('cron.设置结束时间') }}</bk-checkbox>
        <div v-if="isEndTime">
            <bk-date-picker
                style="width: 100%;"
                :value="formData.endTime"
                :options="dateOptions"
                :transfer="true"
                :clearable="false"
                type="datetime"
                :placeholder="$t('cron.选择日期时间')"
                @change="handleEndTimeChange" />
        </div>
    </jb-form-item>
</template>
<script>
    import {
        prettyDateTimeFormat,
    } from '@utils/assist';

    export default {
        name: '',
        props: {
            formData: {
                type: Object,
                required: true,
            },
        },
        data () {
            return {
                isEndTime: false,
            };
        },
        watch: {
            formData: {
                handler (formData) {
                    if (this.formData.endTime) {
                        this.isEndTime = true;
                    }
                },
                immediate: true,
            },
        },
        created () {
            this.dateOptions = {
                disabledDate (date) {
                    return date.valueOf() < Date.now() - 86400000;
                },
            };
        },
        methods: {
            handleChange (value) {
                this.isEndTime = value;
                const endTime = value ? prettyDateTimeFormat(Date.now() + 86400000) : '';
                this.handleEndTimeChange(endTime);
            },
            handleEndTimeChange (value) {
                this.$emit('on-change', {
                    endTime: value,
                });
            },
        },
    };
</script>
