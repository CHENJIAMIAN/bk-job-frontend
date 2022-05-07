
<template>
    <!-- jb-router-view: 某几个页面显示页面指导,骨架图, EventBus接收全局的页面权限提示 -->
    <div class="job-router-view">
        <page-guide v-show="isShowView" />
        <skeleton :visiable="!isShowView" :type="skeletonType" />
        <permission v-if="isNotPermission" :class="{ 'permission-pending': !isShowView }" :auth-result="authResult" />
        <router-view v-if="!isNotPermission" ref="routerView" :class="{ 'view-pending': !isShowView }" />
    </div>
</template>
<script>
    import EventBus from '@utils/event-bus';
    import Skeleton from './skeleton';
    import PageGuide from './guide';
    import Permission from './permission';

    export default {
        name: 'JbRouterView',
        components: {
            Skeleton,
            Permission,
            PageGuide,
        },
        data () {
            return {
                isShowSkeleton: false,
                isShowView: true,
                skeletonType: '',
                isNotPermission: false,
                authResult: {
                    requiredPermissions: [],
                },
            };
        },
        watch: {
            $route: {
                handler () {
                    const { meta = {} } = this.$route;
                    if (Object.prototype.hasOwnProperty.call(meta, 'skeleton')) {
                        this.isShowView = false;
                        this.isShowSkeleton = true;
                        this.skeletonType = meta.skeleton;
                    }
                    
                    this.isNotPermission = false;
                    this.skeletonTimer = '';
                    setTimeout(() => {
                        this.init();
                    });
                },
                immediate: true,
            },
        },
        created () {
            this.pendingStartTime = Date.now();
            EventBus.$on('permission-page', this.permissionHold);
            this.$once('hook:beforeDestroy', () => {
                EventBus.$off('permission-page', this.permissionHold);
            });
        },
        methods: {
            init () {
                if (!this.$refs.routerView || this.$refs.routerView.isSkeletonLoading === undefined) {
                    this.isShowView = true;
                    this.isShowSkeleton = false;
                    return;
                }

                const startPendingTime = Date.now();
                const unWatch = this.$watch(() => {
                    if (!this.$refs.routerView) {
                        return false;
                    }
                    return this.$refs.routerView.isSkeletonLoading;
                }, (isSkeletonLoading) => {
                    if (!isSkeletonLoading) {
                        // 假设300ms后就显示了出来
                        const spaceTime = Date.now() - startPendingTime;
                        const letterTime = 100;
                        this.skeletonTimer = setTimeout(() => {
                            this.isShowView = true;
                            unWatch();
                            // 不足1000ms则补足1000ms
                        }, spaceTime > letterTime ? 0 : letterTime - spaceTime);
                    }
                }, {
                    immediate: true,
                });
                this.$once('hook:beforeDestroy', () => {
                    unWatch();
                    clearTimeout(this.skeletonTimer);
                });
            },
            permissionHold (authResult) {
                this.isNotPermission = true;
                this.authResult = authResult;
            },
        },
    };
</script>
<style lang='postcss'>
    .job-router-view {
        .view-pending {
            max-height: 100%;
            overflow: hidden;
            opacity: 0%;
            visibility: hidden;
        }

        .permission-pending {
            opacity: 0%;
        }
    }
</style>
