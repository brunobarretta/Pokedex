const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

let image = "front_default";

const generatePokemonPromises = () => Array(251).fill().map((_, index) =>
  (fetch(getPokemonUrl(index + 1)).then(response => response.json()))
)

const generateHTML = pokemons => {
  return pokemons.reduce((accumulator, { name, id, types, sprites }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name);
    accumulator += `
      <li class="card ${elementTypes[0]}">
      <img class="card-image" alt="${name}" src="${sprites.other.home[image]}"</img>
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

var btn = document.querySelector("#shiny");
btn.addEventListener("click", function() {
  switch(window.localStorage.getItem('shiny')) {
    case 'true':
      window.localStorage.setItem('shiny', false);
      image = "front_default";
    break;
    case 'false':
      window.localStorage.setItem('shiny', true);
      image = "front_shiny";
    break;
    default:
      alert('erro');
    break;
  }
  Promise.all(pokemonPromises)
  .then(generateHTML)
  .then(insertPokemonsIntoPage)
});

Promise.all(pokemonPromises)
  .then(generateHTML)
  .then(insertPokemonsIntoPage)