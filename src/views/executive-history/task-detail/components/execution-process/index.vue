

<template>
    <div
        v-bk-tooltips="$t('history.定位到当前步骤')"
        class="task-exeution-process"
        @click="handleScrollToCurrentStep">
        {{ current }} / {{ total }}
    </div>
</template>
<script>
    import {
        scrollTopSmooth,
        getOffset,
    } from '@utils/assist';

    export default {
        name: '',
        props: {
            total: {
                type: Number,
                required: true,
            },
            current: {
                type: Number,
                required: true,
            },
        },
        mounted () {
            this.timer = setTimeout(() => {
                this.handleScrollToCurrentStep();
            }, 1000);
        },
        beforeDestroy () {
            clearTimeout(this.timer);
        },
        methods: {
            handleScrollToCurrentStep () {
                const $srollContainer = document.querySelector('.container-content');
                if (!$srollContainer) {
                    return;
                }
                const $currentStep = document.querySelectorAll('.execution-step-box')[this.current];
                const { top } = getOffset($currentStep);
                const windowHeight = window.innerHeight;
                const targetHieght = $currentStep.getBoundingClientRect().height;
                const offset = (windowHeight - targetHieght) / 2;
                scrollTopSmooth($srollContainer, top - offset);
            },
        },
    };
</script>
<style lang='postcss'>
    .task-exeution-process {
        width: 100px;
        height: 28px;
        margin-left: 10px;
        font-size: 14px;
        line-height: 28px;
        color: #fff;
        text-align: center;
        cursor: pointer;
        background: rgb(0 0 0 / 25%);
        border-radius: 14px;

        &:hover {
            background: rgb(0 0 0 / 40%);
        }
    }
</style>
