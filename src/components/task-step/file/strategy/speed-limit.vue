<template>
    <div class="push-speed-limit">
        <jb-form-item :label="label">
            <div class="speed-limit-wraper">
                <div class="speed-limit-content form-item-content">
                    <bk-checkbox :value="enabled" @change="handleEnableChange">
                        {{ '启用限速' }}
                    </bk-checkbox>
                    <bk-input v-show="enabled" class="speed-limit-input" @change="handleChange" :value="formData[field]">
                        <template slot="append">
                            <div class="group-text">MB/s</div>
                        </template>
                    </bk-input>
                </div>
                <Icon v-show="enabled" type="info" class="tips-flag" v-bk-tooltips="speedLimitTipsConfig" />
            </div>
        </jb-form-item>
        <div id="targetPathTips" class="speed-limit-tips">
            <div class="row">{{ '请根据机器的网卡情况酌情配置速率，以免影响其他服务的正常使用；' }}</div>
            <div class="row">{{ '未开启时，将按 Agent 默认配置规则限速 （Agent会根据机器资源使用情况，有自身保护机制）' }}</div>
        </div>
    </div>
</template>
<script>
   
    export default {
        name: '',
        props: {
            field: {
                type: String,
                required: true,
            },
            label: {
                type: String,
                default: '限速',
            },
            formData: {
                type: Object,
                default: () => ({}),
            },
        },
        data () {
            return {
                enabled: false,
            };
        },
        watch: {
            formData: {
                handler (formData) {
                    if (formData[this.field] > 0) {
                        this.enabled = true;
                    }
                },
                immediate: true,
            },
        },
        created () {
            this.speedLimitTipsConfig = {
                allowHtml: true,
                width: '325px',
                theme: 'light',
                trigger: 'mouseenter',
                content: '#targetPathTips',
                placement: 'right-start',
                delay: [0, 10000000],
            };
        },
        methods: {
            handleEnableChange (enabled) {
                this.enabled = enabled;
                this.$emit('on-change', this.field, enabled ? 10 : 0);
            },
            handleChange (value) {
                this.$emit('on-change', this.field, value);
            },
        },
    };
</script>
<style lang='postcss'>
    .push-speed-limit {
        .bk-label {
            white-space: normal;
        }

        .speed-limit-wraper {
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }

        .speed-limit-content {
            display: flex;
            align-items: center;
            height: 32px;
        }

        .speed-limit-input {
            width: calc(100% - 100px);
            margin-left: auto;
        }

        .tips-flag {
            margin-left: 8px;
            font-size: 14px;
            line-height: 32px;
            color: #c4c6cc;
            cursor: pointer;
        }
    }

    .speed-limit-tips {
        font-size: 12px;
        line-height: 16px;
        color: #63656e;

        .row {
            position: relative;
            padding-left: 12px;

            &::before {
                position: absolute;
                top: 6px;
                left: 0;
                width: 4px;
                height: 4px;
                background: currentColor;
                border-radius: 50%;
                content: "";
            }
        }
    }
</style>
