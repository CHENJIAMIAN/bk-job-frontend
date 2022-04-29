

<template>
    <div class="jb-apply-permission-page">
        <div class="wraper">
            <apply-page :auth-result="authResult" />
        </div>
    </div>
</template>
<script>
    import ApplyPage from '@components/apply-permission/apply-page';
    
    export default {
        name: '',
        components: {
            ApplyPage,
        },
        props: {
            authResult: {
                type: Object,
                required: true,
            },
        },
    };
</script>
<style lang='postcss'>
    .jb-apply-permission-page {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        min-height: calc(100vh - 100px);
        padding-top: 100px;
    }
</style>
