const pokemonInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const spriteContainer = document.getElementById("sprite-container");
const sprite = document.getElementById("sprite");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defence = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefence = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const searchForm = document.getElementById("search-form");

// async fun API call to get pokempn data
const getPokemon = async () => {
  try {
    const pokemonNameorId = pokemonInput.value.toLowerCase();
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameorId}`
    );
    const data = await response.json();

    //set pokemon info
    pokemonName.textContent = `${data.name.toUpperCase()}`;
    pokemonId.textContent = `#${data.id}`;
    weight.textContent = `Weight:${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    spriteContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">`;

    //setting stats
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defence.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefence.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;

    // setting types
    types.innerHTML = data.types
      .map(
        (obj) => `<span class="type ${obj.type.name}">${obj.type.name}</span>`
      )
      .join("");
  } catch (err) {
    resetDisplay();
    alert("Pokemon not found");
    console.log(`pokemon not found: ${err}`);
  }
};

//fucntion to reset display

const resetDisplay = () => {
  if (sprite && sprite.parentNode) {
    sprite.parentNode.removeChild(sprite);
  }
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  weight.textContent = "";
  height.textContent = "";
  spriteContainer.innerHTML = "";
  hp.textContent = "";
  attack.textContent = "";
  defence.textContent = "";
  specialAttack.textContent = "";
  specialDefence.textContent = "";
  speed.textContent = "";
  types.innerHTML = "";
};

//resetting stats

//event listener for button

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getPokemon();
});
