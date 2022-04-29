

<template>
    <jb-router-view />
</template>
<script>
    import {
        loadLanguage,
    } from '@/i18n';
    import Local from './local';
    
    loadLanguage(Local);

    export default {};
</script>
