import User from '../data/user'
import Repos from '../data/repos'
import Starred from '../data/starred'

export default class StaticFetcher {
    async fetchUser(username) {
        return User
    }

    async fetchRepos(username) {
        return Repos
    }

    async fetchStarred(username) {
        return Starred
    }
}