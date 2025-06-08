<template>
  <div class="container mt-4">
    <h2>{{ transactionStore.storeName }}</h2>
    <h5>{{ transactionStore.date }}</h5>

    <table class="table mt-4">
      <thead>
        <tr>
          <th>상품명</th>
          <th>수량</th>
          <th>가격</th>
          <th>구매자</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in transactionStore.items" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.count }}개 ({{ item.price.toLocaleString() }}원)</td>
          <!-- 수량 부분 수정 -->
          <td>{{ (item.count * item.price).toLocaleString() }}원</td>
          <!-- 총액 부분 수정 -->
          <td>
            <!-- TODO : 여러 인원 선택 가능하도록 하는 쉬운 방법이 뭘까?
                되게 UX 적인 면을 고민하게 되는데...
                어떻게 하면 좋을지 고민
            -->
            <select v-model="transactionStore.items[index].buyers[0]" class="form-select">
              <option disabled value="">--선택--</option>
              <option v-for="(name, i) in userStore.names" :key="i" :value="name">
                {{ name }}
              </option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 저장하기 버튼 -->
    <div class="mt-4">
      <button class="btn btn-primary" @click="handleSave">저장하기</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTransactionStore } from '@/stores/transactionStore'
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const transactionStore = useTransactionStore()
const userStore = useUserStore()

const buyers = ref(Array(transactionStore.items.length).fill(''))

const handleSave = () => {
  transactionStore.setBuyers(buyers.value) // buyers를 저장
  router.push('/result') // result 페이지로 이동
}
</script>
