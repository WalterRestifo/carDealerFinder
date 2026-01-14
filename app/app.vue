<script setup lang="ts">
import type { CarDealer } from "~~/server/types";
import { exportToExcel } from "./utils";
import CarDealerItem from "./components/CarDealerItem.vue";
import SearchBar from "./components/SearchBar.vue";
import Button from "./components/Button.vue";

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
    <div
      class="bg-linear-to-r from-black/95 via-black/90 via-100% lg:via-black/90 lg:via-40% to-transparent h-screen flex"
    >
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
        <Button
          v-if="carDealerList.length > 0"
          text="Download Excel File"
          :clickCallback="() => exportToExcel(carDealerList)"
        />
      </div>
    </div>
  </div>
</template>
