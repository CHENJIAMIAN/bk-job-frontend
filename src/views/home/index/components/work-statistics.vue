

<template>
    <router-link class="work-statistics-box" :to="{ name: link }">
        <div class="work-flag">
            <Icon class="hexagon" type="hexagon" svg />
            <Icon class="statistics" :type="type" svg />
        </div>
        <div class="work-total">
            <slot v-bind:jobNum="jobNum" v-bind:scriptNum="scriptNum" />
        </div>
        <div class="work-name">
            <slot name="name" />
        </div>
    </router-link>
</template>
<script>
    import HomeService from '@service/home';

    export default {
        name: '',
        props: {
            type: {
                type: String,
                default: '',
            },
            link: {
                type: String,
                default: '',
            },
        },
        data () {
            return {
                jobNum: 0,
                scriptNum: 0,
            };
        },
        created () {
            this.fetchStatisticsJobAndScript();
        },
        methods: {
            fetchStatisticsJobAndScript () {
                HomeService.fetchStatisticsJobAndScript()
                    .then(({ jobNum, scriptNum }) => {
                        this.jobNum = jobNum;
                        this.scriptNum = scriptNum;
                    });
            },
        },
    };
</script>
<style lang='postcss'>
    @keyframes hexagon-scale {
        0% {
            transform: scale(0);
        }

        70% {
            transform: scale(1.5);
        }

        80% {
            transform: scale(1.2);
        }

        90% {
            transform: scale(1.4);
        }

        100% {
            transform: scale(1.3);
        }
    }

    .work-statistics-box {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        padding-top: 18px;
        text-align: center;
        cursor: pointer;

        .work-flag {
            position: relative;
            display: flex;
            justify-content: center;
            width: 100px;
            height: 60px;
            margin-bottom: 15px;
        }

        .work-total {
            font-size: 24px;
            font-weight: bold;
            color: #313238;
        }

        .work-name {
            margin-top: 2px;
            color: #979ba5;
        }

        .hexagon {
            font-size: 60px;
            color: #e3edff;
        }

        .statistics {
            position: absolute;
            top: 15px;
            font-size: 30px;
            color: #3a84ff;
        }
    }
</style>
