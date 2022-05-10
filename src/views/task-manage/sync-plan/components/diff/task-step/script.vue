<template>
    <div>
        <div class="row" :class="diff.scriptSourceText">
            <span class="label">{{ '脚本来源：' }}</span>
            <span class="value">{{ data.scriptSourceText }}</span>
        </div>
        <div class="row" :class="[diff.content, diff.scriptVersionId]">
            <span class="label">{{ '脚本内容：' }}</span>
            <script-content />
        </div>
        <div class="row" :class="diff.scriptParam">
            <span class="label">{{ '脚本参数：' }}</span>
            <span class="value">{{ data.scriptParam || '-' }}</span>
        </div>
        <div class="row" :class="diff.timeout">
            <span class="label">{{ '超时时长：' }}</span>
            <span class="value">{{ data.timeout }}(s)</span>
        </div>
        <div class="row" :class="diff.ignoreError">
            <span class="label">{{ '错误处理：' }}</span>
            <span class="value">{{ data.ignoreErrorText }}</span>
        </div>
        <div class="row" :class="diff.executeAccount">
            <span class="label">{{ '执行账号：' }}</span>
            <span class="value">{{ findName(data.executeAccount) || '-' }}</span>
        </div>
        <div class="row" :class="diff.executeTarget">
            <span class="label">{{ '执行目标：' }}</span>
            <script-execute-target />
        </div>
    </div>
</template>
<script>
    import ScriptContent from './components/script-content';
    import ScriptExecuteTarget from './components/script-execute-target';

    export default {
        name: '',
        components: {
            ScriptContent,
            ScriptExecuteTarget,
        },
        props: {
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
                    return '';
                }
                return account.alias;
            },
        },
    };
</script>
