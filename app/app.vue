<script setup lang="ts">
import type { CarDealer } from "~~/server/types";
import { exportToExcel } from "./utils";
import CarDealerItem from "./components/CarDealerItem.vue";
import SearchBar from "./components/SearchBar.vue";

const searchInput = ref("");
const loading = ref(false);
const carDealerList = ref<CarDealer[]>([]);

const searchCarDealers = async (searchParam: string) => {
  carDealerList.value = [];

  const fetchData = async () => {
    loading.value = true;

    try {
      return await $fetch("/api/getCarDealers", {
        query: {
          search: searchParam,
        },
      });
    } catch (err) {
      console.log(err);
      return [];
    } finally {
      loading.value = false;
    }
  };

  return (await fetchData()) || [];
};

const updateData = (data: CarDealer[]) => (carDealerList.value = data);
</script>

<template>
  <div class="space-y-4">
    <SearchBar :searchFunction="searchCarDealers" @update:data="updateData" />
    <ul>
      <CarDealerItem
        v-for="carDealer in carDealerList"
        :key="carDealer.carType + carDealer.dealerName"
        :carDealer="carDealer"
      />
    </ul>
    <button
      v-if="carDealerList.length > 0"
      @click="exportToExcel(carDealerList)"
    >
      Download Excel File
    </button>
  </div>
</template>
