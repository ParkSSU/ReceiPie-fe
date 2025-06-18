import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  nickname: string
  token: string
}

export const useUserStore = defineStore('user', () => {
  const nickname = ref<string | null>(null)
  const token = ref<string | null>(null)

  // 로그인 성공 시 사용자 정보 저장 + 토큰 localStorage 저장
  const setUser = (user: User) => {
    nickname.value = user.nickname
    token.value = user.token
    localStorage.setItem('accessToken', user.token)
  }

  // 로그아웃: 상태 초기화 + 토큰 제거
  const logout = () => {
    nickname.value = null
    token.value = null
    localStorage.removeItem('accessToken')
  }

  // store에서 사용할 속성과 함수들을 return
  return {
    nickname,
    token,
    setUser,
    logout,
  }
})
