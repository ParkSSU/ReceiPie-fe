<template>
  <div class="login-page">
    <h2>ReceiPie 로그인</h2>
    <button @click="kakaoLogin">카카오로 로그인</button>
  </div>
</template>

<script setup lang="ts">
const kakaoLogin = () => {
  const kakaoUrl =
    'https://kauth.kakao.com/oauth/authorize' +
    '?response_type=code' +
    '&client_id=91db8a45225f8bfff3cd28705d98e385' +
    '&redirect_uri=http://3.38.102.232:8080/api/oauth/kakao/callback'

  window.location.href = kakaoUrl
}
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}
</style>
