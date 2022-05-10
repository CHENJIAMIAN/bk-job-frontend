<template>
    <div>
        <div class="row" :class="diff.timeout">
            <span class="label">{{ '超时时长：' }}</span>
            <span class="value">{{ data.timeout }}(s)</span>
        </div>
        <div class="row" :class="diff.ignoreError">
            <span class="label">{{ '错误处理：' }}</span>
            <span class="value">{{ data.ignoreErrorText }}</span>
        </div>
        <div class="row" :class="diff.uploadSpeedLimit">
            <span class="label">{{ '上传限速：' }}</span>
            <span class="value">{{ data.uploadSpeedLimitText }}</span>
        </div>
        <div class="row" :class="diff.downloadSpeedLimit">
            <span class="label">{{ '下载限速：' }}</span>
            <span class="value">{{ data.downloadSpeedLimitText }}</span>
        </div>
        <div>
            <p class="label">{{ '文件来源：' }}</p>
            <file-source :account="account" :id="id" :data="data.originFileList" />
        </div>
        <div class="row" :class="diff.destinationFileLocation">
            <span class="label">{{ '目标路径：' }}</span>
            <span class="value">{{ data.destinationFileLocation }}</span>
        </div>
        <div class="row" :class="diff.transferMode">
            <span class="label">{{ '传输模式：' }}</span>
            <span class="value">{{ data.transferModeText }}</span>
        </div>
        <div class="row" :class="diff.executeAccount">
            <span class="label">{{ '执行帐号：' }}</span>
            <span class="value">{{ findName(data.executeAccount) }}</span>
        </div>
        <div class="row" :class="diff.destination">
            <span class="label">{{ '执行目标：' }}</span>
            <file-execute-target />
        </div>
    </div>
</template>
<script>
    import FileSource from './components/file-source';
    import FileExecuteTarget from './components/file-execute-target';

    export default {
        name: '',
        components: {
            FileSource,
            FileExecuteTarget,
        },
        props: {
            id: {
                type: Number,
                required: true,
            },
            data: {
                type: Object,
                required: true,
            },
            diff: {
                type: Object,
                default: () => ({}),
            },
            account: {
                type: Array,
                default: () => [],
            },
        },
        methods: {
            findName (accountId) {
                const account = this.account.find(_ => _.id === accountId);
                if (!account) {
                    return '-';
                }
                return account.alias;
            },
        },
    };
</script>
