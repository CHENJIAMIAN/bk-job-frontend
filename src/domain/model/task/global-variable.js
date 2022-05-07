
import TaskHostNodeModel from '@model/task-host-node';

const TYPE_STRING = 1;
const TYPE_NAMESPACE = 2;
const TYPE_HOST = 3;
const TYPE_PASSWORD = 4;
const TYPE_RELATE_ARRAY = 5;
const TYPE_INDEX_ARRAY = 6;

export default class GlobalVariable {
    static TYPE_STRING = TYPE_STRING;
    static TYPE_NAMESPACE = TYPE_NAMESPACE;
    static TYPE_HOST = TYPE_HOST;
    static TYPE_PASSWORD = TYPE_PASSWORD;
    static TYPE_RELATE_ARRAY = TYPE_RELATE_ARRAY;
    static TYPE_INDEX_ARRAY = TYPE_INDEX_ARRAY;
    static iconMap = {
        [TYPE_STRING]: 'string',
        [TYPE_NAMESPACE]: 'namespace',
        [TYPE_HOST]: 'host',
        [TYPE_PASSWORD]: 'password',
        [TYPE_RELATE_ARRAY]: 'array',
        [TYPE_INDEX_ARRAY]: 'array',
    };

    static typeTextMap = {
        [TYPE_STRING]: '字符串',
        [TYPE_NAMESPACE]: '命名空间',
        [TYPE_HOST]: '主机列表',
        [TYPE_PASSWORD]: '密文',
        [TYPE_RELATE_ARRAY]: '数组',
        [TYPE_INDEX_ARRAY]: '数组',
    };
    
    constructor (payload, isClone = false) {
        this.id = isClone ? -payload.id : payload.id;
        this.name = payload.name || '';
        this.type = payload.type || TYPE_STRING;
        this.defaultValue = payload.defaultValue || '';
        this.defaultTargetValue = new TaskHostNodeModel(payload.defaultTargetValue || {});
        this.description = payload.description || '';
        this.changeable = payload.changeable || 0;
        this.required = payload.required || 0;
        this.delete = payload.delete || 0;
        this.value = payload.value || '';
        this.targetValue = new TaskHostNodeModel(payload.targetValue || {});
    }

    /**
     * @desc 主机变量
     * @returns { Boolean }
     */
    get isHost () {
        return this.type === TYPE_HOST;
    }

    /**
     * @desc 密文变量
     * @returns { Boolean }
     */
    get isPassword () {
        return this.type === TYPE_PASSWORD;
    }

    /**
     * @desc 变量值是否为空
     * @returns { Boolean }
     */
    get isEmpty () {
        if (this.type === TYPE_HOST) {
            return this.defaultTargetValue.isEmpty;
        }
        return !this.defaultValue;
    }

    /**
     * @desc 变量值是否必填
     * @returns { Boolean }
     */
    get isRequired () {
        return !!this.required;
    }

    /**
     * @desc 变量的icon
     * @returns { String }
     */
    get icon () {
        return GlobalVariable.iconMap[this.type];
    }

    /**
     * @desc 类型的文本展示
     * @returns { String }
     */
    get typeText () {
        return GlobalVariable.typeTextMap[this.type];
    }

    /**
     * @desc 类型的分类描述
     * @returns { String }
     */
    get typeDescription () {
        const descriptionMap = {
            [TYPE_STRING]: 'string',
            [TYPE_NAMESPACE]: 'namespace',
            [TYPE_HOST]: 'host',
            [TYPE_PASSWORD]: 'password',
            [TYPE_RELATE_ARRAY]: 'array',
            [TYPE_INDEX_ARRAY]: 'array',
        };
        return descriptionMap[this.type];
    }
    
    /**
     * @desc 可变的文本描述
     * @returns { String }
     */
    get changeableText () {
        return this.changeable ? '是' : '否';
    }

    /**
     * @desc 必填的问题描述
     * @returns { String }
     */
    get requiredText () {
        return this.required ? '是' : '否';
    }

    /**
     * @desc 展示的值
     * @returns { String }
     */
    get valueText () {
        if ([
            TYPE_HOST,
        ].includes(this.type)) {
            return this.defaultTargetValue.text;
        }
        if ([
            TYPE_PASSWORD,
        ].includes(this.type)) {
            return '******';
        }
        return this.defaultValue || '--';
    }

    /**
     * @desc 鼠标hover的title展示
     * @returns { String }
     */
    get title () {
        if (this.type === TYPE_PASSWORD) {
            return '';
        }
        if (this.value === '--') {
            return '';
        }
        return this.value;
    }
}
