<template>
    <sideslider-box class="server-group-host-preview" :value="value" @change="handleClose">
        <div slot="title">{{ '分组预览' }}——{{ data.name }}</div>
        <div slot="desc">
            <statistics-text :data="statisticsData" />
            <action-extend :list="list" copyable />
        </div>
        <div class="preview-wraper" v-bkloading="{ isLoading }">
            <host-table :list="list" />
        </div>
    </sideslider-box>
</template>
<script>
    import AppService from '@service/app-manage';
    import HostTable from './host-table';
    import SidesliderBox from './sideslider-box';
    import StatisticsText from './statistics-text';
    import ActionExtend from './action-extend';
    import {
        sortHost,
        statisticsHost,
    } from '../components/utils';

    export default {
        name: '',
        components: {
            HostTable,
            SidesliderBox,
            StatisticsText,
            ActionExtend,
        },
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            data: {
                type: Object,
                required: true,
            },
        },
        data () {
            return {
                isLoading: false,
                statisticsData: {},
                list: [{},{},{}],
            };
        },
        created () {
            if (this.data.id) {
                this.fetchDynamicGroup();
            }
        },
        methods: {
            fetchDynamicGroup () {
                this.isLoading = true;
                AppService.fetchHostOfDynamicGroup({
                    id: this.data.id,
                }).then((data) => {
                    if (data.length < 1) {
                        this.isError = true;
                        return;
                    }
                    this.statisticsData = statisticsHost(data[0].ipListStatus);
                    this.list = Object.freeze(sortHost(data[0].ipListStatus));
                })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            handleClose () {
                this.list = [];
                this.statisticsData = {};
                this.$emit('input', false);
                this.$emit('change', false);
            },
        },
    };
</script>
<style lang='postcss'>
    .server-group-host-preview {
        .choose-ip-host-table {
            tr {
                td {
                    border-bottom: 1px solid #e7e8ed !important;
                }
            }
        }
    }
</style>
