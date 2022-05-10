<template>
    <lower-component>
        <div>
            <div
                class="action-btn"
                v-bk-tooltips.bottom="'全局变量'"
                @click="handleShowGlobalVariable">
                <Icon type="global-var-line" />
            </div>
            <jb-sideslider
                :is-show.sync="isShow"
                :quick-close="true"
                :title="'全局变量'"
                :show-footer="false"
                :width="960">
                <global-variable :id="taskInstanceId" />
            </jb-sideslider>
        </div>
    </lower-component>
</template>
<script>
    import GlobalVariable from '../../common/global-variable';

    export default {
        name: '',
        components: {
            GlobalVariable,
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
            handleShowGlobalVariable () {
                this.isShow = true;
            },
        },
    };
</script>
