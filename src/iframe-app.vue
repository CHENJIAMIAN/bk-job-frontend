<template>
    <div class="iframe-navigation-container" :class="{ loading }">
        <div class="container-header">
            <div id="sitePageTitle" class="container-header-title">
                <router-back mode="iframe" />
                <span>{{ routerTitle }}</span>
                <div id="siteHeaderStatusBar" />
            </div>
        </div>
        <div class="container-content">
            <router-view />
        </div>
    </div>
</template>
<script>
    import RouterBack from '@components/router-back';

    export default {
        name: 'App',
        components: {
            RouterBack,
        },
        data () {
            return {
                loading: true,
                routerTitle: '',
            };
        },
        watch: {
            $route: {
                handler (route) {
                    this.routerTitle = (route.meta.title || route.meta.pageTitle);
                },
                immediate: true,
            },
        },
        /**
         * @desc 页面渲染完成
         *
         * loading用于控制页面切换效果
         */
        mounted () {
            setTimeout(() => {
                this.loading = false;
            }, 100);
        },
    };
</script>
<style lang="postcss" scoped>
    @import "@/css/mixins/scroll";

    .iframe-navigation-container {
        .container-header {
            position: relative;
            z-index: 1999;
            display: flex;
            align-items: center;
            height: 52px;
            padding-left: 20px;
            box-shadow: 0 2px 3px 0 rgb(99 101 110 / 10%);

            .container-header-title {
                display: flex;
                height: 21px;
                font-size: 16px;
                line-height: 21px;
                color: #313238;
                align-items: center;
                flex: 1;
            }
        }

        .container-content {
            position: relative;
            z-index: 1;
            max-height: calc(100vh - 52px);
            padding: 20px 24px 0;
            overflow: auto;
            background: #f5f6fa;

            @mixin scroller;
        }
    }

    #siteHeaderStatusBar {
        display: flex;
    }
</style>
