const div = document.querySelector(".container");
const button = document.querySelector("button");
let contI = 1;
let n = 24;

document.querySelector("script").addEventListener("load",pokemon);
button.addEventListener("click", (e) => {
  e.preventDefault();
  pokemon();
});
async function pokemon() {
  const pokemon = await getPokemon(n);
  pokemon.map((e) => {
    createCard(e);
  });
}
async function getPokemon(txt) {
  let pokemonList = [];
  for (contI; contI <= Number(txt); contI++) {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${contI}`)
      .then((response) => response.json())
      .then((pokemon) => pokemon)
      .catch((err) => {
        console.log(err);
       
      });
      pokemonList.push(pokemon);
  }
  n += 12;
  return pokemonList;
}

function createCard(pokemon) {
  let listStatsElement = "";
  let listTypesElement = "";
  let idConvertido = "";

  const { id, types, stats } = pokemon;

  if (id < 100) {
    idConvertido = `${id}`.padStart(3, "0");
  } else {
    idConvertido = id;
  }

  for (const state of stats) {
    listStatsElement += `
    <li>
      <p>${state.stat.name}: </p>
      <p>${state.base_stat}</p>
    </li>
    `;
  }

  for (const tipos of types) {
    listTypesElement += `
          <li class="tipos" data-tipo="${tipos.type.name}">
              ${tipos.type.name}
          </li>
  `;
  }

  const card = `
  <div class="pokemon" tabindex="1">

    <img src="${pokemon.sprites.front_default}"/>
    <section class="info section">
      <span class="idPokemon" >#${idConvertido}</span>
      <h3 class="namePokemon" >${pokemon.name}</h3>
      <ol>
        ${listTypesElement}  
      </ol>
    </section>
    <section class="stats section ">
      <ol>
        ${listStatsElement}
      </ol>
    </section>
  </div>`;

  div.innerHTML += card;
}
