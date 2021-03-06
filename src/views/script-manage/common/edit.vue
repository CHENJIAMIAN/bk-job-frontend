<template>
    <layout>
        <div slot="title">{{ '编辑脚本' }}</div>
        <template slot="sub-header">
            <Icon
                type="upload"
                @click="handleUploadScript"
                v-bk-tooltips="'上传脚本'"
                v-test="{ type: 'button', value: 'uploadScript' }" />
            <Icon
                type="history"
                @click.stop="handleShowHistory"
                v-bk-tooltips="'历史缓存'"
                v-test="{ type: 'button', value: 'scriptEditHistory' }" />
            <Icon
                type="full-screen"
                v-bk-tooltips="'全屏'"
                @click="handleFullScreen"
                v-test="{ type: 'button', value: 'scriptEditFullscreen' }" />
        </template>
        <div slot="left">
            <jb-form
                ref="form"
                :model="formData"
                :rules="rules"
                form-type="vertical"
                class="edit-script-form"
                v-test="{ type: 'form', value: 'editScript' }">
                <jb-form-item
                    :label="'版本号'"
                    required>
                    <bk-input :value="formData.version" readonly />
                </jb-form-item>
                <jb-form-item :label="'版本日志'">
                    <bk-input
                        v-model="formData.versionDesc"
                        type="textarea"
                        :rows="5"
                        :maxlength="100" />
                </jb-form-item>
            </jb-form>
        </div>
        <div ref="content">
            <ace-editor
                ref="aceEditor"
                v-model="formData.content"
                :lang="formData.typeName"
                :height="contentHeight"
                :readonly="!scriptInfo.isDraft"
                :options="formData.typeName" />
        </div>
        <template #footer>
            <bk-button
                theme="primary"
                :loading="isSubmiting"
                @click="handleSubmit"
                class="w120 mr10"
                v-test="{ type: 'button', value: 'editScriptSubmit' }">
                {{ '提交' }}
            </bk-button>
            <bk-button
                class="mr10"
                @click="handleDebugScript"
                v-test="{ type: 'button', value: 'debugScript' }">
                {{ '调试' }}
            </bk-button>
            <bk-button
                @click="handleCancel"
                v-test="{ type: 'button', value: 'editScriptCancel' }">
                {{ '取消' }}
            </bk-button>
        </template>
    </layout>
</template>
<script>
    import _ from 'lodash';
       import ScriptManageService from '@service/script-manage';
    import PublicScriptManageService from '@service/public-script-manage';
    import AceEditor from '@components/ace-editor';
    import {
        checkPublicScript,
        leaveConfirm,
        getOffset,
        scriptErrorAlert,
    } from '@utils/assist';
    import { debugScriptCache } from '@utils/cache-helper';
    import Layout from './components/layout';

    const genDefaultFormData = () => ({
        id: '',
        name: '',
        scriptVersionId: '',
        typeName: 'Shell',
        version: '',
        versionDesc: '',
        type: 1,
        content: '',
    });

    export default {
        name: '',
        components: {
            AceEditor,
            Layout,
        },
        inheritAttrs: false,
        props: {
            scriptInfo: {
                type: Object,
                required: true,
            },
        },
        data () {
            return {
                isSubmiting: false,
                contentHeight: 0,
                formData: {},
            };
        },
        watch: {
            scriptInfo: {
                handler (scriptInfo) {
                    if (!scriptInfo.id) {
                        return;
                    }
                    const {
                        id,
                        name,
                        scriptVersionId,
                        version,
                        versionDesc,
                        type,
                        typeName,
                        content,
                    } = scriptInfo;

                    this.formData = {
                        ...genDefaultFormData(),
                        id,
                        name,
                        scriptVersionId,
                        version,
                        versionDesc,
                        type,
                        typeName,
                        content,
                    };
                },
                immediate: true,
            },
        },
        created () {
            this.publicScript = checkPublicScript(this.$route);
            this.serviceHandler = this.publicScript ? PublicScriptManageService : ScriptManageService;

            this.rules = {
                content: [
                    {
                        required: true,
                        message: '脚本内容不能为空',
                        trigger: 'change',
                    },
                    {
                        validator: value => ScriptManageService.getScriptValidation({
                            content: value,
                            scriptType: this.formData.type,
                        }).then((data) => {
                            // 高危语句报错状态需要全局保存
                            this.$store.commit('setScriptCheckError', data.some(_ => _.isDangerous));
                            return true;
                        }),
                        message: '脚本内容检测失败',
                        trigger: 'blur',
                    },
                ],
            };

            window.addEventListener('resize', this.init);
            this.$once('hook:beforeDestroy', () => {
                window.removeEventListener('resize', this.init);
            });
        },
        mounted () {
            this.calcContentHeight();
            const handleResize = _.throttle(this.calcContentHeight, 60);
            window.addEventListener('resize', handleResize);
            this.$once('hook:beforeDestroy', () => {
                window.removeEventListener('resize', handleResize);
            });
        },
        methods: {
            /**
             * @desc 计算内容区高度
             */
            calcContentHeight () {
                const contentOffsetTop = getOffset(this.$refs.content).top;
                this.contentHeight = window.innerHeight - contentOffsetTop - 26;
            },
            handleUploadScript () {
                this.$refs.aceEditor.handleUploadScript();
            },
            handleShowHistory () {
                this.$refs.aceEditor.handleShowHistory();
            },
            handleFullScreen () {
                this.$refs.aceEditor.handleFullScreen();
            },
            /**
             * @desc 保存脚本
             */
            handleSubmit () {
                if (!this.formData.content) {
                    this.messageError('脚本内容不能为空');
                    return;
                }
                this.isSubmiting = true;
                Promise.all([
                    // 验证表单
                    this.$refs.form.validate(),
                    // 脚本高危语句检测
                    ScriptManageService.getScriptValidation({
                        content: this.formData.content,
                        scriptType: this.formData.type,
                    }).then((data) => {
                        // 高危语句报错状态需要全局保存
                        this.$store.commit('setScriptCheckError', data.some(_ => _.isDangerous));
                        return true;
                    }),
                ]).then(() => {
                    if (this.$store.state.scriptCheckError) {
                        scriptErrorAlert();
                        return;
                    }
                    this.serviceHandler.scriptUpdate({
                        ...this.formData,
                        scriptVersionId: this.scriptInfo.scriptVersionId,
                    }).then(() => {
                        window.changeAlert = false;
                        this.$emit('on-edit', {
                            scriptVersionId: this.scriptInfo.scriptVersionId,
                        });
                        this.messageSuccess('操作成功');
                    });
                })
                    .finally(() => {
                        this.isSubmiting = false;
                    });
            },
            /**
             * @desc 跳转到快速执行脚本页面调试脚本
             */
            handleDebugScript () {
                debugScriptCache.setItem(this.formData.content);
                const { href } = this.$router.resolve({
                    name: 'fastExecuteScript',
                    query: {
                        model: 'debugScript',
                    },
                });
                window.open(href);
            },
            /**
             * @desc 取消编辑
             */
            handleCancel () {
                leaveConfirm()
                    .then(() => {
                        this.$emit('on-edit-cancel', {
                            scriptVersionId: this.scriptInfo.scriptVersionId,
                        });
                    });
            },
        },
    };
</script>
