

// import I18n from '@/i18n'
import Model from '@model/model';

export default class File extends Model {
    constructor (payload) {
        super();
        this.name = payload.name;
        this.createDate = payload.createDate;
        this.xcosAcl = payload.xcosAcl;
        this.lastModifyTime = payload.lastModifyTime;
        this.size = payload.size;
        this.type = payload.type;
        this.downloadUrl = payload.downloadUrl;
        this.dir = payload.dir;
        this.completePath = payload.completePath;
        this.fileSourceAlias = payload.fileSourceAlias;
        this.fileSourceId = payload.fileSourceId;
    }

    get fileIcon () {
        return this.dir ? 'folder-2' : 'file-line-2';
    }
}
