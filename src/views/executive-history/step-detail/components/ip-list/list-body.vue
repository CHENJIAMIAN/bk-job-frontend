

<template>
    <table class="ip-table">
        <colgroup>
            <template v-for="item in columns">
                <col
                    v-if="showColumns.includes(item.name)"
                    :key="item.name"
                    :name="item.name"
                    :width="item.width">
            </template>
            <col
                key="setting"
                name="setting"
                width="40">
        </colgroup>
        <tbody>
            <tr
                v-for="(item) in data"
                :key="item.key"
                :class="{
                    active: selectRow === item.key,
                }"
                @click="handleSelect(item)">
                <td
                    v-for="(showKey, colIndex) in showColumns"
                    :key="showKey"
                    :class="colIndex === 0 && item.result">
                    {{ item[showKey] }}
                </td>
                <td class="active-flag">
                    <Icon
                        v-if="selectRow === item.key"
                        type="arrow-full-right" />
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
    import _ from 'lodash';

    export default {
        name: '',
        props: {
            data: {
                type: Array,
                required: true,
            },
            columns: {
                type: Array,
                required: true,
            },
            showColumns: {
                type: Array,
                required: true,
            },
        },
        data () {
            return {
                list: [],
                selectRow: '',
            };
        },
        watch: {
            data: {
                handler (data) {
                    if (data.length < 1) {
                        this.isFocused = false;
                        this.handleSelect({});
                        return;
                    }
                    this.isFocused = true;
                    if (!this.selectRow
                        || !_.find(this.data, _ => this.selectRow === _.key)) {
                        this.handleSelect(this.data[0]);
                    }
                },
                immediate: true,
            },
        },
        mounted () {
            const focusCallbacks = (event) => {
                this.isFocused = false;
                let $parentEle = event.target;
                while ($parentEle && $parentEle.classList) {
                    if ($parentEle.classList.contains('step-execute-host-list')) {
                        this.isFocused = true;
                        break;
                    }
                    $parentEle = $parentEle.parentNode;
                }
            };
            
            document.addEventListener('click', focusCallbacks);
            document.addEventListener('keydown', this.handleKeyDownSelect);
            this.$once('hook:beforeDestroy', () => {
                document.removeEventListener('click', focusCallbacks);
                document.removeEventListener('keydown', this.handleKeyDownSelect);
            });
        },
        methods: {
            /**
             * @desc 触发选中更新
             * @param { Object } selectData
             */
            triggerChange: _.debounce(function (selectData) {
                this.$emit('on-row-select', selectData);
            }, 150),
            /**
             * @desc 鼠标键盘上下键选中
             * @param { Object } event
             */
            handleKeyDownSelect (event) {
                if (!this.isFocused) {
                    return;
                }
                const index = _.findIndex(this.data, ({ key }) => key === this.selectRow);

                let selectData = null;
                if (event.code === 'ArrowDown' && index < this.data.length - 1) {
                    selectData = this.data[index + 1];
                } else if (event.code === 'ArrowUp' && index > 0) {
                    selectData = this.data[index - 1];
                }
                if (selectData) {
                    this.selectRow = selectData.key;
                    this.triggerChange(selectData);
                }
            },
            /**
             * @desc 选中主机
             * @param { Object } payload
             */
            handleSelect (payload) {
                this.selectRow = payload.key;
                this.triggerChange(payload);
            },
        },
    };
</script>
