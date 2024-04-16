<script setup>
import { useProgress } from '@/stores/progress'

const progress = useProgress()
</script>

<template>
    <div
        class="bg-blue-500 h-1.5 fixed top-0 left-0 z-50"
        :class="`w-[${progress.progress}%] transition-all duration-300`"
    />
</template>
