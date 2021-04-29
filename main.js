const div = document.querySelector(".container");
const button = document.querySelector("button");
const input = document.querySelector("input");

button.addEventListener("click", async (e) => {
  e.preventDefault();
  if (input.value == "") return;
  const pokemon = await getPokemon(input.value);

  console.log(pokemon);
  createCard(pokemon);
  input.value = "";
});

async function getPokemon(txt) {
  const pokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${txt.toLocaleLowerCase()}`
  )
    .then((response) => response.json())
    .then((pokemon) => pokemon)
    .catch((err) => console.log(err));
  return pokemon;
}

function createCard(pokemon) {
  let listStatsElement = "";
  let listTypesElement = "";
  let idConvertido;

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
  <div class="pokemon" tabindex="45">

    <img src="${pokemon.sprites.front_default}"/>
    <section class="info">
      <span class="idPokemon" >#${idConvertido}</span>
      <h3>${pokemon.name}</h3>
      <ol>
        ${listTypesElement}  
      </ol>
    </section>
    <section class="stats">
      <ol>
        ${listStatsElement}
      </ol>
    </section>
  </div>
  
  
  `;

  div.innerHTML += card;
}

{
  /* <section class="stats">
<ol>
  ${listStatsElement}
</ol>
</section> */
}

// function createPokedex() {

//   pokemons.map((e) => {
//     const cardHtml = `
//     <li>
//     <h3>${e.name}</h3>
//     <img src="${e.sprites.front_default}" alt="sprit ${e.name}"/>

//     </li>
//     `;

//     return div.querySelector('ol').innerHTML+=cardHtml
//   })

// }
