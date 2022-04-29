

<template>
    <source-file
        :data="fileSources"
        :variable="variable"
        :field="field"
        @on-change="handleSourceFileChange" />
</template>
<script>
    import SourceFileVO from '@domain/variable-object/source-file';
    import SourceFile from '../../common/source-file';

    export default {
        name: 'SourceFileOfTemplate',
        components: {
            SourceFile,
        },
        inheritAttrs: false,
        props: {
            field: {
                type: String,
                required: true,
            },
            formData: {
                type: Object,
                default: () => ({}),
            },
            variable: {
                type: Array,
                default: () => [],
            },
        },
        data () {
            return {
                isAddServeFile: false,
                fileSources: [],
            };
        },
        watch: {
            formData: {
                handler (formData) {
                    this.fileSources = Object.freeze(formData[this.field].map((fileItem) => {
                        const fileSource = new SourceFileVO(fileItem);
                        fileSource.loaded = 1;
                        fileSource.uploadStatus = 'success';
                        return fileSource;
                    }));
                },
                immediate: true,
            },
        },
        methods: {
            handleSourceFileChange (payload) {
                const originFileList = payload.map(fileItem => ({
                    fileHash: fileItem.fileHash,
                    fileLocation: fileItem.fileLocation,
                    fileType: fileItem.fileType,
                    fileSize: `${fileItem.fileSize}`,
                    host: fileItem.host,
                    account: fileItem.account,
                    id: fileItem.id,
                    fileSourceId: fileItem.fileSourceId,
                }));
                
                this.$emit('on-change', this.field, Object.freeze(originFileList));
            },
        },
    };
</script>
