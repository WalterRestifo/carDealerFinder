<script setup lang="ts">
import type { CarDealer } from "~~/server/types";

defineProps<{
  clickCallback: () => void;
  text: string;
  disabled?: boolean;
}>();
</script>

<template>
  <button
    class="bg-blue-500 text-white px-4 py-1 rounded border border-white"
    @click="clickCallback"
    :disabled="disabled"
  >
    {{ text }}
  </button>
</template>
