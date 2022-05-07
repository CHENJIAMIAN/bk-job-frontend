
import Model from '@model/model';

const STATUS_INVALID = -1; // 未保存
const STATUS_DRAFT = 0; // 未上线
const STATUS_ONLINE = 1; // 已上线
const STATUS_OFFLINE = 2; // 已下线
const STATUS_DISABLED = 3; // 已禁用

export default class Base extends Model {
    static STATUS_INVALID = STATUS_INVALID;
    static STATUS_DRAFT = STATUS_DRAFT;
    static STATUS_ONLINE = STATUS_ONLINE;
    static STATUS_OFFLINE = STATUS_OFFLINE;
    static STATUS_DISABLED = STATUS_DISABLED;

    static STATUS_TEXT_MAP = {
        [STATUS_INVALID]: '未保存',
        [STATUS_DRAFT]: '未上线',
        [STATUS_ONLINE]: '已上线',
        [STATUS_OFFLINE]: '已下线',
        [STATUS_DISABLED]: '已禁用',
    };
}
