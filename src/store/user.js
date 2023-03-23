import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id: 'user',
    state: () => {
        return {
            name: 'ljp'
        }
    },
    actions: {
        updateName(name) {
            this.name = name
        }
    }
})