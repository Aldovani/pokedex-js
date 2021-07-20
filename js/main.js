const $div = document.querySelector(".container");
let contI = 1;
let n = 24;

window.onload = pokemon;

async function pokemon() {
  const pokemon = await getPokemon(n);
  pokemon.map((e) => createCard(e));
}

async function getPokemon(textNumber, nome = "") {
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
  const { id, types, stats, name, sprites } = pokemon;

  let listStatsElement = "";
  let listTypesElement = "";
  const idConvertido = id < 100 ? `${id}`.padStart(3, "0") : id;

  for (const state of stats) {
    listStatsElement += `<li>${state.stat.name}:${state.base_stat} </li>
    `;
  }

  for (const tipos of types) {
    listTypesElement += `
          <li class="types" data-type="${tipos.type.name}">
              ${tipos.type.name}
          </li>
  `;
  }

  const card = `
  <div class="card"  tabindex="0">

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

  $div.innerHTML += card;
}

// =============== infinite scroll ===============
const observer = new IntersectionObserver((e) => {
  if (e[0].isIntersecting) {
    document.querySelector(".loading").classList.add("show");
    setTimeout(() => {
      pokemon();
      document.querySelector(".loading").classList.remove("show");
    }, 2000);
  }
});

observer.observe(document.querySelector(".observer"));
observer.observe(document.querySelector(".button-to-top"));

// =============== dark mode ===============

const input = document.querySelector("input");
if (localStorage.getItem("darkMod")) {
  if (localStorage.getItem("darkMod") == "true") input.checked = true;
} else {
  localStorage.setItem("darkMod", false);
  input.checked = false;
}

function dark() {
  if (input.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMod", true);
  } else {
    localStorage.setItem("darkMod", false);
    document.body.classList.remove("dark-mode");
  }
}
dark();

input.addEventListener("change", dark);

window.addEventListener("scroll", () => {
  if (window.scrollY >= 1000) {
    document.querySelector(".button-to-top").classList.add("show");
  } else {
    document.querySelector(".button-to-top").classList.remove("show");
  }
});
