import Fetcher from "@/entities/Fetcher"
import { useUserStore } from "@/stores/user"

export const showUser = async (username) => {
    const userStore = useUserStore()
    const fetcher = new Fetcher()
    return new Promise(async (resolve, reject) => {
        const response = await fetcher.fetchUser(username)
        const data = await response.json()

        if (response.status === 403) {
            reject({ message: 'Ops! Parece que atingimos o limite de requisições permitidas neste momento.', code: 403 })
            userStore.resetTime = response.headers.get('X-RateLimit-Reset')
        }

        if (response.status === 404) {
            reject({ message: 'Usuário não encontrado!', code: 404 })
        }

        resolve(data)
    })
}

export const showRepos = async (username, page = 1) => {
    const fetcher = new Fetcher()
    return new Promise(async (resolve, reject) => {
        const response = await fetcher.fetchRepos(username)
        const data = await response.json()

        if (response.status === 403) {
            reject('Ops! Parece que atingimos o limite de requisições permitidas neste momento. Por favor, tente novamente mais tarde. Obrigado pela compreensão!')
        }

        resolve({ data, finalPage: Math.ceil(data.length / 30) })
    })
}

export const showStarred = async (username, page = 1) => {
    const fetcher = new Fetcher()
    return new Promise(async (resolve, reject) => {
        const response = await fetcher.fetchStarred(username)
        const data = await response.json()

        if (response.status === 403) {
            reject('Limite de taxa excedido')
        }

        resolve({ data, finalPage: Math.ceil(data.length / 30) })
    })
}