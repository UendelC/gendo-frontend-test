import { defineStore } from "pinia";

export const useProgress = defineStore({
    id: 'progress',
    state: () => ({
        progress: 0,
    }),
    actions: {
        start() {
            const progressInterval = setInterval(() => {
                this.progress += 1
            }, 300);

            clearInterval(progressInterval)
        },
        finish() {
            this.progress = 0
        },
    }
})