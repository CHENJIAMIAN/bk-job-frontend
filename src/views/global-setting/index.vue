

<template>
    <jb-router-view :key="$route.path" />
</template>
<script>
    import {
        loadLanguage,
    } from '@/i18n';
    import Local from './local';

    loadLanguage(Local);

    export default {};
</script>
