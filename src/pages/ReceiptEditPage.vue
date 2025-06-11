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
          <th>구매자 할당</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in itemsWithAllocations" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.count }}개 ({{ item.price.toLocaleString() }}원)</td>
          <td>{{ (item.count * item.price).toLocaleString() }}원</td>
          <td>
            <template v-if="item.count === 1 && !item.devideMode">
              <div class="d-flex align-items-center">
                <select
                  v-model="item.allocations[0].user"
                  class="form-select me-2"
                  style="width: 120px"
                >
                  <option disabled value="">--선택--</option>
                  <option v-for="(name, i) in userStore.names" :key="i" :value="name">
                    {{ name }}
                  </option>
                </select>
                <button
                  class="btn btn-outline-secondary btn-sm ms-2"
                  @click="enableDevideMode(index)"
                >
                  분배
                </button>
              </div>
            </template>
            <template v-else>
              <div
                v-for="(alloc, allocIdx) in item.allocations"
                :key="allocIdx"
                class="d-flex align-items-center mb-2"
              >
                <select
                  v-model="item.allocations[allocIdx].user"
                  class="form-select me-2"
                  style="width: 120px"
                >
                  <option disabled value="">--선택--</option>
                  <option v-for="(name, i) in userStore.names" :key="i" :value="name">
                    {{ name }}
                  </option>
                </select>
                <input
                  type="number"
                  :min="0.01"
                  :step="0.01"
                  :max="item.count - allocatedExcept(item, allocIdx)"
                  v-model.number="item.allocations[allocIdx].count"
                  class="form-control me-2"
                  style="width: 70px"
                />
                <button
                  v-if="item.allocations.length > 1"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeAllocation(index, allocIdx)"
                >
                  -
                </button>
              </div>
              <button
                v-if="allocatedTotal(item) < item.count"
                class="btn btn-outline-primary btn-sm mt-1"
                @click="addAllocation(index)"
              >
                + 추가
              </button>
              <div v-if="allocatedTotal(item) > item.count" class="text-danger small mt-1">
                할당 수량이 초과되었습니다.
              </div>
            </template>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="mt-4">
      <button class="btn btn-primary" @click="handleSave">저장하기</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTransactionStore } from '@/stores/transactionStore'
import { useUserStore } from '@/stores/userStore'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const transactionStore = useTransactionStore()
const userStore = useUserStore()

// 타입 명시
interface Allocation {
  user: string
  count: number
}
interface ItemWithAllocations {
  name: string
  count: number
  price: number
  buyers: string[]
  allocations: Allocation[]
  devideMode: boolean
}

// 초기화: 각 품목별로 allocations 배열 생성 (기본 1명, 전체 수량), devideMode 추가
const itemsWithAllocations = reactive<ItemWithAllocations[]>(
  transactionStore.items.map((item) => ({
    ...item,
    allocations: [{ user: '', count: item.count }],
    devideMode: false,
  })),
)

function enableDevideMode(itemIdx: number) {
  const item = itemsWithAllocations[itemIdx]
  // 분배 인원 수 입력 (prompt 사용, 추후 모달로 개선 가능)
  let n = parseInt(prompt('몇 명으로 나누시겠습니까? (2 이상)', '2') || '2', 10)
  if (isNaN(n) || n < 2) n = 2
  item.devideMode = true
  // 1/n로 자동 분배 (소수점 3자리까지)
  const base = Math.floor((item.count / n) * 1000) / 1000
  const remain = item.count - base * (n - 1)
  item.allocations = Array.from({ length: n }, (_, i) => ({
    user: '',
    count: i === n - 1 ? parseFloat(remain.toFixed(3)) : base,
  }))
}

function addAllocation(itemIdx: number) {
  const item = itemsWithAllocations[itemIdx]
  const remain = item.count - allocatedTotal(item)
  if (remain > 0) {
    item.allocations.push({ user: '', count: remain })
  }
}
function removeAllocation(itemIdx: number, allocIdx: number) {
  const item = itemsWithAllocations[itemIdx]
  item.allocations.splice(allocIdx, 1)
}
function allocatedTotal(item: ItemWithAllocations) {
  return item.allocations.reduce((sum: number, a: Allocation) => sum + (a.count || 0), 0)
}
function allocatedExcept(item: ItemWithAllocations, exceptIdx: number) {
  return item.allocations.reduce(
    (sum: number, a: Allocation, idx: number) => sum + (idx !== exceptIdx ? a.count || 0 : 0),
    0,
  )
}

const handleSave = () => {
  // 저장 시 allocations만 추출해서 store에 저장
  const buyers = itemsWithAllocations.map((item) => item.allocations)
  transactionStore.setBuyers(buyers)
  router.push('/result')
}
</script>
