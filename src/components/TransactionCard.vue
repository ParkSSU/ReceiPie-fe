<template>
  <div class="col">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title fw-bold mb-2">{{ title }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ date }}</h6>
        <p class="card-text text-muted">People: {{ participants.join(', ') }}</p>

        <router-link :to="'/edit'" class="me-3">Edit</router-link>
        <router-link :to="'/result'">Result</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  date: string
  participants: string[]
}>()
</script>
