
import PermissionCheckService from '@service/permission-check';
import {
    permissionDialog,
} from '@/common/bkmagic';
import './style.css';

export default {
    props: {
        permission: {
            type: [Boolean, String],
            default: '',
        },
        auth: {
            type: String,
            required: true,
        },
        resourceId: {
            type: [
                Number, String,
            ],
        },
        scopeType: String,
        scopeId: String,
    },
    data () {
        return {
            hasPermission: false,
        };
    },
    computed: {
        showRaw () {
            if (this.permission) {
                return true;
            }
            if (this.hasPermission) {
                return true;
            }
            return false;
        },
    },
    watch: {
        // resourceId (resourceId) {
        //     if (!resourceId) {
        //         return;
        //     }
        //     this.checkPermission();
        // },
    },
    created () {
        // this.checkPermission();
        this.authResult = {};
    },
    methods: {
    /**
         * @desc 主动鉴权，指定资源和资源权限
        */
        fetchPermission () {
            this.isLoading = true;
            PermissionCheckService.fetchPermission({
                operation: this.auth,
                resourceId: this.resourceId,
                // appId: window.PROJECT_CONFIG.APP_ID,
                scopeType: window.PROJECT_CONFIG.SCOPE_TYPE,
                scopeId: window.PROJECT_CONFIG.SCOPE_ID,
                returnPermissionDetail: true,
            })
                .then((data) => {
                    this.hasPermission = data.pass;
                    this.authResult = data;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        /**
         * @desc 判断预鉴权逻辑
        */
        checkPermission () {
            if (this.permission === '' && this.auth) {
                this.fetchPermission();
            }
        },
        /**
         * @desc 无权限时弹框提示资源权限申请
        */
        handleCheckPermission (event) {
            event.stopPropagation();
            permissionDialog({
                operation: this.auth,
                resourceId: this.resourceId,
                scopeType: this.scopeType,
                scopeId: this.scopeId,
            }, this.authResult);
        },
    },
    
    render (h) {
        if (this.$slots.default) {
            return this.$slots.default[0];
        }
        
        // if (this.showRaw) {
        //     if (this.$slots.default) {
        //         return this.$slots.default[0];
        //     }
        // }
        // if (this.$slots.forbid) {
        //     return h('div', {
        //         class: {
        //             'component-permission-disabled': true,
        //         },
        //         on: {
        //             click: this.handleCheckPermission,
        //         },
        //         directives: [
        //             {
        //                 name: 'cursor',
        //             },
        //         ],
        //     }, this.$slots.forbid);
        // }
        // return this._e(); // eslint-disable-line no-underscore-dangle
    },
};
