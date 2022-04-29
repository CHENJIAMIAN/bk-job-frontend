

<template>
    <lower-component>
        <div>
            <div
                class="action-btn"
                v-bk-tooltips.bottom="$t('history.步骤内容')"
                @click="handleShowStepDetail">
                <Icon type="detail-line" />
            </div>
            <jb-sideslider
                :is-show.sync="isShow"
                :title="$t('history.查看步骤内容')"
                :quick-close="true"
                :show-footer="false"
                :width="960">
                <step-detail-view :task-id="taskInstanceId" :id="stepInstanceId" />
            </jb-sideslider>
        </div>
    </lower-component>
</template>
<script>
    import StepDetailView from '../../common/step-detail-view';

    export default {
        name: '',
        components: {
            StepDetailView,
        },
        props: {
            taskInstanceId: {
                type: Number,
                required: true,
            },
            stepInstanceId: {
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
            handleShowStepDetail () {
                this.isShow = true;
            },
        },
    };
</script>
