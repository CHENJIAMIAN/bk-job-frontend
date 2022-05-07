

<template>
    <smart-action class="create-script-page" offset-target="bk-form-content">
        <jb-form
            :model="formData"
            :rules="rules"
            v-test="{ type: 'form', value: 'create_script' }"
            ref="form">
            <jb-form-item :label="'脚本名称'" required property="name">
                <div class="script-name input">
                    <jb-input
                        v-model="formData.name"
                        :placeholder="'推荐按照该脚本逻辑提供的使用场景来取名...'"
                        :maxlength="60" />
                </div>
            </jb-form-item>
            <jb-form-item :label="'场景标签'" property="tags">
                <jb-tag-select
                    :placeholder="'标签对资源的分类管理有很大帮助'"
                    class="input"
                    v-model="formData.tags" />
            </jb-form-item>
            <jb-form-item :label="'描述'">
                <bk-input
                    class="input"
                    v-model="formData.description"
                    :placeholder="'在此处标注该脚本的备注和使用说明'"
                    type="textarea"
                    :maxlength="200" />
            </jb-form-item>
            <jb-form-item :label="'版本号'" required property="version">
                <jb-input
                    class="input"
                    v-model="formData.version"
                    :placeholder="'输入版本号'"
                    :maxlength="30" />
            </jb-form-item>
            <jb-form-item :label="'脚本内容'" required property="content">
                <div ref="content">
                    <ace-editor
                        v-model="formData.content"
                        :lang="scriptType"
                        :height="contentHeight"
                        @on-mode-change="handleTypeChange"
                        v-bkloading="{ isLoading: isContentLoading, opacity: .2 }" />
                </div>
            </jb-form-item>
        </jb-form>
        <template #action>
            <bk-button
                class="w120 mr10"
                :loading="isSbumiting"
                theme="primary"
                @click="handleSubmit">
                {{ '提交' }}
            </bk-button>
            <bk-button
                theme="default"
                @click="handleCancel">
                {{ '取消' }}
            </bk-button>
        </template>
    </smart-action>
</template>
<script>
       import ScriptService from '@service/script-manage';
    import PublicScriptService from '@service/public-script-manage';
    import {
        formatScriptTypeValue,
        checkPublicScript,
        getOffset,
        scriptErrorAlert,
    } from '@utils/assist';
    import {
        scriptNameRule,
        scriptVersionRule,
    } from '@utils/validator';
    import JbInput from '@components/jb-input';
    import AceEditor from '@components/ace-editor';
    import JbTagSelect from '@components/jb-tag-select';

    export default {
        name: '',
        components: {
            AceEditor,
            JbTagSelect,
            JbInput,
        },
        data () {
            return {
                isContentLoading: false,
                isSbumiting: false,
                scriptType: 'Shell',
                contentHeight: 480,
                formData: {
                    name: '',
                    tags: [],
                    description: '',
                    version: '',
                    type: 1,
                    content: '',
                },
            };
        },
        created () {
            this.publicScript = checkPublicScript(this.$route);
            this.serviceHandler = this.publicScript ? PublicScriptService : ScriptService;

            this.rules = {
                name: [
                    {
                        required: true,
                        message: '脚本名称必填',
                        trigger: 'blur',
                    },
                    {
                        validator: scriptNameRule.validator,
                        message: scriptNameRule.message,
                        trigger: 'blur',
                    },
                ],
                version: [
                    {
                        required: true,
                        message: '脚本版本必填',
                        trigger: 'blur',
                    },
                    {
                        validator: scriptVersionRule.validator,
                        message: scriptVersionRule.message,
                        trigger: 'blur',
                    },
                ],
                desc: [
                    {
                        max: 200,
                        message: '最多仅可 200个字符',
                        trigger: 'blur',
                    },
                ],
                content: [
                    {
                        required: true,
                        message: '脚本内容不能为空',
                        trigger: 'change',
                    },
                    {
                        validator: value => ScriptService.getScriptValidation({
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
        },
        mounted () {
            this.init();
        },
        methods: {
            /**
             * @desc 计算内容区的高度
             */
            init () {
                const contentOffsetTop = getOffset(this.$refs.content).top;
                const contentHeight = window.innerHeight - contentOffsetTop + 20;
                this.contentHeight = contentHeight > 480 ? contentHeight : 480;
            },
            /**
             * @desc 脚本语言类型切换
             * @param {String} scriptType 脚本语言
             */
            handleTypeChange (scriptType) {
                this.scriptType = scriptType;
                this.formData.type = formatScriptTypeValue(scriptType);
            },
            /**
             * @desc 保存脚本
             */
            handleSubmit () {
                this.isSbumiting = true;
                this.$refs.form.validate()
                    .then(() => {
                        if (this.$store.state.scriptCheckError) {
                            scriptErrorAlert();
                            return;
                        }
                        return this.serviceHandler.scriptUpdate(this.formData)
                            .then((data) => {
                                window.changeAlert = false;
                                this.messageSuccess('操作成功', () => {
                                    this.$router.push({
                                        name: this.publicScript ? 'publicScriptVersion' : 'scriptVersion',
                                        params: {
                                            id: data.id,
                                        },
                                        query: {
                                            scriptVersionId: data.scriptVersionId,
                                        },
                                    });
                                });
                            });
                    })
                    .finally(() => {
                        this.isSbumiting = false;
                    });
            },
            /**
             * @desc 取消新建
             */
            handleCancel () {
                this.routerBack();
            },
            /**
             * @desc 路由回退
             */
            routerBack () {
                if (this.publicScript) {
                    this.$router.push({
                        name: 'publicScriptList',
                    });
                    return;
                }
                this.$router.push({
                    name: 'scriptList',
                });
            },
        },
    };
</script>
<style lang='postcss' scoped>
    .create-script-page {
        .input {
            width: 510px;
            background: #fff;
        }
    }

    .script-name-tips {
        padding-right: 12px;
        font-size: 12px;
        line-height: 16px;
        color: #63656e;

        .row {
            position: relative;
            padding-right: 12px;
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
