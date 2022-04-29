

<template>
    <resizeable-box :parent-width="parentWidth" :width="parentWidth / 2">
        <div
            class="script-template-preview-template"
            v-bkloading="{ isLoading }">
            <div class="preview-result">
                <span>{{ $t('scriptTemplate.渲染结果') }}</span>
                <div
                    v-if="needRefresh"
                    class="refresh-flag"
                    @click="handleRefresh">
                    <span class="dot">
                        <Icon type="refresh-2" />
                    </span>
                    <span style="color: #d74242;">{{ $t('scriptTemplate.有更新') }}</span>
                </div>
            </div>
            <div :id="editorId" class="preview-content" />
        </div>
    </resizeable-box>
</template>
<script>
    import _ from 'lodash';
    import { Base64 } from 'js-base64';
    import ScriptTemplateService from '@service/script-template';
    import {
        formatScriptTypeValue,
    } from '@utils/assist';
    import ace from 'ace/ace';
    import ResizeableBox from './resizeable-box';

    const LANG_MAP = {
        Shell: 'sh',
        Bat: 'batchfile',
        Perl: 'perl',
        Python: 'python',
        Powershell: 'powershell',
        SQL: 'sql',
    };

    export default {
        name: '',
        components: {
            ResizeableBox,
        },
        props: {
            parentWidth: {
                type: Number,
                default: window.innerWidth,
            },
            scriptContent: {
                type: String,
                default: '',
            },
            // 当前的脚本语言
            scriptLanguage: {
                type: String,
                required: true,
            },
        },
        data () {
            return {
                isLoading: false,
                needRefresh: false,
            };
        },
        computed: {
            mode () {
                return `ace/mode/${LANG_MAP[this.scriptLanguage]}`;
            },
        },
        watch: {
            scriptContent: {
                handler () {
                    if (this.hasRendered) {
                        this.needRefresh = true;
                        return;
                    }
                    this.fetchRenderScript();
                },
                immediate: true,
            },
            scriptLanguage () {
                setTimeout(() => {
                    this.editor.getSession().setMode(this.mode);
                });
            },
        },
        created () {
            this.hasRendered = false;
            this.editorId = `scriptTemplatePrevice${_.random(1, 1000)}_${Date.now()}`;
        },
        mounted () {
            this.initEditor();
        },
        methods: {
            /**
             * 初始化脚本编辑器
             */
            initEditor () {
                const editor = ace.edit(this.editorId);
                editor.getSession().setMode(this.mode);
                editor.setOptions({
                    fontSize: 13,
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    wrapBehavioursEnabled: true,
                    autoScrollEditorIntoView: true,
                    copyWithEmptySelection: true,
                    useElasticTabstops: true,
                    printMarginColumn: true,
                    printMargin: 80,
                    scrollPastEnd: 0.2,
                });
                editor.setTheme('ace/theme/monokai');
                editor.setShowPrintMargin(false);
                editor.$blockScrolling = Infinity;
                editor.setReadOnly(true);
                
                // 先保存 editor 在设置 value
                editor.scrollToLine(Infinity);
                editor.setValue('');
                editor.clearSelection();
                this.editor = editor;
                this.$once('hook:beforeDestroy', () => {
                    editor.destroy();
                    editor.container.remove();
                });
            },
            /**
             * @desc 预览脚本模板
             */
            fetchRenderScript () {
                this.isLoading = true;
                ScriptTemplateService.fetchRenderScript({
                    scriptContent: this.scriptContent,
                    scriptLanguage: formatScriptTypeValue(this.scriptLanguage),
                }).then((data) => {
                    this.editor.setValue(Base64.decode(data.scriptContent));
                    this.editor.clearSelection();
                })
                    .finally(() => {
                        this.isLoading = false;
                        this.hasRendered = true;
                        this.needRefresh = false;
                    });
            },
            /**
             * @desc 有更新，重新预览脚本模板
             */
            handleRefresh () {
                this.fetchRenderScript();
            },
        },
    };
</script>
<style lang='postcss'>
    .script-template-preview-template {
        position: relative;
        z-index: 0;
        height: 100%;
        background: #292929;

        .preview-content {
            height: calc(100% - 51px);
            /* stylelint-disable selector-class-pattern */
            &.ace_editor {
                background: #292929;

                .ace_gutter {
                    background: #292929;
                }
            }
        }

        .preview-result {
            display: flex;
            align-items: flex-end;
            padding: 16px 20px;
            font-size: 14px;
            line-height: 19px;
            color: #c4c6cc;

            .refresh-flag {
                display: flex;
                margin-left: 9px;
                font-size: 12px;
                cursor: pointer;

                .dot {
                    position: relative;
                    margin-right: 8px;
                    font-size: 14px;

                    &::after {
                        position: absolute;
                        top: 6px;
                        right: -3px;
                        width: 4px;
                        height: 4px;
                        background: #d74242;
                        border-radius: 50%;
                        content: "";
                    }
                }
            }
        }
    }
</style>
