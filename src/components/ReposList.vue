<script setup>
import { GitPullRequestCreateArrow, Code, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import Pagination from '@/components/utils/Pagination.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const props = defineProps({
  content: Array,
  showPagination: Boolean
})

const handlePaginationAction = (targetPage) => {
  userStore.updateCurrentRepoPage(targetPage)
}
</script>

<template>
  <div class="py-5 border-b-2" v-for="repo in content" :key="repo.id">
    <div class="lg:mx-0 mx-5">
      <a :href="repo.html_url" class="text-[#0969da] hover:underline"><span class="font-bold">{{ repo.name }}</span></a>
      <p v-if="repo.description" class="text-xs mt-2 mr-5">{{ repo.description }}</p>
      <div class="mt-7 flex gap-5">
        <div v-if="repo.language" class="flex items-center gap-2 hover:text-blue-500 cursor-default">
          <Code size="16" />
          <span class="text-xs font-thin">{{ repo.language }}</span>
        </div>
        <a class="flex items-center gap-2 hover:text-blue-500 hover:cursor-pointer" :href="repo.html_url">
          <GitPullRequestCreateArrow size="16" />
          <span class="text-xs font-thin">{{ repo.forks_count }}</span>
        </a>
      </div>
    </div>
  </div>
  <Pagination
    v-if="showPagination"
    :current-page="userStore.repoCurrentPage"
    :final-page="userStore.repoFinalPage"
    :action="(target) => handlePaginationAction(target)"
  />
</template>
