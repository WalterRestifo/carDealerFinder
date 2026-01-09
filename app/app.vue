<script setup lang="ts">
const searchInput = ref("");
const loading = ref(false);
const data = ref([]);

function search() {
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
    <br />
    <button @click="search">Search</button>
  </div>
</template>
