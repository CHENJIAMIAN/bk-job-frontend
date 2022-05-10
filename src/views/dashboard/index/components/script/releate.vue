<template>
    <card-layout
        class="script-ralate-dashboard"
        v-bkloading="{ isLoading, opacity: 0.8 }"
        :title="'使用率'"
        :title-tips="'被作业模板引用的脚本总数（去重）/ 脚本总数，比率越高代表脚本在作业的使用率越高'">
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
                            citedScriptCount,
                            scriptCount,
                        } = data;
                        if (scriptCount < 1) {
                            this.rate = '0 %';
                        } else {
                            this.rate = `${Math.round(citedScriptCount / scriptCount * 100).toFixed(2)} %`;
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
