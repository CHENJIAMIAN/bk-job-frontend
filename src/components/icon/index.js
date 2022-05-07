
import './style.css';

export default {
    name: 'Icon',
    props: {
        type: {
            type: String,
            required: true,
        },
        svg: {
            type: Boolean,
            default: false,
        },
    },
    
    render (h) {
        if (this.svg) {
            return h('svg', {
                class: {
                    'job-svg-icon': true,
                },
                props: this.$attrs,
                on: this.$listeners,
            }, [
                h('use', {
                    attrs: {
                        'xlink:href': `#job-icon-${this.type}`,
                    },
                }),
            ]);
        }
        const classes = {
            'job-icon': true,
            [`job-icon-${this.type}`]: true,
        };
        return h('i', {
            class: classes,
            props: this.$attrs,
            on: this.$listeners,
        });
    },
};
