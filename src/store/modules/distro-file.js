

export default {
    namespaced: true,
    state: {
        isEditNewSourceFile: false,
        isLocalFileUploading: false,
        isLocalFileUploadFailed: false,
    },
    mutations: {
        editNewSourceFile (state, payload) {
            state.isEditNewSourceFile = payload;
        },
        updateFileUploading (state, value) {
            state.isLocalFileUploading = value;
        },
        updateFileUploadFailed (state, value) {
            state.isLocalFileUploadFailed = value;
        },
    },
};
