import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const peopleCount = ref<number>(0)
  const names = ref<string[]>([])

  const setPeopleCount = (count: number) => {
    peopleCount.value = count
  }

  const setNames = (newNames: string[]) => {
    names.value = newNames
  }

  return { peopleCount, names, setPeopleCount, setNames }
})
