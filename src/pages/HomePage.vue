<template>
  <div class="container mt-4">
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <!-- + 새 거래 카드 -->
      <div class="col">
        <div
          class="card h-100 text-center border-dashed"
          @click="handleAdd"
          style="cursor: pointer"
        >
          <div
            class="card-body d-flex flex-column justify-content-center align-items-center text-muted"
          >
            <div style="font-size: 2rem">＋</div>
            <p class="mt-2 mb-0">영수증 추가</p>
          </div>
        </div>
      </div>

      <!-- 거래 카드들 -->
      <TransactionCard
        v-for="(transaction, index) in transactions"
        :key="index"
        :title="transaction.title"
        :date="transaction.date"
        :participants="transaction.participants"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TransactionCard from '@/components/TransactionCard.vue'

const router = useRouter()

// 임시
const transactions = ref([
  {
    title: '코스트코 장보기',
    date: '2025-05-05',
    participants: ['Guno', 'Sangil'],
  },
])

const handleAdd = () => {
  router.push('/config') // UserConfigPage
}
</script>

<style scoped>
.border-dashed {
  border: 2px dashed #ccc;
}
</style>
