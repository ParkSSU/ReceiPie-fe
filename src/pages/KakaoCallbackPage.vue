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
    if (!code || typeof code !== 'string') {
      throw new Error('카카오 인가 코드 누락')
    }

    console.log('카카오 인가 코드:', code)

    const res = await axios.get(`http://3.38.102.232:8080/api/oauth/kakao/callback?code=${code}`)

    console.log('카카오 응답 데이터:', res.data)

    const token = res.data.token || res.data.accessToken
    const nickname = res.data.nickname || '사용자'

    if (!token) {
      throw new Error('accessToken 누락됨')
    }
    userStore.setUser({ nickname, token })

    router.push('/')
  } catch (e) {
    console.error('OAuth 로그인 실패:', e)
    router.push('/login')
  }
})
</script>
