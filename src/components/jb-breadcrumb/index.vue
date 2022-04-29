

<script>
    import _ from 'lodash';
            
    export default {
        name: '',
        props: {
            width: {
                type: Number,
            },
        },
        data () {
            return {
                boxStyles: {
                    visibility: 'hidden',
                },
                lastItemStyles: {
                    width: 'auto',
                },
                isEllipsis: false,
            };
        },
        mounted () {
            const placementWidth = 30;
            const boxWidth = this.width || this.$refs.box.getBoundingClientRect().width;
            let totalChildWidth = 0;
            
            const itemWidthList = [];
            // 计算所有项的宽度和
            this.$refs.box.childNodes.forEach((item) => {
                const { width } = item.getBoundingClientRect();
                totalChildWidth += width;
                itemWidthList.push(width);
            });
            this.isEllipsis = totalChildWidth + placementWidth > boxWidth;
            
            if (this.isEllipsis) {
                if (this.$refs.box.childNodes.length < 7) {
                    this.lastItemStyles = {
                        'max-width': `${totalChildWidth - boxWidth - placementWidth}`,
                    };
                } else {
                    const realRenderWidth = itemWidthList
                        .slice(0, 4)
                        .concat(itemWidthList.slice(-2))
                        .reduce((result, item) => result + item, 0);
                
                    if (realRenderWidth + placementWidth > boxWidth) {
                        const lastWidth = itemWidthList[itemWidthList.length - 1];
                        const needEllipsisWidth = realRenderWidth + placementWidth - boxWidth;
                    
                        if (lastWidth > needEllipsisWidth) {
                            this.lastItemStyles = {
                                width: `${lastWidth - needEllipsisWidth}px`,
                            };
                        }
                    }
                }
            }
            this.boxStyles = {
                visibility: 'visible',
            };
        },
        methods: {
            renderSplit (h) {
                return h('span', {
                    style: {
                        padding: '0 10px',
                    },
                }, ['/']);
            },
            renderEllipsis (h) {
                return h('span', {
                    staticClass: 'jb-breadcrumb-back',
                    on: {
                        click: () => {
                            this.$emit('on-last');
                        },
                    },
                    attrs: {
                        'tippy-tips': '返回上一级',
                    },
                    style: {
                        cursor: 'pointer',
                    },
                }, ['..']);
            },
        },
        render (h) {
            let renderSlots = this.$slots.default.reduce((result, item, index) => {
                if (!item.tag || !/jb-breadcrumb-item/.test(item.data.staticClass)) {
                    return result;
                }
                if (index > 0) {
                    result.push(this.renderSplit(h));
                }
                if (item.data.staticClass) {
                    item.data.staticClass.replace(/ last/, '');
                }
                result.push(item);
                return result;
            }, []);
            
            if (this.isEllipsis) {
                renderSlots = renderSlots
                    .slice(0, 4)
                    .concat([this.renderEllipsis(h)])
                    .concat(renderSlots.slice(-2));
            }
            if (renderSlots.length > 1) {
                const lastSlot = _.last(renderSlots);
                let { staticClass } = lastSlot.data;
                if (!staticClass) {
                    staticClass = 'last';
                }
                if (!/last/.test(staticClass)) {
                    staticClass += ' last';
                }
                lastSlot.data.staticClass = staticClass;
                lastSlot.data.style = this.lastItemStyles;
            }
            
            return h('div', {
                ref: 'box',
                key: this.isEllipsis,
                style: this.boxStyles,
                staticClass: 'jb-breadcrumb',
            }, renderSlots);
        },
    };
</script>
<style lang='postcss'>
    .jb-breadcrumb {
        height: 20px;
        overflow: hidden;
        font-size: 14px;
        color: #63656e;
        white-space: nowrap;

        & > * {
            float: left;
        }

        .jb-breadcrumb-back,
        .jb-breadcrumb-item {
            &:hover {
                color: #3a84ff;
            }
        }

        .jb-breadcrumb-item {
            height: 100%;
            overflow: hidden;
            line-height: 20px;
            text-overflow: ellipsis;
            cursor: pointer;

            &.last {
                color: #313238 !important;
                cursor: default;
            }
        }
    }
</style>
