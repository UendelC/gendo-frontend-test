<script setup>
const props = defineProps({
    text: String|Number
})
</script>

<template>
    <span class="bg-gray-200 text-gray-800 text-xs font-bold rounded-full px-1 flex items-center">{{ text }}</span>
</template>