

<template>
    <card-layout
        class="script-ralate-dashboard"
        :title="$t('dashboard.复用率')"
        :title-tips="$t('dashboard.引用脚本的步骤总数 / 被引用的脚本总数（去重），比率越高代表脚本在作业中被重复利用的价值越大')"
        v-bkloading="{ isLoading, opacity: 0.8 }">
        <div class="nums">{{ rate }}</div>
    </card-layout>
</template>
<script>
    import StatisticsService from '@service/statistics';
    import CardLayout from '../card-layout';

    export default {
        name: '',
        components: {
            CardLayout,
        },
        data () {
            return {
                isLoading: true,
                rate: '0 %',
            };
        },
        watch: {
            date () {
                this.fetchData();
            },
        },
        created () {
            this.fetchData();
        },
        methods: {
            fetchData () {
                this.isLoading = true;
                StatisticsService.fetchScriptCiteInfo()
                    .then((data) => {
                        const {
                            citedScriptStepCount,
                            citedScriptCount,
                        } = data;
                        if (citedScriptCount < 1) {
                            this.rate = '0 %';
                        } else {
                            this.rate = `${Math.round(citedScriptStepCount / citedScriptCount * 100).toFixed(2)} %`;
                        }
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },
    };
</script>
<style lang='postcss' scoped>
    .script-ralate-dashboard {
        .nums {
            font-size: 24px;
            font-weight: bold;
            line-height: 32px;
        }
    }
</style>
