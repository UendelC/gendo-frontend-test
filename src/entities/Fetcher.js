import { useUserStore } from "@/stores/user";
import GitHubFetcher from "./githubFetcher";
import StaticFetcher from "./staticFetcher";

export default class Fetcher {
    constructor() {
        const userStore = useUserStore()
        this.instance = import.meta.env.VITE_MOCKED === 'true' || userStore.mocked
            ? new StaticFetcher()
            : new GitHubFetcher()
    }

    fetchUser(username) {
        return this.instance.fetchUser(username)
    }

    fetchRepos(username) {
        return this.instance.fetchRepos(username)
    }

    fetchStarred(username) {
        return this.instance.fetchStarred(username)
    }
}