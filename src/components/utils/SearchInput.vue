<script setup>
import { Search } from 'lucide-vue-next'
import { onMounted, ref } from 'vue';

const props = defineProps({
    placeholder: {
        type: String,
        default: ''
    },
    focusOnMount: {
        type: Boolean,
        default: false
    }
})

const input = ref(null)
const model = defineModel()

onMounted(() => {
    if (props.focusOnMount) {
        input.value.focus()
    }
})
</script>

<template>
    <div
        class="px-3 py-1.5 lg:w-80 w-full border border-gray-300 rounded-lg text-sm flex items-center gap-3 focus-within:border-blue-500"
    >
        <Search size="16" color="gray" />
        <input
            ref="input"
            class="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm ring-0"
            type="text"
            v-model="model"
            :placeholder="props.placeholder"
        />
    </div>
</template>