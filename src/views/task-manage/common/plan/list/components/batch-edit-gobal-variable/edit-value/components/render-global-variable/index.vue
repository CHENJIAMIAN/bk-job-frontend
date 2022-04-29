

<template>
    <comoponent
        :is="com"
        class="global-variable-batch-edit-render"
        :data="data"
        v-bind="$attrs"
        v-on="$listeners" />
</template>
<script>
    import GlobalVariableModel from '@model/task/global-variable';
    import TextType from './text';
    import HostType from './host';
    import PasswordType from './password';

    export default {
        name: '',
        props: {
            data: {
                type: Object,
                required: true,
            },
        },
        data () {
            return {};
        },
        computed: {
            com () {
                const comMap = {
                    [GlobalVariableModel.TYPE_STRING]: TextType,
                    [GlobalVariableModel.TYPE_NAMESPACE]: TextType,
                    [GlobalVariableModel.TYPE_PASSWORD]: PasswordType,
                    [GlobalVariableModel.TYPE_RELATE_ARRAY]: TextType,
                    [GlobalVariableModel.TYPE_INDEX_ARRAY]: TextType,
                    [GlobalVariableModel.TYPE_HOST]: HostType,
                };
                return comMap[this.data.type];
            },
        },
    };
</script>
<style lang='postcss'>
    .global-variable-batch-edit-render {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }

        .remove-flag {
            display: none;
            padding: 10px 10px 10px 4px;
            font-size: 14px;
            color: #c4c6cc;
            cursor: pointer;

            &:hover {
                color: #ea3636;
            }
        }

        &:hover {
            .remove-flag {
                display: inline;
            }
        }

        .name {
            margin-bottom: 10px;
            font-size: 14px;
            line-height: 19px;
            color: #63656e;
        }
    }
</style>
