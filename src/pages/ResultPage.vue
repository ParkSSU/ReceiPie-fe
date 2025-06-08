<template>
  <div class="container mt-4">
    <!-- 🔽 사용자 선택 드롭다운 -->
    <div class="mb-4 w-50">
      <label for="userSelect" class="form-label">거래 필터</label>
      <select id="userSelect" class="form-select" v-model="selectedUser">
        <option value="전체">전체</option>
        <option v-for="(name, index) in userStore.names" :key="index" :value="name">
          {{ name }}
        </option>
      </select>
    </div>

    <!-- 📦 거래 품목 테이블 -->
    <table class="table">
      <thead>
        <tr>
          <th>상품명</th>
          <th>수량</th>
          <th>가격</th>
          <th>총액</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredItems" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.count }}개</td>
          <td>{{ item.price.toLocaleString() }}원</td>
          <td>{{ (item.count * item.price).toLocaleString() }}원</td>
        </tr>
      </tbody>
    </table>

    <!-- 총합계 -->
    <div class="mt-4">
      <h4>총 합계: {{ totalPrice.toLocaleString() }}원</h4>
    </div>

    <!-- ⬅ 홈으로 이동 버튼 -->
    <div class="mt-4 text-end">
      <router-link to="/" class="btn btn-secondary"> Back to home </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTransactionStore } from '@/stores/transactionStore'
import { useUserStore } from '@/stores/userStore'

const transactionStore = useTransactionStore()
const userStore = useUserStore()

// 사용자 선택 상태: 기본은 "전체"
const selectedUser = ref<string>('전체')

// 필터링된 거래 항목
const filteredItems = computed(() => {
  if (selectedUser.value === '전체') {
    return transactionStore.items
  }

  return transactionStore.items.filter((item) => item.buyers.includes(selectedUser.value))
})

// 총합계 계산
const totalPrice = computed(() =>
  filteredItems.value.reduce((sum, item) => sum + item.count * item.price, 0),
)
</script>
