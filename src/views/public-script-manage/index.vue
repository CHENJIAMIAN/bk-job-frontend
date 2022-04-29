

<template>
    <jb-router-view />
</template>
<script>
    import {
        loadLanguage,
    } from '@/i18n';
    import ScriptLocal from '@/views/script-manage/local';

    [
        ScriptLocal,
    ].forEach(module => loadLanguage(module));

    export default {};
</script>
