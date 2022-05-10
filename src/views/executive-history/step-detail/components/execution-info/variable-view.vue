<template>
    <div
        class="step-execute-variable-view"
        v-bkloading="{ isLoading: isLoading, opacity: .1 }">
        <scroll-faker theme="dark">
            <table>
                <thead>
                    <tr>
                        <td style="width: 90px;">{{ '变量名称' }}</td>
                        <td style="width: 90px;">{{ '变量类型' }}</td>
                        <td>{{ '变量值' }}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in variableList" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ item.typeText }}</td>
                        <td class="variable-value">{{ item.value }}</td>
                    </tr>
                </tbody>
            </table>
        </scroll-faker>
    </div>
</template>
<script>
    import TaskExecuteService from '@service/task-execute';
    
    export default {
        name: '',
        inheritAttrs: false,
        props: {
            name: String,
            stepInstanceId: {
                type: Number,
                required: true,
            },
            ip: {
                type: String,
            },
        },
        data () {
            return {
                isLoading: true,
                variableList: [{},{},{}],
            };
        },
        watch: {
            name: {
                handler () {
                    this.isLoading = true;
                    this.fetchStepVariables();
                },
                immediate: true,
            },
        },
        methods: {
            // 步骤使用的变量
            fetchStepVariables () {
                if (!this.ip) {
                    this.isLoading = false;
                    return;
                }
                TaskExecuteService.fetchStepVariables({
                    id: this.stepInstanceId,
                    ip: this.ip,
                }).then((data) => {
                    this.variableList = Object.freeze(data);
                })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },
    };
</script>
<style lang='postcss'>
    .step-execute-variable-view {
        height: 100%;
        padding: 0 20px;
        font-family: Monaco, Menlo, "Ubuntu Mono", Consolas, source-code-pro, monospace;
        color: #c4c6cc;
        white-space: pre-line;

        table {
            width: 100%;
        }

        th,
        td {
            height: 40px;
            padding-right: 10px;
            border-bottom: 1px solid #3b3c42;
        }

        th {
            color: #ccc;
        }

        td {
            color: #979ba5;

            &:first-child {
                white-space: pre;
            }

            &.variable-value {
                word-break: break-word;
            }
        }
    }
</style>
