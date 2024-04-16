<script setup>
import TopHeader from "@/components/TopHeader.vue"
import ProfileDescription from '@/components/Profile/ProfileDescription.vue'
import ProfileContent from '@/components/Profile/ProfileContent.vue'
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()
</script>

<template>
    <TopHeader />
    <div class="grid lg:grid-cols-4 grid-cols-1">
        <ProfileDescription
            :bio="userStore.user?.bio"
            :name="userStore.user?.name"
            :avatar-url="userStore.user?.avatar_url"
            :login="userStore.user?.login"
            class="col-span-1"
        />
        <ProfileContent
            :repos-amount="userStore.user?.public_repos"
            :starred-amount="userStore.amountOfStarred"
            class="col-span-3"
        />
    </div>
</template>