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
            <col key="setting" name="setting" width="40">
        </colgroup>
        <thead>
            <tr>
                <template v-for="item in columns">
                    <th
                        v-if="showColumns.includes(item.name)"
                        :key="item.name"
                        :class="{
                            sort: item.orderField,
                        }"
                        @click="handleSort(item)">
                        <span>{{ item.label }}</span>
                        <span
                            v-if="item.label === 'IP'"
                            class="copy-ip-btn"
                            @click="handleCopyIP">
                            {{ '复制' }}
                        </span>
                        <span v-if="item.orderField" class="sort-box" :data-order="item.order">
                            <span class="top" :class="{ active: item.order === 1 }" />
                            <span class="bottom" :class="{ active: item.order === 0 }" />
                        </span>
                    </th>
                </template>
                <th class="list-action" @click="handleShowSetting">
                    <i class="bk-icon icon-cog-shape" />
                </th>
            </tr>
        </thead>
    </table>
</template>
<script>
    export default {
        name: '',
        props: {
            columns: {
                type: Array,
                required: true,
            },
            showColumns: {
                type: Array,
                required: true,
            },
        },
        methods: {
            /**
             * @desc 列排序
             * @param { Boolean } payload
             * @returns { undefined }
             */
            handleSort (payload) {
                if (payload.label === 'IP') {
                    return;
                }
                this.$emit('on-sort', payload);
            },
            /**
             * @desc 复制IP
             */
            handleCopyIP () {
                this.$emit('on-copy');
            },
            /**
             * @desc 显示表格配置
             */
            handleShowSetting () {
                this.$emit('on-show-setting');
            },
        },
    };
</script>
