<script setup lang="ts">
import type { CarDealer } from "~~/server/types";

const searchInput = ref("");
const loading = ref(false);
const data = ref<CarDealer[]>([]);

function search() {
  data.value = [];

  const fetchData = async () => {
    loading.value = true;

    try {
      data.value = await $fetch("/api/getCarDealers", {
        query: {
          search: searchInput.value,
        },
      });

      console.log("data.value: ", data.value);
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  fetchData();
}
</script>

<template>
  <div>
    <input type="text" v-model="searchInput" placeholder="city" />
    <button @click="search">Search</button>
  </div>
  <div
    v-for="carDealer in data"
    :key="carDealer.carType + carDealer.dealerName"
  >
    <p>{{ carDealer.dealerName }}</p>
    <span>{{ carDealer.carType }}</span>
  </div>
</template>
