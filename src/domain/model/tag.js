

import Model from '@model/model';

export default class Tag extends Model {
    constructor (payload) {
        super();
        this.id = payload.id;
        this.name = payload.name;
        this.description = payload.description || '';
        this.relatedScriptNum = Number(payload.relatedScriptNum);
        this.relatedTaskTemplateNum = Number(payload.relatedTaskTemplateNum);
        this.creator = payload.creator;
        this.createTime = payload.createTime;
        this.lastModifyUser = payload.lastModifyUser;
        this.lastModifyTime = payload.lastModifyTime;
        
        // 权限
        this.canManage = payload.canManage;
    }

    /**
     * @desc 描述展示文本
     * @returns { String }
     */
    get descriptionText () {
        return this.getDefaultValue(this.description);
    }

    get isEditRelateDisabled () {
        return this.relatedScriptNum < 1 && this.relatedTaskTemplateNum < 1;
    }
}
