const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(251).fill().map((_, index) =>
  (fetch(getPokemonUrl(index + 1)).then(response => response.json()))
)

const generateHTML = pokemons => {
  return pokemons.reduce((accumulator, { name, id, types, sprites }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)

    console.log(pokemons)
    accumulator += `
      <li class="card ${elementTypes[0]}">
      <img class="card-image alt="${name}" src="${sprites.other["official-artwork"].front_default}"</img>
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

Promise.all(pokemonPromises)
  .then(generateHTML)
  .then(insertPokemonsIntoPage)
