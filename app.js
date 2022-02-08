let shiny = false;
let img = "front_default";

const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(251).fill().map((_, index) =>
  (fetch(getPokemonUrl(index + 1)).then(response => response.json()))
)

const generateHTML = pokemons => {
  return pokemons.reduce((accumulator, { name, id, types, sprites }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name);

    accumulator += `
      <li class="card ${elementTypes[0]}">
      <img class="card-image" alt="${name}" src="${sprites.other.home[img]}"</img>
        <h2 class="card-title">${id}. ${name}</h2>
        <p class="card-subtitle">${elementTypes.join(" | ")}</p>
      </li>
    `
    return accumulator
  }, "")
}

const insertPokemonsIntoPage = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]')
  ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromises()

function showShiny() {
  if (this.shiny === true) {
    this.shiny = false;
    var pokemons = document.querySelectorAll(".card-image");
    for (let i = 0; i <= pokemons.length; i++) {
      var image = pokemons[i],src = pokemons[i].src
      image.src = src.replace("home/shiny/", "home/");
    }
  } else {
    this.shiny = true;
    var pokemons = document.querySelectorAll(".card-image");
    for (let i = 0; i <= pokemons.length; i++) {
      var image = pokemons[i],src = pokemons[i].src
      image.src = src.replace("home/","home/shiny/");
    }
  }
}

Promise.all(pokemonPromises)
  .then(generateHTML)
  .then(insertPokemonsIntoPage)



