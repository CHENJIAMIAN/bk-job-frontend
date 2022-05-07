
<template>
    <smart-action offset-target="bk-form-content">
        <div class="notify-message-page">
            <bk-collapse v-if="!isLoading" :value="'1'">
                <notify-collapse-item
                    v-for="item in triggerTypeList"
                    :key="item.code"
                    :name="item.code"
                    :active="'1'"
                >
                    trigger-title
                    <span class="trigger-title">{{ item.name }}</span>
                    <trigger-setting
                        slot="content"
                        ref="setting"
                        :type="item.code"
                        :data="formData[item.code]"
                        :template-data="templateData" />
                </notify-collapse-item>
            </bk-collapse>
        </div>
        <template #action>
            <div class="action-wrapper">
                <bk-button
                    class="w120 mr10"
                    theme="primary"
                    
                    :loading="isSubmiting"
                    @click="handleSave">
                    {{ '保存' }}
                </bk-button>
                <bk-button
                    
                    @click="handleCancel">
                    {{ '重置' }}
                </bk-button>
            </div>
        </template>
    </smart-action>
</template>
<script>
       import NotifyService from '@service/notify';
    import NotifyCollapseItem from './components/notify-collapse-item';
    import TriggerSetting from './components/trigger-setting';

    export default {
        components: {
            NotifyCollapseItem,
            TriggerSetting,
        },
        data () {
            return {
                isLoading: true,
                isSubmiting: false,
                activeResult: [],
                templateData: {},
                formData: {},
            };
        },
        computed: {
            /**
             * @desc 页面输入骨架片 loading
             * @returns { Boolean }
             */
            isSkeletonLoading () {
                return this.isLoading;
            },
        },
        created () {
            this.isLoading = true;
            Promise.all([
                this.fetchPageTemplate(),
                this.fetchPoliciesList(),
            ]).finally(() => {
                this.isLoading = false;
            });
        },
        methods: {
            /**
             * @desc 获取页面数据
             */
            fetchPageTemplate () {
                // return NotifyService.fetchPageTemplate()
                //     .then((data) => {
                const {
                    triggerTypeList = [{}, {}, {}],
                    availableNotifyChannelList = [{}, {}, {}],
                    executeStatusList = [{}, {}, {}],
                    resourceTypeList = [{}, {}, {}],
                    roleList = [{}, {}, {}],
                } = {};
                this.triggerTypeList = Object.freeze(triggerTypeList);
                this.templateData = Object.freeze({
                    availableNotifyChannelList,
                    executeStatusList,
                    resourceTypeList,
                    roleList,
                });
                this.activeResult = triggerTypeList.map(({ code }) => code);
                // });
            },
            /**
             * @desc 获取消息通知配置的值
             */
            fetchPoliciesList () {
                // return NotifyService.fetchPoliciesList()
                //     .then((data) => {
                const triggerPoliciesData = [].reduce((result, item) => {
                    const {
                        extraObserverList = [],
                        resourceStatusChannelMap = [],
                        resourceTypeList = [],
                        roleList = [],
                        triggerType = [],
                    } = item;
                    result[triggerType] = {
                        extraObserverList,
                        resourceStatusChannelMap,
                        resourceTypeList,
                        roleList,
                    };
                    return result;
                }, {});
                this.formData = Object.freeze(triggerPoliciesData);
                // });
            },
            /**
             * @desc 保存
             */
            handleSave () {
                this.isSubmiting = true;
                const triggerPoliciesList = this.$refs.setting.map(settingItem => settingItem.getValue());
                NotifyService.defaultPoliciesUpdate({
                    triggerPoliciesList,
                }).then(() => {
                    this.messageSuccess('保存成功');
                    return this.fetchPoliciesList();
                })
                    .finally(() => {
                        this.isSubmiting = false;
                    });
            },
            /**
             * @desc 重置
             */
            handleCancel () {
                this.$refs.setting.forEach(item => item.reset());
            },
        },
    };
</script>
<style lang="postcss" scoped>
    .notify-message-page {
        margin-bottom: 24px;

        .bk-collapse {
            border-bottom: none;
        }
    }
</style>
