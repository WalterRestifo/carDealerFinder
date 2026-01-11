<script setup lang="ts">
import type { CarDealer } from "~~/server/types";

defineProps<{
  carDealer: CarDealer;
}>();
</script>

<template>
  <li>
    <p>{{ carDealer.dealerName }}</p>
    <span>{{ carDealer.carType }}</span>
  </li>
</template>
