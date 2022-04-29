

<template>
    <div class="batch-preview-plan-global-variable">
        <template v-for="(list, key) in globalVariableRelatePlanMap">
            <render-related-info
                ref="relate"
                :relate-list="list"
                :latest-value="latestValueMap[key]"
                :key="key" />
        </template>
    </div>
</template>
<script>
    import {
        genGlobalVariableKey,
    } from '../utils';
    import RenderRelatedInfo from './components/render-related-info';
    
    export default {
        name: 'EditPreview',
        components: {
            RenderRelatedInfo,
        },
        props: {
            planList: {
                type: Array,
                required: true,
            },
            latestValueMap: {
                type: Object,
                required: true,
            },
        },
        data () {
            return {
                globalVariableRelatePlanMap: {},
            };
        },
        created () {
            this.relatePlanMap = {};
            this.traverPlanList();
        },
        methods: {
            /**
             * @desc 遍历执行方案全局变量
             */
            traverPlanList () {
                const globalVariableRelatePlanMap = {};
                this.planList.forEach((planData) => {
                    planData.variableList.forEach((variableData) => {
                        const variableKey = genGlobalVariableKey(variableData);
                        const relateData = {
                            plan: planData,
                            globalVariable: variableData,
                        };
                        if (Object.prototype.hasOwnProperty.call(this.latestValueMap, variableKey)) {
                            if (globalVariableRelatePlanMap[variableKey]) {
                                globalVariableRelatePlanMap[variableKey].push(relateData);
                            } else {
                                globalVariableRelatePlanMap[variableKey] = [
                                    relateData,
                                ];
                            }
                            this.relatePlanMap[planData.id] = planData;
                        }
                    });
                });
                
                this.globalVariableRelatePlanMap = Object.freeze(globalVariableRelatePlanMap);
                // 默认站看第一个全局变量的信息
                this.$nextTick(() => {
                    this.$refs.relate[0].handleToggle();
                });
            },
            /**
             * @desc 外部调用，获取需要更新的执行方案
             * @return {Array} 需要更新的执行方案列表
             */
            getRelatePlanList () {
                return Object.values(this.relatePlanMap);
            },
        },
    };
</script>
<style lang='postcss'>
    .batch-preview-plan-global-variable {
        padding-top: 6px;
    }
</style>
