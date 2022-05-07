

<template>
    <div class="sync-plan-script-content">
        <span class="sript-content-text">{{ '查看脚本' }}</span>
        <Icon class="script-content-detail" type="audit" @click="handleView" />
        <div v-if="isShowContent" ref="dialog" class="script-diff-dialog" :style="dialogStyles">
            
            <div class="content-title">
                <div class="content-old">{{ '同步前' }}</div>
                <div class="content-new">{{ '同步后' }}</div>
            </div>
            <div class="content-wraper" v-bkloading="{ isLoading }">
                <scroll-faker>
                    <jb-diff
                        :old-content="oldCode"
                        :new-content="newCode"
                        :format="'side-by-side'"
                        :context="Infinity"
                        theme="dark" />
                </scroll-faker>
            </div>
            <Icon type="close" class="content-close" @click="handleClose" />
        </div>
    </div>
</template>
<script>
    import { Base64 } from 'js-base64';
    import ScriptService from '@service/script-manage';
    import { findParent } from '@utils/vdom';
    import { findStep } from '../../common/utils';

    export default {
        name: '',
        data () {
            return {
                isLoading: true,
                isShowContent: false,
                content: '',
            };
        },
        computed: {
            dialogStyles () {
                return {
                    'z-index': window.__bk_zIndex_manager.nextZIndex(), // eslint-disable-line no-underscore-dangle
                };
            },
        },
        created () {
            const currentStep = findParent(this, 'DiffTaskStep');
            const dataSourceParent = findParent(this, 'SyncPlanStep2');
            const currentPlanStep = findStep(dataSourceParent.planStepList, currentStep.data.realId);
            const currentTemplateStep = findStep(dataSourceParent.templateStepList, currentStep.data.realId);
            
            Promise.all([
                this.fetchContent(currentPlanStep),
                this.fetchContent(currentTemplateStep),
            ]).then(([
                oldCode,
                newCode,
            ]) => {
                this.oldCode = oldCode;
                this.newCode = newCode;
            })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        methods: {
            fetchContent (step) {
                const currentStepData = step.scriptStepInfo;
                if (currentStepData.scriptSource === 1) {
                    return Promise.resolve(Base64.decode(currentStepData.content));
                }
                if (!currentStepData.scriptVersionId) {
                    return Promise.resolve('');
                }
                return ScriptService.versionDetail({
                    id: currentStepData.scriptVersionId,
                }).then(data => Base64.decode(data.content));
            },
            handleView () {
                this.isShowContent = true;
                this.$nextTick(() => {
                    document.body.appendChild(this.$refs.dialog);
                });
            },
            handleClose () {
                if (this.$refs.dialog) {
                    document.body.removeChild(this.$refs.dialog);
                }
                this.isShowContent = false;
            },
        },
    };
</script>
<style lang='postcss'>
    .sync-plan-script-content {
        display: flex;
        align-items: center;
        height: 24px;

        .script-content-detail {
            padding: 4px 5px;
            font-size: 17px;
            color: #3a84ff;
            cursor: pointer;
        }
    }

    .script-diff-dialog {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 9999;
        padding: 0 40px;
        background: #fff;

        .content-title {
            display: flex;
            align-items: center;
            height: 40px;
            line-height: 40px;

            .content-old,
            .content-new {
                flex: 1;
            }
        }

        .content-wraper {
            height: calc(100vh - 40px);
            line-height: initial;
            background: #1d1d1d;
        }

        .content-close {
            position: absolute;
            top: 0;
            right: 0;
            padding: 5px;
            font-size: 30px;
            color: #1d1d1d;
            cursor: pointer;
            transition: all 0.15s;

            &:hover {
                transform: rotateZ(90deg);
            }
        }
    }
</style>
