

<template>
    <div class="choose-ip-host-detail" ref="hostDetail">
        <sideslider-box :value="show" @change="handleClose">
            <div slot="title">{{ data.name }}</div>
            <div slot="desc">
                <statistics-text slot="desc" :data="data" />
                <action-extend :list="list" copyable />
            </div>
            <host-table :list="list" />
        </sideslider-box>
    </div>
</template>
<script>
    import ActionExtend from '../components/action-extend';
    import SidesliderBox from '../components/sideslider-box';
    import StatisticsText from '../components/statistics-text';
    import HostTable from '../components/host-table';
    import {
        sortHost,
    } from '../components/utils';

    export default {
        name: 'HostDetail',
        components: {
            ActionExtend,
            SidesliderBox,
            StatisticsText,
            HostTable,
        },
        model: {
            prop: 'show',
            event: 'input',
        },
        props: {
            append: {
                type: Function,
                required: true,
            },
            show: {
                type: Boolean,
                default: false,
            },
            data: {
                type: Object,
                default: () => ({
                    host: [],
                }),
            },
        },
        data () {
            return {
                list: [],
            };
        },
        watch: {
            data: {
                handler (data) {
                    if (!data.host) {
                        this.list = [];
                        return;
                    }
                    this.list = Object.freeze(sortHost(data.host));
                },
                immediate: true,
            },
        },
        mounted () {
            this.append().appendChild(this.$refs.hostDetail);
            this.$once('hook:beforeDestroy', () => {
                const $target = this.append();
                if (this.append()) {
                    $target.removeChild(this.$refs.hostDetail);
                }
            });
        },
        methods: {
            handleClose () {
                this.currentPage = 1;
                this.$emit('input', false);
                this.$emit('change', false);
            },
        },
    };
</script>
<style lang="postcss">
    .choose-ip-host-detail {
        .choose-ip-host-table {
            tr {
                td {
                    border-bottom: 1px solid #e7e8ed !important;
                }
            }
        }
    }
</style>
