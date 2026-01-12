<script setup lang="ts">
import type { CarDealer } from "~~/server/types";
import { exportToExcel } from "./utils";
import CarDealerItem from "./components/CarDealerItem.vue";
import SearchBar from "./components/SearchBar.vue";

const carDealerList = ref<CarDealer[]>([]);

const searchCarDealers = async (searchParam: string) => {
  carDealerList.value = [];

  const fetchData = async () => {
    try {
      return await $fetch("/api/getCarDealers", {
        query: {
          search: searchParam,
        },
      });
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  return (await fetchData()) || [];
};

const updateData = (data: CarDealer[]) => (carDealerList.value = data);
</script>

<template>
  <div class="bg-[url(/manSearchingForCar.png)] bg-cover h-screen">
    <div class="bg-linear-to-r from-black h-screen flex">
      <div
        class="space-y-4 border-3 w-5/6 lg:w-2/5 border-white/70 p-8 rounded-lg m-auto lg:m-0 flex flex-col h-full"
      >
        <h1 class="text-white">Händlersuche by Walter Restifo</h1>
        <SearchBar
          :searchFunction="searchCarDealers"
          @update:data="updateData"
        />
        <p class="text-white">Ergebnisse: {{ carDealerList.length }}</p>
        <ul class="h-full overflow-auto mb-8">
          <CarDealerItem
            v-for="carDealer in carDealerList"
            :key="carDealer.carType + carDealer.dealerName"
            :carDealer="carDealer"
          />
        </ul>
        <button
          class="bg-blue-500 text-white px-4 py-1 rounded border border-white"
          v-if="carDealerList.length > 0"
          @click="exportToExcel(carDealerList)"
        >
          Download Excel File
        </button>
      </div>
    </div>
  </div>
</template>
