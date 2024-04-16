<script setup>
import SearchInput from "@/components/utils/SearchInput.vue";
import { useUserStore } from "@/stores/user"
import { useProgress } from "@/stores/progress"
import { ref } from "vue"
import { useRouter } from "vue-router"

const userStore = useUserStore()
const progress = useProgress()
const router = useRouter()
const profile = ref('UendelC')

const handleSearchProfile = async () => {
    progress.start()
    userStore.fetchUser(profile.value).then((user) => {
        const repos = userStore.fetchRepos(user.login)
        const starred = userStore.fetchStarred(user.login)
        Promise.all([repos, starred]).then(() => {
            router.push({ name: 'profile' })
        }).catch((error) => {
            switch (error.code) {
                case 404:
                    router.push({ name: 'error', params: error })
                    break
                case 403:
                    router.push({ name: 'error', params: error })
                    break
            }
        })
    }).catch((error) => {
        switch (error.code) {
            case 404:
                router.push({ name: 'error', params: error })
                break
            case 403:
                router.push({ name: 'error', params: error })
                break
        }
    }).finally(() => {
        progress.finish()
    })
}
</script>

<template>
    <div class="flex flex-col mx-10 items-center justify-center min-h-screen gap-8 lg:flex-row">
        <img src="../assets/github-octopus.png" alt="GitHub octopus" />
        <div class="flex flex-col gap-10">
            <div>
                <h1 class="text-4xl font-bold">Descubra usuários no Github</h1>
                <p class="text-lg mt">Encontre usuários e seus repositórios com facilidade</p>
            </div>
            <div class="flex gap-4">
                <SearchInput v-model="profile" @keyup.enter="handleSearchProfile" focus-on-mount />
                <button
                    class="bg-green-400 p-2 rounded-md font-bold text-white"
                    @click="handleSearchProfile"
                >
                    Buscar
                </button>
            </div>
        </div>
    </div>
</template>