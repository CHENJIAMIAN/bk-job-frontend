<template>
    <div v-bkloading="{ isLoading }">
        <jb-form
            ref="whiteIpForm"
            form-type="vertical"
            :model="formData"
            :rules="rules">
            <jb-form-item :label="'目标业务'">
                <div class="app-wraper">
                    <bk-select
                        v-model="scopeLocalKeyList"
                        class="app-select"
                        :clearable="false"
                        multiple
                        searchable>
                        <bk-option
                            v-for="option in appList"
                            :key="option.localKey"
                            :id="option.localKey"
                            :name="option.name" />
                    </bk-select>
                </div>
            </jb-form-item>
            <jb-form-item
                :label="'云区域'"
                required
                property="cloudAreaId">
                <bk-select
                    class="input"
                    :clearable="false"
                    v-model="formData.cloudAreaId"
                    searchable>
                    <bk-option
                        v-for="option in cloudAreaList"
                        :key="option.id"
                        :id="option.id"
                        :name="option.name" />
                </bk-select>
            </jb-form-item>
            <jb-form-item
                label="IP"
                required
                property="ipStr">
                <bk-input
                    :placeholder="'输入IP，以“回车”分隔'"
                    class="input"
                    type="textarea"
                    v-model="formData.ipStr" />
            </jb-form-item>
            <jb-form-item
                :label="'备注'"
                required
                property="remark">
                <bk-input
                    v-model="formData.remark"
                    class="input"
                    type="textarea"
                    :maxlength="100" />
            </jb-form-item>
            <jb-form-item
                :label="'生效范围'"
                required
                property="actionScopeIdList"
                style="margin-bottom: 0;">
                <bk-checkbox-group
                    v-model="formData.actionScopeIdList"
                    @change="handleRangeChange">
                    <bk-checkbox
                        v-for="(item, index) in actionScope"
                        :key="item.id"
                        :value="item.id"
                        :class="{ 'scope-checkbox': index !== actionScope.length - 1 }">
                        {{ item.name }}
                    </bk-checkbox>
                </bk-checkbox-group>
            </jb-form-item>
        </jb-form>
    </div>
</template>
<script>
       import WhiteIpService from '@service/white-ip';
    import AppManageService from '@service/app-manage';

    const getDefaultData = () => ({
        id: 0,
        // 生效范围
        actionScopeIdList: [{},{},{}],
        // 业务ID
        scopeList: [{},{},{}],
        // 云区域ID
        cloudAreaId: '',
        ipStr: '',
        // 备注
        remark: '',
    });

    const getScopeLocalKey = scopeData => `#${scopeData.scopeType}#${scopeData.scopeId}`;

    export default {
        name: '',
        props: {
            data: {
                type: Object,
                default: () => ({}),
            },
        },
        data () {
            return {
                isLoading: true,
                formData: getDefaultData(),
                scopeLocalKeyList: [{},{},{}],
                appList: [{},{},{}],
                cloudAreaList: [{},{},{}],
                actionScope: [],
            };
        },
        watch: {
            data: {
                handler (data) {
                    if (!data.id) {
                        return;
                    }
                    const {
                        id,
                        actionScopeList,
                        cloudAreaId,
                        appList,
                        remark,
                        ipList,
                    } = data;
                    this.formData = {
                        ...this.formData,
                        id,
                        actionScopeIdList: actionScopeList.map(item => item.id),
                        cloudAreaId,
                        scopeList: appList.map(item => ({
                            type: item.scopeType,
                            id: item.scopeId,
                        })),
                        remark,
                        ipStr: ipList.join('\n'),
                    };
                },
                immediate: true,
            },
        },
        created () {
            Promise.all([
                this.fetchAppList(),
                this.fetchAllCloudArea(),
                this.fetchActionScope(),
            ]).finally(() => {
                this.isLoading = false;
            });
            this.rules = {
                ipStr: [
                    {
                        required: true,
                        message: 'IP必填',
                        trigger: 'blur',
                    },
                ],
                remark: [
                    {
                        required: true,
                        message: '备注必填',
                        trigger: 'blur',
                    },

                ],
                actionScopeIdList: [
                    {
                        validator: value => value.length > 0,
                        message: '生效范围必填',
                        trigger: 'blur',
                    },
                ],
            };
        },
        methods: {
            /**
             * @desc 业务列表
             */
            fetchAppList () {
                return AppManageService.fetchAppList()
                    .then((data) => {
                        this.appList = data.map(item => ({
                            ...item,
                            localKey: getScopeLocalKey(item),
                        }));
                        if (this.formData.scopeList.length < 1) {
                            const [
                                {
                                    scopeType,
                                    scopeId,
                                },
                            ] = data;
                            this.formData.scopeList = [{
                                type: scopeType,
                                id: scopeId,
                            }];
                        }
                        this.scopeLocalKeyList = this.formData.scopeList.map(item => `#${item.type}#${item.id}`);
                    });
            },
            /**
             * @desc 获取云区域列表
             */
            fetchAllCloudArea () {
                return WhiteIpService.getAllCloudArea()
                    .then((data) => {
                        this.cloudAreaList = data;
                        if (this.formData.cloudAreaId === '') {
                            this.formData.cloudAreaId = this.cloudAreaList[0].id;
                        }
                    });
            },
            /**
             * @desc 获取生效范围列表
             */
            fetchActionScope () {
                return WhiteIpService.getScope()
                    .then((data) => {
                        this.actionScope = data;
                    });
            },
            
            handleRangeChange (value) {
                if (value.length > 0) {
                    this.$refs.whiteIpForm.clearError('actionScopeIdList');
                }
            },

            submit () {
                return this.$refs.whiteIpForm.validate()
                    .then(() => {
                        const params = { ...this.formData };
                        if (params.id < 1) {
                            delete params.id;
                        }
                        params.scopeList = this.scopeLocalKeyList.map((scopeLocalKey) => {
                            const [
                                ,
                                type,
                                id,
                            ] = scopeLocalKey.match(/^#([^#]+)#(.+)$/);
                            return {
                                type,
                                id,
                            };
                        });
                        return WhiteIpService.whiteIpUpdate(params)
                            .then(() => {
                                this.messageSuccess(this.formData.id ? '编辑成功' : '新建成功');
                                this.$emit('on-update');
                            });
                    });
            },
        },
    };
</script>
<style lang='postcss'>
    .app-wraper {
        display: flex;
        align-items: center;

        .app-select {
            flex: 1;
        }

        .whole-business {
            margin-left: 10px;
        }
    }

    .input {
        width: 495px;
    }

    .scope-checkbox {
        margin-right: 30px;
    }
</style>
