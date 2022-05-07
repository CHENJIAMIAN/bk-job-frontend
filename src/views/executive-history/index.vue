

<template>
    <div>
        <vue-progress-bar />
        <jb-router-view :key="$route.fullPath" />
    </div>
</template>
<script>
    
    import Local from './local';
    import TemplateLocal from '@/views/task-manage/local';

    export default {};
</script>
