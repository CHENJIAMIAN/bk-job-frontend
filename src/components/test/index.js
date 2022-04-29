

export default {
    install (Vue) {
        Vue.directive('test', {
            bind (el, binding) {
                const {
                    type,
                    value,
                } = binding.value;
                el.setAttribute('data-test-id', `${type}_${value}`);
            },
            update (el, binding) {
                const {
                    type,
                    value,
                } = binding.value;
                el.setAttribute('data-test-id', `${type}_${value}`);
            },
        });
    },
};
