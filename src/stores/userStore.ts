import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  nickname: string
  token: string
}

export const useUserStore = defineStore('user', () => {
  const peopleCount = ref<number>(0)
  const names = ref<string[]>([])
  const user = ref<User | null>(null)

  const setPeopleCount = (count: number) => {
    peopleCount.value = count
  }

  const setNames = (newNames: string[]) => {
    names.value = newNames
  }

  const setUser = (userData: User) => {
    user.value = userData
  }

  const clearUser = () => {
    user.value = null
  }

  return { peopleCount, names, user, setPeopleCount, setNames, setUser, clearUser }
})
