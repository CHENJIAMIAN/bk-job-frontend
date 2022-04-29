

<template>
    <resizeable-box>
        <div class="script-template-render-variable" v-bkloading="{ isLoading }">
            <scroll-faker theme="dark">
                <div class="title">{{ $t('scriptTemplate.变量列表') }}</div>
                <table class="script-variable-list">
                    <thead>
                        <tr>
                            <td>{{ $t('scriptTemplate.变量名称') }}</td>
                            <td>{{ $t('scriptTemplate.含义') }}</td>
                            <td>{{ $t('scriptTemplate.示例') }}</td>
                        </tr>
                    </thead>
                    <tbody v-for="item in variableList" :key="item.name">
                        <tr>
                            <td>
                                <div
                                    class="variable-name"
                                    @click="handleCopyScriptVariable(`{{${item.name}}}`)">
                                    {{ item.name }}
                                </div>
                            </td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.demo }}</td>
                        </tr>
                    </tbody>
                </table>
            </scroll-faker>
        </div>
    </resizeable-box>
</template>
<script>
    import I18n from '@/i18n';
    import ScriptTemplateService from '@service/script-template';
    import { execCopy } from '@utils/assist';
    import ResizeableBox from './resizeable-box';

    export default {
        components: {
            ResizeableBox,
        },
        inheritAttrs: false,
        data () {
            return {
                isLoading: false,
                variableList: [],
            };
        },
        created () {
            this.fetchVariableList();
        },
        methods: {
            /**
             * @desc 获取变量列表
             */
            fetchVariableList () {
                this.isLoading = true;
                ScriptTemplateService.fetchVaribaleList()
                    .then((data) => {
                        this.variableList = Object.freeze(data);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            /**
             * @desc 复制变量（变量名被 {{}} 包裹）
             */
            handleCopyScriptVariable (variableName) {
                execCopy(variableName, `${I18n.t('scriptTemplate.复制成功')} ${variableName}`);
            },
        },
    };
</script>
<style lang='postcss'>
    .script-template-render-variable {
        height: 100%;
        padding: 16px 20px;
        white-space: nowrap;
        background: #292929;

        .script-variable-list {
            width: 100%;
            margin-top: 16px;
            font-size: 12px;

            thead {
                background: #3a3b3d;
            }

            td {
                height: 32px;
                padding: 0 16px;
            }

            tbody {
                td {
                    border-bottom: 1px solid #4a4a4a;
                }
            }

            .variable-name {
                height: 24px;
                padding-left: 10px;
                margin-left: -10px;
                line-height: 24px;
                cursor: pointer;

                &:hover {
                    background: #3b3c3d;
                }
            }
        }
    }
</style>
