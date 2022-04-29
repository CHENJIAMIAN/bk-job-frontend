

export default {
    methods: {
        scrollActiveToView (event) {
            // 上下键位移动选中
            if (![
                38, 40,
            ].includes(event.keyCode)) {
                return;
            }
            if (event.keyCode === 38) {
                // 上移
                this.activeIndex -= 1;
            } else if (event.keyCode === 40) {
                // 下移
                this.activeIndex += 1;
            }
            if (this.activeIndex >= this.list.length) {
                this.activeIndex = this.list.length - 1;
            }
            if (this.activeIndex < 0) {
                this.activeIndex = 0;
            }
            
            const $list = this.$refs.list;
            this.$nextTick(() => {
                const wraperHeight = $list.getBoundingClientRect().height;
                const activeOffsetTop = $list.querySelector('.active').offsetTop + 34;
                if (activeOffsetTop > wraperHeight) {
                    $list.scrollTop = activeOffsetTop - wraperHeight + 10;
                } else if (activeOffsetTop <= 42) {
                    $list.scrollTop = 0;
                }
            });
        },
    },
};
