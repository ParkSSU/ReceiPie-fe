<template>
  <div class="container mt-4">
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="howManyPeople" class="form-label">Enter number</label>
        <input
          type="number"
          class="form-control"
          id="howManyPeople"
          v-model.number="peopleCount"
          min="1"
        />
        <div class="form-text">How many people are you?</div>
      </div>

      <div v-for="(name, index) in names" :key="index" class="mb-2">
        <label :for="`name-${index}`" class="form-label small mb-1">Name {{ index + 1 }}</label>
        <input
          type="text"
          class="form-control"
          :id="`name-${index}`"
          v-model="names[index]"
          placeholder="Enter name"
        />
      </div>

      <div class="mt-4">
        <button type="submit" class="btn btn-secondary me-2" :disabled="!isFormValid">
          Submit
        </button>
        <router-link to="/" class="btn btn-secondary">Back to Home</router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { watch, computed } from 'vue'
import { useUserStore } from '@/stores/userStore.ts'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

// 스토어 값들을 computed로 연결
const peopleCount = computed<number>({
  get: () => userStore.peopleCount,
  set: (val: number) => userStore.setPeopleCount(val),
})

const names = computed<string[]>(() => userStore.names)

// 사람 수 변경 시 이름 배열 길이 조정
watch(peopleCount, (newVal: number) => {
  if (newVal < 0) {
    peopleCount.value = 0
    userStore.setNames([])
  } else {
    const updatedNames = Array.from({ length: newVal }, (_, i) => userStore.names[i] || '')
    userStore.setNames(updatedNames)
  }
})

// 모든 이름이 비어있지 않으면 유효
const isFormValid = computed<boolean>(() => {
  return names.value.length > 0 && names.value.every((name: string) => name.trim() !== '')
})

const handleSubmit = (): void => {
  const confirmed = confirm(`저장할까요?\n인원 : ${userStore.names.join(', ')}`)
  if (confirmed) {
    router.push('/edit')
  }
}
</script>
