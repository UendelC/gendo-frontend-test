<script setup>
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { computed } from 'vue'

const props = defineProps({
    currentPage: Number,
    finalPage: Number|String,
    action: Function
})

const previousButtonClass = computed(() => {
    const base = 'flex items-center justify-center'
    return props.currentPage === 1 ? `${base} cursor-default` : `${base} hover:border hover:border-gray/10 rounded-md px-2 py-2 hover:cursor-pointer text-[#0969da]`
})
const nextButtonClass = computed(() => {
    const base = 'flex items-center justify-center'
    return props.currentPage === props.finalPage ? `${base} cursor-default` : `${base} hover:border hover:border-gray/10 rounded-md px-2 py-2 hover:cursor-pointer text-[#0969da]`
})

function scrollToTop() {
    window.scrollTo({
        top: 0,
    })
}

const handlePrev = () => {
    if (props.currentPage > 1) {
        props.action(props.currentPage - 1)
        scrollToTop()
    }
}

const handleNext = () => {
    if (props.currentPage < props.finalPage) {
        props.action(props.currentPage + 1)
        scrollToTop()
    }
}
</script>

<template>
    <div class="my-7 flex justify-center gap-2 text-zinc-400">
        <button :class="previousButtonClass" @click="handlePrev">
            <ChevronLeft size="16" />
            Anterior
        </button>
        <button :class="nextButtonClass" @click="handleNext">
            Próximo
            <ChevronRight size="16" />
        </button>
    </div>
</template>