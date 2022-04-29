

export default class User {
    constructor (payload) {
        this.id = payload.id;
        this.uid = payload.uid;
        this.username = payload.username;
        this.displayName = payload.displayName || '';
        this.phone = payload.phone || '';
        this.email = payload.email || '';
        this.timeZone = payload.timeZone || '';
        this.wxUserId = payload.wxUserId || '';
    }
}
