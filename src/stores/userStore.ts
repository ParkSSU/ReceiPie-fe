import { defineStore } from 'pinia'
import { ref } from 'vue'

/*
  TODO : 참여 인원 스토어 파일... 참여인원 정보는 어떻게 저장할지 고민할 필요가 있음
  영수증마다 저장할건지?
  카드로서 정리되는 하나의 거래는 어떻게 저장할건지?
*/

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
