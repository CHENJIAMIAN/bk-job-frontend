

<template>
    <source-file
        mode="onlyHost"
        :data="fileSources"
        :field="field"
        @on-change="handleSourceFileChange" />
</template>
<script>
    import SourceFileVO from '@domain/variable-object/source-file';
    import SourceFile from '../../common/source-file';

    export default {
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
        },
        data () {
            return {
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
