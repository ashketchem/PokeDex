const maxPokemon = 189; 
/* 1304*/
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");

let allPokemons = [];

// Fetching data from API

/*fetch(`https://pokeapi.co/api/v2/pokemon?limit=${maxPokemon}&offset=0`)
  .then((response) => {
    if (!response.ok)  {
      throw new Error("Network response was not ok");
    } return response.json();
 })
  .then((data) => {
    allPokemons = data.results;
    console.log(fetch);
    displaypokemons(allPokemons);
})
  .catch((error) => {
    console.error("Error fetching data:", error);
  })*/

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${maxPokemon}`)
  .then((response) => response.json() )
  .then((data) => {
    allPokemons = data.results;      displaypokemons(allPokemons);
                  }
);

async function fetchPokemonBeforeRedirect(id) {
 try {
   const [pokemon,  pokemonSpecies] = await Promise.all([
fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => 
   res.json()
),     fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) => 
res.json()
),
   ]);
   return true;
 } catch (error) {
   console.error("Failed to fetch pokemon data before redirect",  error);
  }
}

function displaypokemons(pokemon) {
  listWrapper.innerHTML = "";
  
  pokemon.forEach((pokemon) => {
    const pokemonId = pokemon.url.split("/")[6];
    const listItem = document.createElement('div');
    listItem.className = "list-item";
    listItem.innerHTML = `
     <div class="number-wrap">
     <p class="caption-fonts">#${pokemonId}</p>
     </div>
     <div class="img-wrap">
     <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg" alt="${pokemon.name}" />
     </div>
     <div class="name-wrap">
     <p class="body3-fonts">#${pokemon.name}</p>
     </div>
    `;
    listItem.addEventListener("click", async () => {
      const success = await fetchPokemonBeforeRedirect(pokemonId);
      if (success) {
  window.location.href = `./pokemon.html?id=${pokemonId}`;
}
    }); listWrapper.appendChild(listItem);
  });
}

searchInput. addEventListener("keyup", handelSearch);

function handelSearch() {
   const searchTerm = searchInput.value.toLowerCase();
  let filteredPokemons;

  if (numberFilter.checked) {
    filteredPokemons = allPokemons.filter((pokemon) => {
  const pokemonId = pokemon.url.split("/")[6];
      return pokemonId.startsWith(searchTerm);
});
  } else if (nameFilter.checked) {
     filteredPokemons = allPokemons.filter((pokemon) =>
  {
   return pokemon.name .toLowerCase().startsWith(searchTerm)
 });
} else {
    filteredPokemons = allPokemons;
}
  
displaypokemons(filteredPokemons);

if (filteredPokemons.length === 0) {
  notFoundMessage.style.display = "block";
} else {
  notFoundMessage.style.display = "none"
}
}


console.log(`123456`);