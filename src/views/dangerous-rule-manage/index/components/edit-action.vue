<template>
    <div class="dangerous-rule-edit-mode">
        <bk-select
            ref="select"
            :value="value"
            :clearable="false"
            @toggle="handleSelectToggle"
            @change="handleChange">
            <bk-option
                v-for="item in actionList"
                :name="item.name"
                :id="item.id"
                :key="item.id" />
        </bk-select>
        <div v-show="!isEditing" class="value-box" @click.stop="handleEdit">
            <div
                class="action-text"
                :class="textClass">
                {{ text }}
            </div>
            <i class="bk-icon icon-angle-down value-box-arrow" />
        </div>
    </div>
</template>
<script>
    import _ from 'lodash';
   
    export default {
        name: '',
        props: {
            value: {
                type: Number,
                require: true,
            },
        },
        data () {
            return {
                isEditing: false,
            };
        },
        computed: {
            text () {
                return _.find(this.actionList, _ => _.id === this.value).name;
            },
            textClass () {
                const classMap = {
                    1: 'normal',
                    2: 'hight',
                };
                return classMap[this.value];
            },
        },
        created () {
            this.actionList = [
                {
                    id: 1,
                    name: '扫描',
                },
                {
                    id: 2,
                    name: '拦截',
                },
            ];
        },
        methods: {
            /**
             * @desc 开始编辑
             */
            handleEdit () {
                this.isEditing = true;
                this.$nextTick(() => {
                    this.$refs.select.$el.querySelector('.bk-select-name').click();
                });
            },
            /**
             * @desc 下拉面板收起，取消编辑状态
             */
            handleSelectToggle (toggle) {
                if (!toggle) {
                    this.isEditing = false;
                }
            },
            /**
             * @desc 触发change 事件
             */
            handleChange (value) {
                this.$emit('on-change', value);
            },
        },
    };
</script>
<style lang='postcss'>
    .dangerous-rule-edit-mode {
        position: relative;
        padding-left: 10px;
        margin-left: -10px;

        .value-box {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            display: flex;
            width: 100%;
            height: 100%;
            padding-left: 10px;
            cursor: pointer;
            background: #fff;
            align-items: center;

            &:hover {
                background: #f0f1f5;

                .action-text {
                    &.normal {
                        color: #63656e;
                        background: #e1e3eb;
                    }

                    &.hight {
                        color: #e63535;
                        background: #fdd;
                    }
                }

                .value-box-arrow {
                    display: block;
                }
            }

            .action-text {
                display: inline-block;
                height: 18px;
                padding: 0 5px;
                font-size: 12px;
                line-height: 18px;
                cursor: pointer;
                border-radius: 2px;

                &.normal {
                    color: #979ba5;
                    background: #f0f1f5;
                }

                &.hight {
                    color: #ea3636;
                    background: #ffebeb;
                }
            }

            .value-box-arrow {
                position: absolute;
                top: 2px;
                right: 2px;
                display: none;
                font-size: 22px;
                color: #979ba5;
            }
        }
    }
</style>
