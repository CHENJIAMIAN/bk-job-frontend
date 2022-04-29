

<template>
    <span ref="source" style="display: none;">
        <slot />
    </span>
</template>
<script>
    import _ from 'lodash';

    export default {
        name: 'ElementTeleport',
        props: {
            target: {
                type: String,
                default: '#siteHeaderStatusBar',
            },
        },
        created () {
            this.childNodeSet = new Set();
            // eslint-disable-next-line no-underscore-dangle
            this.move = _.debounce(this._move, 30);
        },
        updated () {
            this.move();
        },
        mounted () {
            this.move();
        },
        beforeDestroy () {
            this.remove();
            this.childNodeSet.clear();
        },
        methods: {
            /**
             * @desc 组件销毁时同步删除 slot
             */
            remove () {
                const $targetParent = document.querySelector(this.target);
                if (!$targetParent) {
                    return;
                }
                
                this.childNodeSet.forEach((item) => {
                    if ($targetParent.contains(item)) {
                        if (this.$refs.source) {
                            this.$refs.source.appendChild(item);
                        } else {
                            $targetParent.removeChild(item);
                        }
                        
                        this.childNodeSet.delete(item);
                    }
                });
            },
            /**
             * @desc 移动 slot 到指定的 target
             */
            _move () {
                this.remove();
                if (!this.$refs.source) {
                    return;
                }
                const $targetParent = document.querySelector(this.target);
                if (!$targetParent) {
                    console.error(`element-teleport: target 指定的 DOM 元素 ${this.target} 不存则`);
                    return;
                }
                this.$refs.source.childNodes.forEach((childNode) => {
                    this.childNodeSet.add(childNode);
                    $targetParent.appendChild(childNode);
                });
            },
        },
    };
</script>
