<template>
    <div>
        <div class="card w-96 bg-base-100 card-md shadow-sm">
            <div class="card-body">
                <h2 class="card-title text-fuchsia-600">Météo</h2>
                <div class="flex flex-col max-w-96 flex-wrap">
                    <div class="card m-1.5"> Température maximum : {{ meteoInfo.maxTemp }}</div>
                    <div class="card m-1.5"> Température minimum : {{ meteoInfo.minTemp }}</div>
                    <div class="card m-1.5"> Température actuelle : {{ meteoInfo.currTemp }}</div>
                    <div class="card m-1.5"> Température actuelle : {{ meteoInfo.condition }}</div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>

import { onBeforeMount, ref } from "vue";

const meteoInfo = ref([]);

async function retrieveMeteo() {
  const response = await fetch("https://prevision-meteo.ch/services/json/toulouse");
  const data = await response.json();
  return data; // on renvoie directement le tableau results
}

function extractMeteoInfo(meteo) {
  return {
    maxTemp: meteo.fcst_day_0.tmax,
    minTemp: meteo.fcst_day_0.tmin,
    currTemp: meteo.current_condition.tmp,
    condition: meteo.current_condition.condition
  }
}

onBeforeMount(async () => {
  const meteo = await retrieveMeteo();
  meteoInfo.value = extractMeteoInfo(meteo);
  console.log(meteoInfo.value);
});

</script>