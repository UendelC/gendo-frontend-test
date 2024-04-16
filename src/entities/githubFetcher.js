export default class GitHubFetcher {
    async fetchUser(username) {
        return await fetch(`https://api.github.com/users/${username}`);
    }

    async fetchRepos(username) {
        return await fetch(`https://api.github.com/users/${username}/repos?per_page=9999`);
    }

    async fetchStarred(username) {
        return await fetch(`https://api.github.com/users/${username}/starred?per_page=9999`);
    }
}