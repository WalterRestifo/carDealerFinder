<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  searchFunction: (searchParam: string) => Promise<any[]>;
}>();

const emit = defineEmits<{
  (e: "update:data", data: any[]): void;
}>();

const searchInput = ref("");
const loading = ref(false);

const search = async () => {
  // clear previous results
  emit("update:data", []);
  loading.value = true;

  try {
    const results = await props.searchFunction(searchInput.value);
    emit("update:data", results);
  } catch (err) {
    console.error(err);
    emit("update:data", []);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex gap-2">
    <input
      type="text"
      v-model="searchInput"
      placeholder="Enter search"
      class="border rounded px-2 py-1 flex-1"
    />
    <button
      @click="search"
      class="bg-blue-500 text-white px-4 py-1 rounded"
      :disabled="loading"
    >
      {{ loading ? "Searching..." : "Search" }}
    </button>
  </div>
</template>
