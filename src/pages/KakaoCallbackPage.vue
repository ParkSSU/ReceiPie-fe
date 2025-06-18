<template>
  <div>로그인 처리 중...</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

onMounted(async () => {
  const code = route.query.code

  try {
    const res = await axios.get(`/oauth/kakao/callback?code=${code}`)
    const token = res.data.accessToken
    const nickname = res.data.nickname // 백엔드에서 같이 넘긴다면

    // 저장 방식 선택: localStorage + Pinia
    localStorage.setItem('accessToken', token)
    userStore.setUser({ nickname, token })

    router.push('/') // 홈 페이지로 이동
  } catch (e) {
    console.error('OAuth 로그인 실패', e)
    router.push('/login')
  }
})
</script>
