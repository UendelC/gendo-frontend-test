<script setup>
import Badge from '@/components/utils/Badge.vue'
import RepoView from '@/components/ReposList.vue'
import StarredView from '@/components/StarredList.vue'
import SearchInput from '@/components/utils/SearchInput.vue'
import { computed, shallowRef, ref } from 'vue'
import { useUserStore } from '@/stores/user'

const map = {
    repos: RepoView,
    starred: StarredView
}

const props = defineProps({
    reposAmount: Number,
    starredAmount: Number
})

let activeTab = shallowRef(RepoView)
let searchQuery = ref('')

const userStore = useUserStore()

const handleTab = (tab) => {
    activeTab.value = map[tab]
}

const contentAmount = computed(() => {
    return activeTab.value === RepoView ? props.reposAmount : props.starredAmount
})

const content = computed(() => {
    if (!searchQuery.value) {
        return activeTab.value === RepoView ? userStore.visibleRepos : userStore.visibleStarred
    }

    const list = activeTab.value === RepoView ? userStore.repos : userStore.starred
    return list.filter((item) => item.full_name.includes(searchQuery.value))
})

const reposTabClass = computed(() => {
    return {
        'border-b-4 border-[#E36209]': activeTab.value === RepoView,
        'py-4 px-7 cursor-pointer': true
    }
})

const starredTabClass = computed(() => {
    return {
        'border-b-4 border-[#E36209]': activeTab.value === StarredView,
        'py-4 px-7 cursor-pointer': true
    }
})

const emptySearchMessage = computed(() => {
    return activeTab.value === RepoView
        ? `${userStore.user.login} doesn't have any repositories that match.`
        : `That's it. You've reached the end of ${userStore.user.login}'s stars.`
})

const emptyStateMessage = computed(() => {
    return activeTab.value === RepoView
        ? `${userStore.user.login} doesn't have any public repositories yet.`
        : `${userStore.user.login} doesn't have any starred repositories yet.`
})
</script>

<template>
    <div class="flex flex-col lg:mt-8">
        <nav class="border-b-2 grid grid-cols-2 lg:flex">
            <div :class="reposTabClass" @click="handleTab('repos')">
                <div class="flex gap-2 justify-center">
                    Repos
                    <Badge :text="props.reposAmount" />
                </div>
            </div>
            <div :class="starredTabClass" @click="handleTab('starred')">
                <div class="flex gap-2 justify-center">
                    Starred
                    <Badge :text="props.starredAmount" />
                </div>
            </div>
        </nav>
        <div class="mt-5 lg:mx-0 mx-6">
            <SearchInput placeholder="Filter by name" v-model="searchQuery" />
        </div>
        <Component
            v-if="content.length"
            :is="activeTab"
            :content="content"
            :show-pagination="!searchQuery && contentAmount > 30"
        />
        <div v-else-if="searchQuery" class="text-center mt-5 text-sm font-bold">
            {{ emptySearchMessage }}
        </div>
        <div v-else class="text-center mt-5 text-sm font-bold">
            {{ emptyStateMessage }}
        </div>
    </div>
</template>