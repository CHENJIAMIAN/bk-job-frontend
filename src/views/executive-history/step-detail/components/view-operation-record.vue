<template>
    <lower-component>
        <div>
            <div
                class="action-btn"
                v-bk-tooltips.bottom="'操作记录'"
                @click="handleShowOperationRecord">
                <Icon type="history" />
            </div>
            <jb-sideslider
                :is-show.sync="isShow"
                :quick-close="true"
                :title="'操作记录'"
                :show-footer="false"
                :width="900">
                <operation-record
                    :id="taskInstanceId"
                    @on-change="handleOperationRecordChange" />
            </jb-sideslider>
        </div>
    </lower-component>
</template>
<script>
    import OperationRecord from '../../common/operation-record';

    export default {
        name: '',
        components: {
            OperationRecord,
        },
        props: {
            taskInstanceId: {
                type: Number,
                required: true,
            },
        },
        data () {
            return {
                isShow: false,
            };
        },
        methods: {
            handleShowOperationRecord () {
                this.isShow = true;
            },
            handleOperationRecordChange () {
                this.isShow = false;
            },
        },
    };
</script>
