<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from "@/stores/user"

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const countDown = new Date(userStore.resetTime * 1000).toLocaleTimeString()

const mockData = () => {
    userStore.mockData()
    router.push({ name: 'home' })
}
</script>

<template>
    <div class="flex flex-col mx-10 items-center justify-center min-h-screen gap-8 lg:flex-row">
        <img src="../assets/error.png" alt="GitHub octopus" />
        <div class="flex flex-col gap-10">
            <div class="min-w-48">
                <h1 class="text-4xl font-bold">Erro {{ route.params.code }}</h1>
                <p class="text-md mt-1">{{ route.params.message }}</p>
                <p v-if="route.params.code == 403">Seu limite será reestabelecido às <span class="font-bold">{{ countDown }}</span>.</p>
            </div>
            <div class="self-center flex gap-5">
                <button class="border border-green-400 p-2 rounded-md font-bold text-green-400" @click="mockData">
                    Usar dados mockados
                </button>
                <router-link to="/" class="bg-green-400 p-2 rounded-md font-bold text-white">
                    Início
                </router-link>
            </div>
        </div>
    </div>
</template>