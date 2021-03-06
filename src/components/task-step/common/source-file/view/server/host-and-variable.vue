<template>
    <tbody class="create-server-file" :key="reset">
        <tr v-if="hasSaved">
            <td colspan="4">
                <bk-button text @click="handleAddNew">
                    <Icon type="plus" />
                    {{ '添加一行' }}
                </bk-button>
            </td>
            <td />
        </tr>
        <tr v-else>
            <td>
                <edit-file-path
                    :value="serverFile.fileLocation"
                    mode="input"
                    @on-change="handleFileChange" />
            </td>
            <template v-if="serverFile.isHostEmpty">
                <td colspan="2">
                    <div class="server-add-btn">
                        <bk-select
                            ref="serverTypeSelect"
                            class="server-type-select"
                            :value="sourceFileType"
                            :popover-width="85"
                            ext-popover-cls="server-file-popover-class"
                            :clearable="false"
                            style="width: 78px;"
                            @change="handleSourceFileTypeChange">
                            <bk-option id="globalVar" :name="'全局变量'" />
                            <bk-option id="manualAddition" :name="'手动添加'" />
                        </bk-select>
                        <div class="line" />
                        <template v-if="sourceFileType === 'globalVar'">
                            <bk-select
                                :placeholder="'请选择主机列表变量'"
                                class="server-add-variable"
                                :value="serverFile.host.variable"
                                :clearable="false"
                                @change="handleVariableChange"
                                searchable>
                                <bk-option v-for="(option, index) in variable"
                                    :key="index"
                                    :id="option.name"
                                    :name="option.name" />
                            </bk-select>
                        </template>
                        <template v-else>
                            <div class="server-add-host" @click="handleShowChooseIp">
                                <Icon type="plus" class="add-flag" />
                                {{ '添加服务器' }}
                            </div>
                        </template>
                    </div>
                </td>
            </template>
            <template v-else>
                <td>
                    <div class="file-edit-server" @click="handleShowChooseIp">
                        <p v-html="serverFile.serverDesc" />
                    </div>
                </td>
                <td>--</td>
            </template>
            <td>
                <account-select
                    class="account-add-btn"
                    :value="serverFile.account"
                    type="system"
                    @change="handleAccountChange" />
            </td>
            <td>
                <bk-button
                    text
                    @click="handlerSave"
                    >
                    {{ '保存' }}
                </bk-button>
                <bk-button text @click="handlerCancel">{{ '取消' }}</bk-button>
            </td>
        </tr>
        <choose-ip
            ref="chooseIp"
            v-model="isShowChooseIp"
            @on-change="handleHostChange" />
    </tbody>
</template>
<script>
    import _ from 'lodash';
    import { mapMutations } from 'vuex';
    import TaskHostNodeModel from '@model/task-host-node';
    import SourceFileVO from '@domain/variable-object/source-file';
    import { findParent } from '@utils/vdom';
    import ChooseIp from '@components/choose-ip';
    import AccountSelect from '@components/account-select';
    import EditFilePath from '../../components/edit-file-path';

    const generatorDefault = () => new SourceFileVO({
        fileLocation: [],
        fileType: SourceFileVO.typeServer,
        account: '',
    });

    export default {
        name: '',
        components: {
            ChooseIp,
            AccountSelect,
            EditFilePath,
        },
        props: {
            // 服务器文件列表
            data: {
                type: Array,
                required: true,
            },
            account: {
                type: Array,
                required: true,
            },
            variable: {
                type: Array,
                required: true,
            },
        },
        data () {
            return {
                isShowChooseIp: false,
                // 服务器文件列表为空时，默认显示
                hasSaved: this.data.length > 0,
                sourceFileType: 'globalVar',
                serverFile: new SourceFileVO(generatorDefault()),
                reset: 0,
            };
        },
        created () {
            if (this.variable.length > 0) {
                this.handleVariableChange(this.variable[0].name);
                // 设置默认数据，需要取消 window.changeAlert 的状态
                window.changeAlert = false;
                // 设置默认数据，需要取消服务器文件的编辑状态
                this.editNewSourceFile(false);
            }
        },
        methods: {
            ...mapMutations('distroFile', [
                'editNewSourceFile',
            ]),
            /**
             * @desc 文件路径更新
             * @param {Array} fileLocation 文件路径
             */
            handleFileChange (fileLocation) {
                this.serverFile.fileLocation = fileLocation;
                window.changeAlert = true;
                this.editNewSourceFile(true);
            },
            /**
             * @desc 服务器类型更新
             * @param {String} type 服务器类型
             */
            handleSourceFileTypeChange (type) {
                this.sourceFileType = type;
                this.serverFile.host = new TaskHostNodeModel({});
                const formItem = findParent(this, 'JbFormItem');
                if (formItem) {
                    setTimeout(() => {
                        formItem.clearValidator();
                    });
                }
            },
            /**
             * @desc 服务器类型为全局变量时更新选择的全局变量
             * @param {String} variable 全局变量名
             */
            handleVariableChange (variable) {
                if (!variable) {
                    return;
                }
                this.serverFile.host.variable = variable;
                window.changeAlert = true;
                this.editNewSourceFile(true);
                const formItem = findParent(this, 'JbFormItem');
                if (formItem) {
                    setTimeout(() => {
                        formItem.clearValidator();
                    });
                }
            },
            /**
             * @desc 服务器类型为主机时更新显示ip选择器弹层
             */
            handleShowChooseIp () {
                this.isShowChooseIp = true;
            },
            /**
             * @desc 服务器类型为主机时主机值更新
             * @param {Object} hostNodeInfo 主机值
             */
            handleHostChange (hostNodeInfo) {
                window.changeAlert = true;
                this.serverFile.host.hostNodeInfo = hostNodeInfo;
                this.editNewSourceFile(true);
            },
            /**
             * @desc 服务器账号更新
             * @param {Number} accountId 主机值
             */
            handleAccountChange (accountId) {
                if (accountId === '') {
                    return;
                }
                const { id } = _.find(this.account, item => item.id === accountId);
                this.serverFile.account = id;
                const formItem = findParent(this, 'JbFormItem');
                if (formItem) {
                    setTimeout(() => {
                        formItem.clearValidator();
                    });
                }
            },
            /**
             * @desc 添加一个服务器文件
             */
            handleAddNew () {
                this.hasSaved = false;
            },
            /**
             * @desc 保存添加的服务器文件
             */
            handlerSave () {
                this.$emit('on-change', this.serverFile);
                this.handlerCancel();
            },
            /**
             * @desc 取消添加的服务器文件
             */
            handlerCancel () {
                this.$emit('on-cancel');
                this.serverFile = generatorDefault();
                this.sourceFileType = 'globalVar';
                this.$refs.chooseIp.reset();
                this.reset += 1;
                this.hasSaved = true;
                setTimeout(() => {
                    this.editNewSourceFile(false);
                });
            },
        },
    };
</script>
