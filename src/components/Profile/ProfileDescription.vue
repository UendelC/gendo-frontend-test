<script setup>

const props = defineProps({
    name: String,
    bio: String,
    login: String,
    avatarUrl: String
})
</script>

<template>
    <div class="m-6 flex lg:flex-col gap-4 items-center">
        <a :href="props.avatarUrl" :alt="`View ${props.login}'s full-sized avatar`">
            <img class="rounded-full lg:size-48 size-20 cursor-pointer" :src="props.avatarUrl" alt="users profile image" />
        </a>
        <div class="flex flex-col lg:items-center items-start cursor-default">
            <h1 class="font-bold">{{ props.name }}</h1>
            <p class=" font-thin">{{ props.bio }}</p>
        </div>
    </div>
</template>