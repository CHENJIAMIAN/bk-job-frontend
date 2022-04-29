

<template>
    <div>
        <vue-progress-bar />
        <jb-router-view :key="$route.fullPath" />
    </div>
</template>
<script>
    import {
        loadLanguage,
    } from '@/i18n';
    import Local from './local';
    import TemplateLocal from '@/views/task-manage/local';

    [
        Local,
        TemplateLocal,
    ].forEach(module => loadLanguage(module));

    export default {};
</script>
