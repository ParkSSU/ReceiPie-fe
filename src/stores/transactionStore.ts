import { defineStore } from 'pinia'
import { ref } from 'vue'

// 품목(Item) 타입 정의
export interface Item {
  name: string
  count: number
  price: number
  buyers: string[] // 각 품목의 구매자
}

// 트랜잭션 정보 타입 정의
interface TransactionData {
  items: Item[]
  total_price: number
  store: string
  date: string
}

export const useTransactionStore = defineStore('transaction', () => {
  // 샘플
  const items = ref<Item[]>([
    { name: '플러스한판 (3-4인,800g)', count: 1, price: 44000, buyers: [] },
    { name: '공기밥', count: 5, price: 1000, buyers: [] },
    { name: '차돌된장찌개', count: 1, price: 5000, buyers: [] },
    { name: '삼겹살 (200g)', count: 2, price: 12000, buyers: [] },
    { name: '숙성김치', count: 1, price: 1000, buyers: [] },
  ])

  const totalPrice = ref<number>(0)
  const storeName = ref<string>('')
  const date = ref<string>('')
  const buyers = ref<string[]>([])

  /**
   * 거래 데이터 상태 업데이트
   */
  const setTransactionData = (data: TransactionData) => {
    items.value = data.items
    totalPrice.value = data.total_price
    storeName.value = data.store
    date.value = data.date
  }

  /**
   * 참여자 정보 설정
   */
  const setBuyers = (newBuyers: string[]) => {
    buyers.value = newBuyers
  }

  /**
   * TODO: 유저 ID 기반으로 서버에서 영수증 데이터를 불러오기
   * 예: GET /api/receipts/:userId
   */
  // const fetchTransactionData = async () => {
  // TODO: axios 요청 구현
  // const response = await axios.get()
  // setTransactionData(response.data)
  // }

  return {
    items,
    totalPrice,
    storeName,
    date,
    buyers,
    setTransactionData,
    setBuyers,
    // fetchTransactionData,
  }
})
