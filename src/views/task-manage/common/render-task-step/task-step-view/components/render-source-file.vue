<template>
    <div class="render-server-file">
        <bk-collapse
            v-if="isShowLocalFile || isShowServerFile || isShowSourceFile"
            class="host-detail"
            v-model="activeResult">
            <jb-collapse-item
                v-if="isShowLocalFile"
                name="local"
                :active="activeResult">
                <span class="collapse-title">{{ '已选择' }}<span class="number strong">{{ localFileList.length }}</span>{{ '个本地文件' }}</span>
                <template #content>
                    <table>
                        <tbody>
                            <tr v-for="(row, index) in localFileList" :key="index">
                                <td style="width: 40%; word-break: break-all;">{{ row.fileLocationText }}</td>
                                <td>{{ row.fileSizeText }}</td>
                            </tr>
                        </tbody>
                    </table>
                </template>
            </jb-collapse-item>
            <jb-collapse-item
                v-if="isShowSourceFile"
                name="source"
                :active="activeResult">
                <span class="collapse-title">{{ '已选择' }}<span class="number strong">{{ sourceFileList.length }}</span>{{ '个文件源文件' }}</span>
                <template #content>
                    <table>
                        <thead>
                            <th style="width: 40%;">{{ '文件名称' }}</th>
                            <th>{{ '文件源'}}</th>
                        </thead>
                        <tbody class="source-file-list">
                            <tr v-for="(row, index) in sourceFileList" :key="index">
                                <td>
                                    <render-file-path :data="row.fileLocation" />
                                </td>
                                <td>
                                    <span class="source-file-alias" @click="handleGoSource(row, index)">
                                        {{ fileSourceAliasList[index] }}
                                        <Icon type="edit" class="source-file-icon" svg />
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </template>
            </jb-collapse-item>
            <jb-collapse-item
                v-if="isShowServerFile"
                name="server"
                :active="activeResult">
                <span class="collapse-title">{{ '已选择' }}<span class="number strong">{{ serverFileList.length }}</span>{{ '个服务器文件' }}</span>
                <template #content>
                    <table>
                        <thead>
                            <th style="width: 40%;">{{ '文件路径' }}</th>
                            <th style="width: 15%;">{{ '服务器列表' }}</th>
                            <th>{{ 'Agent 状态' }}</th>
                            <th style="width: 20%;">{{ '服务器账号' }}</th>
                        </thead>
                        <tbody>
                            <tr v-for="(row, index) in serverFileList" :key="index">
                                <td>
                                    <render-file-path :data="row.fileLocation" />
                                </td>
                                <template v-if="row.isVar">
                                    <td>
                                        <render-global-variable
                                            :name="row.serverDesc"
                                            :data="variable" />
                                    </td>
                                    <td>
                                        <render-server-agent
                                            :title="`${'全局变量'} - ${row.host.variable}`"
                                            :host-node-info="findVariableValue(row.host.variable)" />
                                    </td>
                                </template>
                                <template v-else>
                                    <td>
                                        <render-file-server :data="row" />
                                    </td>
                                    <td>
                                        <render-server-agent
                                            :title="'服务器文件-服务器列表'"
                                            :host-node-info="row.host.hostNodeInfo" />
                                    </td>
                                </template>
                                <td>{{ findAccountAlias(row.account) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </template>
            </jb-collapse-item>
        </bk-collapse>
    </div>
</template>
<script>
    import FileManageService from '@service/file-source-manage';
    import TaskHostNodeModel from '@model/task-host-node';
    import SourceFileVO from '@domain/variable-object/source-file';
    import JbCollapseItem from '@components/jb-collapse-item';
    import RenderServerAgent from '@components/render-server-agent';
    import RenderFilePath from './render-file-path';
    import RenderGlobalVariable from './render-global-variable';
    import RenderFileServer from './render-file-server';

    export default {
        name: '',
        components: {
            JbCollapseItem,
            RenderServerAgent,
            RenderFilePath,
            RenderGlobalVariable,
            RenderFileServer,
        },
        props: {
            data: {
                type: Array,
                default: () => [],
            },
            variable: {
                type: Array,
                default: () => [],
            },
            account: {
                type: Array,
                default: () => [],
            },
        },
        data () {
            return {
                activeResult: [],
                localFileList: [{},{},{}],
                serverFileList: [{},{},{}],
                sourceFileList: [{},{},{}],
                fileSourceIdsList: [{},{},{}], // 文件源ID
                fileSourceAliasList: [{},{},{}], // 文件源名称
            };
        },
        computed: {
            isShowLocalFile () {
                return this.localFileList.length > 0;
            },
            isShowServerFile () {
                return this.serverFileList.length > 0;
            },
            isShowSourceFile () {
                return this.sourceFileList.length > 0;
            },
        },
        watch: {
            data: {
                handler (fileList) {
                    fileList.forEach((fileItem) => {
                        const fileSource = new SourceFileVO(fileItem);
                        if (fileSource.isServerFile) {
                            this.serverFileList.push(fileSource);
                        } else if (fileSource.isLocalFile) {
                            this.localFileList.push(fileSource);
                        } else if (fileSource.isSourceFile) {
                            this.sourceFileList.push(fileSource);
                            const idLists = []; // 文件源ID
                            this.sourceFileList.forEach((e) => {
                                idLists.push(e.fileSourceId);
                                this.fileSourceIdsList = idLists;
                            });
                        }
                        if (this.localFileList.length > 0) {
                            this.activeResult = ['local'];
                        } else if (this.serverFileList.length > 0) {
                            this.activeResult = ['server'];
                        }
                    });
                },
                immediate: true,
            },
            // 根据文件源ID获取文件源Alias
            fileSourceIdsList: {
                handler (newVal) {
                    if (newVal.length) {
                        const promiseList = newVal.map(id => FileManageService.getSourceInfo({
                            id,
                        }));
                        Promise.all(promiseList).then((res) => {
                            res.forEach((e) => {
                                this.fileSourceAliasList.push(e.alias);
                            });
                        });
                    }
                },
                immediate: true,
            },
        },
        methods: {
            findVariableValue (variable) {
                const curVariable = this.variable.find(item => item.name === variable);
                if (!curVariable) {
                    const { hostNodeInfo } = new TaskHostNodeModel({});
                    return hostNodeInfo;
                }
                return curVariable.defaultTargetValue.hostNodeInfo;
            },
            findAccountAlias (payload) {
                const accountData = this.account.find(item => item.id === payload);
                if (accountData) {
                    return accountData.alias;
                }
                return '';
            },
            handleGoSource (payload, index) {
                const { fileSourceId } = payload;
                const sourceAlias = this.fileSourceAliasList[index];
                const { href } = this.$router.resolve({
                    name: 'bucketList',
                    query: {
                        fileSourceId,
                        sourceAlias,
                    },
                });
                window.open(href, '_blank');
            },
        },
    };
</script>
<style lang='postcss'>
    @import "@/css/mixins/scroll";

    .render-server-file {
        flex: 1;

        .bk-collapse-item-header {
            display: flex;
            align-items: center;
            padding-left: 23px;

            .collapse-title {
                padding-left: 23px;
            }
        }

        table {
            width: 100%;
            line-height: 20px;
            background: #fff;

            tr:nth-child(n+2) {
                td {
                    border-top: 1px solid #dcdee5;
                }
            }

            th,
            td {
                height: 42px;
                padding-top: 5px;
                padding-bottom: 5px;
                padding-left: 16px;
                font-size: 12px;
                text-align: left;

                &:first-child {
                    padding-left: 60px;
                }
            }

            th {
                font-weight: normal;
                color: #313238;
                border-bottom: 1px solid #dcdee5;
            }

            td {
                color: #63656e;

                .file-path {
                    display: inline-block;
                    max-width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }

        .source-file-alias {
            cursor: pointer;

            &:hover {
                color: #3a84ff !important;

                .source-file-icon {
                    display: inline;
                }
            }
        }

        .source-file-icon {
            display: none;
        }

        .bk-table-empty-block {
            display: none;
        }

        .source-file-tips-box {
            max-width: 300px;
            max-height: 280px;
            min-width: 60px;
            overflow-y: auto;

            @mixin scroller;

            .row {
                word-break: break-all;
            }

            .dot {
                display: inline-block;
                width: 6px;
                height: 6px;
                background: currentColor;
                border-radius: 50%;
            }
        }
    }
</style>
