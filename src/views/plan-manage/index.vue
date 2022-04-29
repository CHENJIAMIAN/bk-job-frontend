

<template>
    <jb-router-view :key="$router.path" />
</template>
<script>
    import {
        loadLanguage,
    } from '@/i18n';
    import Local from '@views/task-manage/local';

    loadLanguage(Local);

    export default {};
</script>
