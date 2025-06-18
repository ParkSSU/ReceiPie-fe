import axios from 'axios'

const instance = axios.create({
  // 개발 환경에서는 프록시 사용, 프로덕션에서는 실제 서버 URL 사용
  baseURL: import.meta.env.DEV ? '' : 'http://3.38.102.232:8080',

  // 요청 최대 대기 시간 (ms)
  timeout: 10000,

  // 모든 요청에 기본으로 포함될 헤더 설정
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor
// - JWT accessToken이 있다면 Authorization 헤더에 자동 추가
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response Interceptor
// - 인증 실패(401) 시 토큰 제거 + 로그인 페이지로 리다이렉트
instance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken')
      window.location.href = '/login'
    }
    return Promise.reject(error) // 다른 에러는 그대로 전달
  },
)

export default instance
