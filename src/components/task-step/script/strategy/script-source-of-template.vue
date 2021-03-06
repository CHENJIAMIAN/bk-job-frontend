<template>
    <div class="script-source-of-template">
        <jb-form-item class="script-source-item" :label="'脚本来源'" required>
            <bk-radio-group @change="handleScriptSourceChange" :value="sourceType">
                <bk-radio-button value="local">{{ '手工录入' }}</bk-radio-button>
                <bk-radio-button value="refer">{{ '脚本引用' }}</bk-radio-button>
            </bk-radio-group>
        </jb-form-item>
        <jb-form-item
            ref="scriptId"
            :label="'脚本引用'"
            v-show="isScriptRefer"
            required
            property="scriptId"
            :rules="rules">
            <div class="refer-script-item">
                <compose-form-item class="form-item-content" type="select">
                    <bk-select
                        style="width: 120px;"
                        @change="handleReferScriptTypeChange"
                        :value="referType"
                        :clearable="false">
                        <bk-option
                            :id="2"
                            :name="'业务脚本'">
                            {{ '业务脚本' }}
                        </bk-option>
                        <bk-option
                            :id="3"
                            :name="'公共脚本'">
                            {{ '公共脚本' }}
                        </bk-option>
                    </bk-select>
                    <bk-select
                        :placeholder="'选择引用脚本'"
                        style="width: 375px;"
                        :value="formData[scriptVersionIdField]"
                        @change="handleScriptVersionIdChange"
                        :clearable="false"
                        searchable>
                        <component
                            :is="scriptGroupComponent"
                            v-for="(group, index) in scriptListDisplay"
                            :name="index === 0 ? '当前脚本' : '其它脚本'"
                            :key="index">
                            <auth-option
                                v-for="(option, itemIndex) in group"
                                :key="`${option.scriptVersionId}_${itemIndex}`"
                                :id="option.scriptVersionId"
                                :name="option.name"
                                :permission="option.canView"
                                :resource-id="option.id"
                                :auth="authView" />
                        </component>
                        <template slot="extension">
                            <auth-component :auth="authCreate">
                                <div @click="handleGoCreate" style="cursor: pointer;">
                                    <i class="bk-icon icon-plus-circle mr10" />{{ newBtnText }}
                                </div>
                                <div slot="forbid">
                                    <i class="bk-icon icon-plus-circle mr10" />{{ newBtnText }}
                                </div>
                            </auth-component>
                        </template>
                    </bk-select>
                </compose-form-item>
                <Icon
                    v-if="formData[scriptStatusField]"
                    type="script-update"
                    class="update-flag"
                    :tippy-tips="'引用脚本待更新'" />
                <div
                    v-if="formData[scriptVersionIdField]"
                    class="refer-script-detail"
                    :tippy-tips="'脚本详情'"
                    @click="handleGoScriptDetail">
                    <Icon type="jump" />
                </div>
            </div>
        </jb-form-item>
    </div>
