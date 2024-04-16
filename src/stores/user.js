import { showRepos, showStarred, showUser } from "@/services/github"
import { defineStore } from "pinia"

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: null,
        repos: [],
        repoCurrentPage: 1,
        starredCurrentPage: 1,
        repoFinalPage: null,
        starredFinalPage: null,
        starred: [],
        resetTime: null,
        mocked: false,
    }),
    actions: {
        updateCurrentRepoPage(page) {
            this.repoCurrentPage = page
        },
        updateCurrentStarredPage(page) {
            this.starredCurrentPage = page
        },
        async fetchUser(username) {
            return new Promise((resolve, reject) => {
                showUser(username).then(data => {
                    this.user = data
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        async fetchRepos(username, page = 1) {
            return new Promise((resolve, reject) => {
                showRepos(username, page).then(({ data, finalPage }) => {
                    this.repos = data
                    this.repoFinalPage = finalPage
                    this.repoCurrentPage = page
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        async fetchStarred(username, page = 1) {
            return new Promise((resolve, reject) => {
                showStarred(username).then(({ data, finalPage }) => {
                    this.starred = data
                    this.starredFinalPage = finalPage
                    this.starredCurrentPage = page
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        mockData() {
            this.mocked = true
        },
    },
    getters: {
        visibleRepos() {
            const page = this.repoCurrentPage
            return this.repos.slice((page - 1) * 10, page * 30)
        },
        visibleStarred() {
            const page = this.starredCurrentPage
            return this.starred.slice((page - 1) * 10, page * 30)
        },
        amountOfRepos() {
            return this.repos.length
        },
        amountOfStarred() {
            return this.starred.length
        }
    }
})