<template>
    <Layout class="job-site" :class="{ loading }">
        <template #back>
            <router-back />
        </template>
        <template slot="headerRight">
            <bk-popover
                theme="light site-header-dropdown"
                style="margin-right: 8px;"
                :arrow="false">
                <div class="flag-box">
                    <Icon
                        id="siteLocal"
                        class="lang-flag"
                        :type="currentLangType" />
                </div>
                <div slot="content">
                    <div
                        class="item"
                        :class="{ active: currentLangType === 'lang-en' }"
                        @click="handleToggleLang('en')">
                        <Icon class="lang-flag" type="lang-en" />
                        <span>English</span>
                    </div>
                    <div
                        class="item"
                        :class="{ active: currentLangType === 'lang-zh' }"
                        @click="handleToggleLang('zh-CN')">
                        <Icon class="lang-flag" type="lang-zh" />
                        <span>中文</span>
                    </div>
                </div>
            </bk-popover>
            <bk-popover theme="light site-header-dropdown" style="margin-right: 14px;" :arrow="false">
                <div class="flag-box">
                    <Icon id="siteHelp" type="help-document-fill" />
                </div>
                <div slot="content">
                    <div class="item" @click="handleLocationDocument">{{ '产品文档' }}</div>
                    <div class="item" @click="handleShowSystemLog">{{ '版本日志' }}</div>
                    <div class="item" @click="handleLocationFeedback">{{ '问题反馈' }}</div>
                </div>
            </bk-popover>
            <bk-popover theme="light site-header-dropdown" :arrow="false">
                <div class="user-flag">
                    <span style="margin-right: 5px;">{{ currentUser.username }}</span>
                    <i class="bk-icon icon-down-shape" />
                </div>
                <template slot="content">
                    <div
                        class="item"
                        @click="handleLogout">
                        {{ '退出登录' }}
                    </div>
                </template>
            </bk-popover>
        </template>
        <router-view />
        <!-- <system-log v-model="showSystemLog" /> -->
    </Layout>
</template>
<script>
    import Cookie from 'js-cookie';
    import UserService from '@service/user';
    import QueryGlobalSettingService from '@service/query-global-setting';
    import LogoutService from '@service/logout';
    import EventBus from '@utils/event-bus';
    import RouterBack from '@components/router-back';
    import SystemLog from '@components/system-log';
    import Layout from './layout-new';

    export default {
        name: 'App',
        components: {
            Layout,
            RouterBack,
            SystemLog,
        },
        
        data () {
            return {
                loading: true,
                titleConfig: {
                    titleHead: '',
                    titleSeparator: '',
                },
                currentUser: {},
                appList: [{},{},{}],
                showSystemLog: false,
                relatedSystemUrls: {},
            };
        },
        computed: {
            currentLangType () {
                if ('zh-CN' === 'en-US') {
                    return 'lang-en';
                }
                return 'lang-zh';
            },
        },
        watch: {
            '$route' () {
                this.updateDocumentTitle();
            },
        },
        /**
         * @desc 获取系统信息
         */
        created () {
            this.fetchUserInfo();
            this.fetchTitleConfig();
            this.fetchRelatedSystemUrls();
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
        methods: {
            /**
             * @desc 获取登陆用户信息
             */
            fetchUserInfo () {
                UserService.fetchUserInfo()
                    .then((data) => {
                        this.currentUser = Object.freeze(data);
                    });
            },
            /**
             * @desc 获取系统title自定义配置
             */
            fetchTitleConfig () {
                QueryGlobalSettingService.fetchTitleConfig()
                    .then((data) => {
                        this.titleConfig = data;
                    })
                    .catch(() => {
                        this.titleConfig = {
                            titleHead: '蓝鲸作业平台',
                            titleSeparator: '|',
                        };
                    })
                    .finally(() => {
                        this.updateDocumentTitle();
                    });
            },
            /**
             * @desc 获取系统关联的外链
             */
            fetchRelatedSystemUrls () {
                QueryGlobalSettingService.fetchRelatedSystemUrls()
                    .then((data) => {
                        this.relatedSystemUrls = Object.freeze(data);
                    });
            },
            /**
             * @desc 更新网站title
             */
            updateDocumentTitle () {
                const { matched } = this.$route;
                let title = this.titleConfig.titleHead;
                matched.forEach((matcheRoute) => {
                    if (matcheRoute.meta.title) {
                        title = `${title} ${this.titleConfig.titleSeparator} ${matcheRoute.meta.title}`;
                    }
                });
        
                document.title = title;
            },
            /**
             * @desc 切换语言
             * @param {String} lang 语言类型
             */
            handleToggleLang (lang) {
                Cookie.set('blueking_language', lang, {
                    expires: 3600,
                    domain: window.location.hostname.replace(/.*(\.[^.]+\.[^.]+$)/, '$1'),
                });
            },
            /**
             * @desc 显示版本更新日志
             */
            handleShowSystemLog () {
                this.showSystemLog = true;
            },
            /**
             * @desc 打开产品文档
             */
            handleLocationDocument () {
                if (!this.relatedSystemUrls.BK_DOC_JOB_ROOT_URL) {
                    this.messageError('网络错误，请刷新页面重试');
                    return;
                }
                window.open(this.relatedSystemUrls.BK_DOC_JOB_ROOT_URL);
            },
            /**
             * @desc 打开问题反馈
             */
            handleLocationFeedback () {
                if (!this.relatedSystemUrls.BK_FEED_BACK_ROOT_URL) {
                    this.messageError('网络错误，请刷新页面重试');
                    return;
                }
                window.open(this.relatedSystemUrls.BK_FEED_BACK_ROOT_URL);
            },
            /**
             * @desc 退出登录
             */
            handleLogout () {
                this.$bkInfo({
                    title: '确认退出登录？',
                    confirmFn: () => {
                        EventBus.$emit('logout');
                        LogoutService.logout();
                    },
                });
            },
        },
    };
</script>
<style lang="postcss">
    .job-site {
        opacity: 100%;

        &.loading {
            opacity: 0%;
        }

        .flag-box {
            position: relative;
            display: inline-flex;
            width: 32px;
            height: 32px;
            font-size: 16px;
            color: #979ba5;
            cursor: pointer;
            border-radius: 50%;
            transition: background 0.15s;
            align-items: center;
            justify-content: center;

            &:hover {
                z-index: 1;
                color: #3a84ff;
                background: #f0f1f5;
            }
        }

        .user-flag {
            display: flex;
            height: 32px;
            font-size: 12px;
            color: #c4c6cc;
            cursor: pointer;
            align-items: center;

            &:hover {
                color: #3a84ff;
            }
        }
    }

    .site-header-dropdown-theme {
        padding-right: 0 !important;
        padding-left: 0 !important;

        .item {
            display: flex;
            height: 32px;
            padding: 0 16px;
            font-size: 12px;
            color: #63656e;
            cursor: pointer;
            align-items: center;

            &.active,
            &:hover {
                color: #3a84ff;
                background-color: #eaf3ff;
            }
        }

        .lang-flag {
            margin-right: 4px;
            font-size: 20px;
        }
    }
</style>
