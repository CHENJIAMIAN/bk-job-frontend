

<script>
    import _ from 'lodash';
    import Mixin from './mixin';

    export default {
        name: 'BKSearchKey',
        mixins: [Mixin],
        data () {
            return {
                condition: {},
                list: [],
                activeIndex: -1,
            };
        },
        
        computed: {
            needRender () {
                // 没有选中key，且输入框中没有输入值
                if (!this.searchSelect.menu.id && this.searchSelect.localValue === '') {
                    return true;
                }
                return false;
            },
            isCondition () {
                const { searchSelect } = this;
                if (searchSelect.chipList.length < 1) {
                    // 条件筛选不能作为第一项
                    return false;
                }
                if (searchSelect.chipList[searchSelect.chipList.length - 1][searchSelect.primaryKey]
                    !== searchSelect.defaultCondition[searchSelect.primaryKey]) {
                    // 已选的最后一项是条件筛选，则下一次操作不展示
                    return false;
                }
                return this.searchSelect.showCondition;
            },
        },
        created () {
            // eslint-disable-next-line no-underscore-dangle
            this.generatorList = _.debounce(this._generatorList, 100);
        },
        mounted () {
            document.body.addEventListener('keydown', this.handleKeydown);
        },
        beforeDestroy () {
            this.activeIndex = -1;
            document.body.removeEventListener('keydown', this.handleKeydown);
        },
        methods: {
            _generatorList () {
                const {
                    primaryKey,
                    data,
                    chipList,
                } = this.searchSelect;

                const selectKeyMap = chipList.reduce((result, item) => {
                    result[item[primaryKey]] = true;
                    return result;
                }, {});

                const stack = [];
                data.forEach((item) => {
                    if (!selectKeyMap[item[primaryKey]]) {
                        stack.push(item);
                    }
                });
                this.list = Object.freeze(stack);
            },
            handleKeydown (event) {
                if (!this.needRender) {
                    return;
                }
                // 取消选中状态
                if (event.keyCode === 27) {
                    this.activeIndex = -1;
                    return;
                }
                // enter键直接触发选中
                if (event.keyCode === 13 && this.activeIndex > -1) {
                    this.handleClick(this.list[this.activeIndex], this.activeIndex);
                    return;
                }
                this.scrollActiveToView(event);
            },
            
            handleClick (item, index) {
                this.$emit('select', item, index);
            },
            
            handleCondition () {
                this.$emit('select-conditon', this.condition);
            },
        },
        render (h) {
            if (!this.needRender) {
                return null;
            }

            const {
                condition,
                displayKey,
            } = this.searchSelect;

            const renderCondition = () => {
                if (!this.isCondition) {
                    return '';
                }
                return (
                <div class="search-condition" onClick={this.handleCondition}>
                    {condition[displayKey]}
                </div>
                );
            };

            const renderList = (h) => {
                if (this.list.length < 1) {
                    return (
                    <div class="search-loading">{ this.searchSelect.remoteEmptyText }</div>
                    );
                }
                return (
                <ul ref="list" class="search-menu">
                    { this.list.map((item, index) => (
                        <li
                            class={{
                                'search-menu-item': true,
                                active: index === this.activeIndex,
                            }}>
                            <div class="item-name" onClick={() => this.handleClick(item, index)}>
                                <span>{ item[displayKey] }</span>
                                {
                                    item.description ? <span class="item-description">({item.description})</span> : ''
                                }
                            </div>
                        </li>
                    )) }
                </ul>
                );
            };

            return (
            <div class="jb-bk-search-list" role="key-menu" tabIndex="-1">
                { renderCondition(h) }
                { renderList(h) }
            </div>
            );
        },
    };
</script>
