const div = document.querySelector(".container");
const button = document.querySelector("button");
let contI = 1;
let n = 24;

window.onload = pokemon;

button.addEventListener("click", () => {
  button.style = "display:none";
  pokemon();
});

async function pokemon() {

  document.querySelector(".load").style = "display:block";
  const pokemon = await getPokemon(n);
  pokemon.map((e) => createCard(e));

  button.style = "display:block";
  document.querySelector(".load").style = "display:none ";
  if (contI > 898) {
    button.style = "display:none";
  }
}

async function getPokemon(textNumber ,nome='') {
  let pokemonList = [];
  for (contI; contI <= Number(textNumber) && contI <= 898; contI++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${contI}`);
    const pokemon = await response.json();
    pokemonList.push(pokemon);
  }
  n += 12;
  return pokemonList;
}

function createCard(pokemon) {
  let listStatsElement = "";
  let listTypesElement = "";
  let idConvertido = "";

  const { id, types, stats, name, sprites } = pokemon;

  id < 100 ? (idConvertido = `${id}`.padStart(3, "0")) : (idConvertido = id);

  for (const state of stats) {
    listStatsElement += `<li>${state.stat.name}:${state.base_stat} </li>
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
  <div class="pokemon" data-id-pokemon=${id} data-name-pokemon=${name} tabindex="0">

    <img
      title="${name}"
      alt="${name}" 
      src="${sprites.front_default}"
    />

    <section class="info section">
      <span class="idPokemon" >#${idConvertido}</span>
      <h3 class="namePokemon" >${name}</h3>
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
