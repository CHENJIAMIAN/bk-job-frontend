

// 账号分类
const OS = 1;
const DB = 2;

// 账号类型
const TYPE_LINUX = 1;
const TYPE_WINDOWS = 2;
const TYPE_MYSQL = 9;
const TYPE_ORACLE = 10;
const TYPE_DB2 = 11;

export default class Account {
    static OS = OS;
    static DB = DB;

    static TYPE_LINUX = TYPE_LINUX;
    static TYPE_WINDOWS = TYPE_WINDOWS;
    static TYPE_MYSQL = TYPE_MYSQL;
    static TYPE_ORACLE = TYPE_ORACLE;
    static TYPE_DB2 = TYPE_DB2;

    static accountType = {
        liunx: TYPE_LINUX,
        windows: TYPE_WINDOWS,
        mysql: TYPE_MYSQL,
        oracle: TYPE_ORACLE,
        db2: TYPE_DB2,
    };

    constructor (payload) {
        this.id = payload.id;
        this.account = payload.account;
        this.alias = payload.alias;
        this.categoryName = payload.categoryName;
        this.category = payload.category;
        this.createTime = payload.createTime;
        this.creator = payload.creator;
        this.dbPassword = payload.dbPassword;
        this.dbPort = payload.dbPort;
        this.dbSystemAccountId = payload.dbSystemAccountId;
        this.lastModifyTime = payload.lastModifyTime;
        this.lastModifyUser = payload.lastModifyUser;
        this.os = payload.os;
        this.ownerUsers = payload.ownerUsers || [];
        this.password = payload.password;
        this.remark = payload.remark || '';
        this.type = payload.type;
        this.typeName = payload.typeName;
        // 权限
        this.canUse = payload.canUse;
        this.canManage = payload.canManage;
    }

    get isSystem () {
        return this.category === 1;
    }
}
