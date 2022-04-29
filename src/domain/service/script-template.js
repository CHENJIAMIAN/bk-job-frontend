

import ScriptTemplateSource from '../source/script-template';

export default {
    fetchOriginalTemplate (params) {
        return ScriptTemplateSource.getOriginalData(params)
            .then(({ data }) => data);
    },
    updateOriginalTemplate (params) {
        return ScriptTemplateSource.updateOriginalData(params)
            .then(({ data }) => data);
    },
    fetchRenderScript (params) {
        return ScriptTemplateSource.getRenderDataWithVariable(params)
            .then(({ data }) => data);
    },
    fetchTemplate (params) {
        return ScriptTemplateSource.getData(params)
            .then(({ data }) => data);
    },
    fetchVaribaleList (params) {
        return ScriptTemplateSource.getVariables(params)
            .then(({ data }) => data);
    },
};
