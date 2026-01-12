<script setup lang="ts">
import type { CarDealer } from "~~/server/types";

defineProps<{
  carDealer: CarDealer;
}>();
</script>

<template>
  <li class="border border-white rounded-xl p-2">
    <span class="text-white">{{ carDealer.dealerName }}</span>
    <span class="text-white"> - {{ carDealer.carType }}</span>
  </li>
</template>
