

<template functional>
    <div
        class="version-tab-item"
        :class="{ active: props.data.scriptVersionId === props.currentId }"
        @click="props.change(props.data.scriptVersionId)">
        <span v-bk-tooltips="props.data.version" class="text">{{ props.data.version }}</span>
        <span v-if="props.data.isOnline" class="online-flag">{{ parent.$t('script.线上版') }}</span>
        <Icon class="version-active" type="arrow-full-right" />
    </div>
</template>
