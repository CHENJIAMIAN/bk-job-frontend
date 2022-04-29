

<template>
    <div class="render-script-content">
        <ace-editor
            :value="scriptContent"
            :lang="lang"
            :options="[lang]"
            :custom-enable="false"
            readonly />
    </div>
</template>

<script>
    import AceEditor from '@components/ace-editor';
    import { formatScriptTypeValue } from '@/utils/assist';

    export default {
        components: {
            AceEditor,
        },
        props: {
            data: {
                type: Object,
                require: true,
            },
        },
        data () {
            return {
                lang: '',
                scriptContent: '',
            };
        },
        watch: {
            data: {
                handler (data) {
                    this.scriptContent = data.scriptContent;
                    this.lang = formatScriptTypeValue(data.scriptLanguage);
                },
                immediate: true,
            },
        },
    };
</script>
