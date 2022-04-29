

import BackupSource from '../source/backup';

export default {
    fetchInfo () {
        return BackupSource.getData()
            .then(({ data }) => ({
                importJob: data.importJob || [],
                exportJob: data.exportJob || [],
            }));
    },
    export (params) {
        return BackupSource.export(params)
            .then(({ data }) => data);
    },
    fetchExportInfo (params) {
        return BackupSource.getExportById(params)
            .then(({ data }) => data);
    },
    exportDelete (params) {
        return BackupSource.deleteExportById(params)
            .then(({ data }) => data);
    },
    updateExportComplete (params) {
        return BackupSource.exportComplete(params)
            .then(({ data }) => data);
    },
    import (params) {
        return BackupSource.import(params)
            .then(({ data }) => data);
    },
    fetchImportInfo (params) {
        return BackupSource.getImportById(params)
            .then(({ data }) => data);
    },
    checkImportPassword (params) {
        return BackupSource.checkImportPassword(params)
            .then(({ data }) => data);
    },
    uploadImportFile (params, payload) {
        return BackupSource.putImportFile(params, payload)
            .then(({ data }) => data);
    },
    fetchExportFile (params) {
        return BackupSource.getImportFile(params);
    },
};
