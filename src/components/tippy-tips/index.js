import _ from 'lodash';
import tippy from 'bk-magic-vue/lib/utils/tippy';

const defaultOptions = {
    duration: 0,
    arrow: true,
};
export default {
    install (Vue) {
        Vue.mixin({
            updated: _.debounce(() => {
                const $els = document.body.querySelectorAll('[tippy-tips]');
                $els.forEach(($current) => {
                    const content = $current.getAttribute('tippy-tips');
                    if (!content) {
                        return;
                    }
                    const placement = $current.getAttribute('placement') || 'top';
                    // 元素:tippy-tips="提示内容" 即可注入悬浮提示
                    if (!$current._tippy) { // eslint-disable-line no-underscore-dangle
                        tippy($current, {
                            ...defaultOptions,
                            content,
                            placement,
                        });
                    }
                });
            }, 300),
            beforeDestroy: _.debounce(function () {
                if (!this.$el || !this.$el.querySelectorAll) {
                    return;
                }
                const $els = this.$el.querySelectorAll('[tippy-tips]');
                $els.forEach(($current) => {
                    if ($current._tippy) { // eslint-disable-line no-underscore-dangle
                        $current._tippy.destroy(); // eslint-disable-line no-underscore-dangle
                    }
                });
            }, 300, {
                leading: true,
                trailing: false,
            }),
        });
    },
};