</template>
<script>
    import _ from 'lodash';
       import ScriptManageService from '@service/script-manage';
    import PublicScriptManageService from '@service/public-script-manage';
    import TaskStepModel from '@model/task/task-step';
    import ComposeFormItem from '@components/compose-form-item';

    export default {
        components: {
            ComposeFormItem,
        },
        props: {
            // 脚本来源字段名
            scriptSourceField: {
                type: String,
                required: true,
            },
            // 脚本id字段名
            scriptIdField: {
                type: String,
                required: true,
            },
            // 脚本版本id字段名
            scriptVersionIdField: {
                type: String,
            },
            // 脚本内容字段名
            contentField: {
                type: String,
                required: true,
            },
            languageField: {
                type: String,
                required: true,
            },
            // 脚本语言字段名
            scriptStatusField: {
                type: String,
                required: true,
            },
            formData: {
                type: Object,
                default: () => ({}),
            },
        },
        data () {
            return {
                defaultScript: {},
                scriptGroup: [],
                publicScriptGroup: [],
                sourceType: 'local',
                referType: 2,
            };
        },
        computed: {
            /**
             * @desc 使用脚本资源需要的权限
             */
            authView () {
                return this.formData[this.scriptSourceField] === TaskStepModel.scriptStep.TYPE_SOURCE_BUSINESS
                    ? 'script/view'
                    : 'public_script/view';
            },
            /**
             * @desc 脚本新建的权限
             * @returns { String }
             */
            authCreate () {
                return this.formData[this.scriptSourceField] === TaskStepModel.scriptStep.TYPE_SOURCE_BUSINESS
                    ? 'script/create'
                    : 'public_script/create';
            },
            /**
             * @desc 脚本下拉列表显示格式
             * @returns { String }
             */
            scriptGroupComponent () {
                if (this.scriptListDisplay.length > 1) {
                    return 'bk-option-group';
                }
                return 'div';
            },
            /**
             * @desc 引用脚本类型
             * @returns { Boolean }
             */
            isScriptRefer () {
                return this.sourceType === 'refer';
            },
            /**
             * @desc 脚本列表
             * @returns { Array }
             */
            scriptListDisplay () {
                const scriptSource = this.formData[this.scriptSourceField];
                
                if (scriptSource === TaskStepModel.scriptStep.TYPE_SOURCE_BUSINESS) {
                    return this.scriptGroup;
                }
                if (scriptSource === TaskStepModel.scriptStep.TYPE_SOURCE_PUBLIC) {
                    return this.publicScriptGroup;
                }
                return [];
            },
            /**
             * @desc 按钮的文本
             * @returns { String }
             */
            newBtnText () {
                return this.formData[this.scriptSourceField] === TaskStepModel.scriptStep.TYPE_SOURCE_BUSINESS
                    ? '新建业务脚本'
                    : '新建公共脚本';
            },
            /**
             * @desc 表单想验证规则
             * @returns { Array }
             *
             * 引用类型的脚本时 scriptId 不能为空
             */
            rules () {
                if (this.isScriptRefer) {
                    return [{
                        required: true,
                        message: '请选择引用脚本',
                        trigger: 'blur',
                    }];
                }
                return [];
            },
        },
        watch: {
            formData: {
                handler () {
                    this.initScriptSource();
                },
                immediate: true,
            },
            'formData.scriptId' (value) {
                if (value) {
                    this.$refs.scriptId.clearValidator();
                }
            },
        },
        created () {
            this.scriptListMemo = [];
            this.publicScriptListMemo = [];
            this.initScriptContent();
            this.fetchScriptList();
            this.fetchPublicScriptList();
        },
        methods: {
            /**
             * @desc 获取业务脚本列表
             */
            fetchScriptList () {
                ScriptManageService.getOnlineScriptList()
                    .then((data) => {
                        this.scriptGroup = [data];
                        this.scriptListMemo = data;
                        this.composeGroup();
                    });
            },
            /**
             * @desc 获公共脚本列表
             */
            fetchPublicScriptList () {
                PublicScriptManageService.getOnlineScriptList()
                    .then((data) => {
                        this.publicScriptGroup = [data];
                        this.publicScriptListMemo = data;
                        this.composeGroup();
                    });
            },
            /**
             * @desc 获取指定的脚本版本数据
             * @param {Object} params 脚本数据
             */
            fetchScriptVersionDetail (params) {
                return ScriptManageService.versionDetail(params);
            },
            /**
             * @desc 初始化脚本来源
             */
            initScriptSource () {
                if (this.formData[this.scriptSourceField] === TaskStepModel.scriptStep.TYPE_SOURCE_LOCAL) {
                    this.sourceType = 'local';
                    return;
                }
                this.sourceType = 'refer';
                // 如果是引用脚本，还需初始化引用类型
                this.referType = this.formData[this.scriptSourceField];
            },
            /**
             * @desc 初始化脚本内容
             */
            initScriptContent () {
                // 有默认的脚本版本，获取对应版本的脚本内容
                if (!this.formData[this.scriptIdField] && !this.formData[this.scriptVersionIdField]) {
                    return;
                }
                this.$emit('on-reset', {
                    isScriptContentLoading: true,
                });
                this.fetchScriptVersionDetail({
                    id: this.formData[this.scriptVersionIdField],
                }).then((script) => {
                    const { content, publicScript } = script;
                    const scriptSource = publicScript
                        ? TaskStepModel.scriptStep.TYPE_SOURCE_PUBLIC
                        : TaskStepModel.scriptStep.TYPE_SOURCE_BUSINESS;
                    this.defaultScript = script;
                    this.composeGroup();
                    this.$emit('on-reset', {
                        [this.contentField]: content,
                        [this.scriptSourceField]: scriptSource,
                    });
                })
                    .finally(() => {
                        this.$emit('on-reset', {
                            isScriptContentLoading: false,
                        });
                    });
            },
            /**
             * @desc 脚本版本有更新时需要将最新的脚本版本组合到脚本列表中
             */
            composeGroup () {
                if (!this.defaultScript.id) {
                    return;
                }
                const { publicScript } = this.defaultScript;
                const targetList = publicScript
                    ? _.cloneDeep(this.publicScriptListMemo)
                    : _.cloneDeep(this.scriptListMemo);
                if (targetList.length < 1) {
                    return;
                }
                if (!this.formData[this.scriptStatusField]) {
                    this.scriptGroup = Object.freeze([this.scriptListMemo]);
                    this.publicScriptGroup = Object.freeze([this.publicScriptListMemo]);
                    return;
                }
                const currentScriptList = [];
                const oldVersionScript = {
                    ...this.defaultScript,
                    name: `${this.defaultScript.name}（${'当前版本'}）`,
                };
                currentScriptList.push(oldVersionScript);
                const [newVersionScript] = _.remove(targetList, item => item.id === oldVersionScript.id);
                if (newVersionScript) {
                    newVersionScript.name = `${newVersionScript.name}（${'新版本'}）`;
                    currentScriptList.unshift(newVersionScript);
                }
                
                if (publicScript) {
                    this.scriptGroup = Object.freeze([this.scriptListMemo]);
                    this.publicScriptGroup = Object.freeze([currentScriptList, targetList]);
                } else {
                    this.scriptGroup = Object.freeze([currentScriptList, targetList]);
                    this.publicScriptGroup = Object.freeze([this.publicScriptListMemo]);
                }
            },
            /**
             * @desc 更新脚本来源
             * @param {String} source 脚本来源
             */
            handleScriptSourceChange (source) {
                // 脚本来源改变重置脚本相关的信息
                const scriptSource = source === 'local'
                    ? TaskStepModel.scriptStep.TYPE_SOURCE_LOCAL
                    : TaskStepModel.scriptStep.TYPE_SOURCE_BUSINESS;
                this.$emit('on-reset', {
                    [this.scriptIdField]: '',
                    [this.scriptVersionIdField]: '',
                    [this.scriptSourceField]: scriptSource,
                });
            },
            /**
             * @desc 更新脚本引用来源类型
             * @param {String} scriptSource 脚本引用来源类型
             */
            handleReferScriptTypeChange (scriptSource) {
                this.$emit('on-reset', {
                    [this.scriptSourceField]: scriptSource,
                    [this.scriptIdField]: '',
                    [this.scriptVersionIdField]: '',
                });
            },
            /**
             * @desc 更新脚本引用版本
             * @param {String} scriptVersionId 脚本引用来源类型
             */
            handleScriptVersionIdChange (scriptVersionId) {
                if (!scriptVersionId) {
                    return;
                }
                this.$emit('on-reset', {
                    isScriptContentLoading: true,
                });
                this.fetchScriptVersionDetail({
                    id: scriptVersionId,
                }).then(({ id, type, content }) => {
                    this.$emit('on-reset', {
                        [this.scriptIdField]: id,
                        [this.contentField]: content,
                        [this.languageField]: type,
                        [this.scriptVersionIdField]: scriptVersionId,
                        [this.scriptStatusField]: 0,
                        isScriptContentLoading: false,
                    });
                })
                    .finally(() => {
                        this.$emit('on-reset', {
                            isScriptContentLoading: false,
                        });
                    });
            },
            /**
             * @desc 跳转到选择的脚本版本详情
             */
            handleGoScriptDetail () {
                const routerName = this.formData[this.scriptSourceField] === TaskStepModel.scriptStep.TYPE_SOURCE_PUBLIC
                    ? 'publicScriptVersion'
                    : 'scriptVersion';

                const router = this.$router.resolve({
                    name: routerName,
                    params: {
                        id: this.formData[this.scriptIdField],
                    },
                    query: {
                        scriptVersionId: this.formData[this.scriptVersionIdField],
                    },
                });
                window.open(router.href);
            },
            /**
             * @desc 跳转新建脚本页面
             */
            handleGoCreate () {
                const routerName = this.formData[this.scriptSourceField] === TaskStepModel.scriptStep.TYPE_SOURCE_PUBLIC
                    ? 'createPublicScript'
                    : 'createScript';

                const { href } = this.$router.resolve({
                    name: routerName,
                });
                
                window.open(href);
            },
        },
    };
</script>
<style lang='postcss'>
    .script-source-of-template {
        .script-source-item {
            .bk-radio-button-text {
                width: 120px;
                text-align: center;
            }
        }

        .update-flag {
            margin-left: 4px;
            color: #ff5656;
        }

        .refer-script-item {
            position: relative;
            display: flex;
            align-items: center;

            .refer-script-detail {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 4px;
                font-size: 16px;
                color: #3a84ff;
                cursor: pointer;
            }
        }
    }
</style>
