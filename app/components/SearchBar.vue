<script setup lang="ts">
import { ref } from "vue";
import Button from "./Button.vue";

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
  <label for="searchInput" class="text-white">Stadt oder PLZ eingeben:</label>
  <div class="flex gap-2 flex-wrap">
    <input
      id="searchInput"
      type="text"
      v-model="searchInput"
      placeholder="Stadt oder PLZ"
      class="border border-white rounded px-2 py-1 flex-1 placeholder-white text-white"
    />
    <Button
      :text="loading ? 'Suchen...' : 'Suche'"
      :clickCallback="search"
      :disabled="loading"
    />
  </div>
</template>
