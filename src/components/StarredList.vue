<script setup>
import { GitPullRequestCreateArrow, Star } from 'lucide-vue-next'
import Pagination from '@/components/utils/Pagination.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const props = defineProps({
  content: Array,
  showPagination: Boolean
})

const handlePaginationAction = (targetPage) => {
  userStore.updateCurrentStarredPage(targetPage)
}
</script>

<template>
  <div class="py-5 border-b-2" v-for="starred in content" :key="starred.id">
    <div class="lg:mx-0 mx-5">
      <a :href="starred.html_url" class="text-[#0969da] hover:underline">{{ starred.owner.login }} / <span class="font-bold"> {{ starred.name }}</span></a>
      <p class="text-xs mt-2 pr-5">{{ starred.description }}</p>
      <div class="mt-7 flex gap-5">
        <a class="flex items-center gap-2 hover:text-blue-500 hover:cursor-pointer">
          <Star size="16" />
          <span class="text-xs font-thin">{{ starred.stargazers_count }}</span>
        </a>
        <a class="flex items-center gap-2 hover:text-blue-500 hover:cursor-pointer">
          <GitPullRequestCreateArrow size="16" />
          <span class="text-xs font-thin">{{ starred.forks_count }}</span>
        </a>
      </div>
    </div>
  </div>
  <Pagination
    v-if="showPagination"
    :current-page="userStore.starredCurrentPage"
    :final-page="userStore.starredFinalPage"
    :action="(target) => handlePaginationAction(target)"
  />
</template>
