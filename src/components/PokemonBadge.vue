<template>
    <div>
        <div class="card w-96 bg-base-100 card-md shadow-sm">
            <div class="card-body">
                <h2 class="card-title text-fuchsia-600">Pokemons</h2>
                <div class="flex max-w-96 flex-wrap">
                    <div class="badge badge-primary inline m-1.5" v-for="pokemon in pokemonsList">{{ pokemon }}</div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>

import { onBeforeMount, ref } from "vue";

const pokemonsList = ref([]);

async function retrievePokemons() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const data = await response.json();
  return data.results; // on renvoie directement le tableau results
}

function extractPokemonsName(pokemons) {
  return pokemons.map((pokemon) => pokemon.name);
}

onBeforeMount(async () => {
  const pokemons = await retrievePokemons();
  pokemonsList.value = extractPokemonsName(pokemons);
  console.log(pokemonsList.value);
});

</script>