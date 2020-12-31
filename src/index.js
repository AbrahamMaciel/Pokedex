/* eslint linebreak-style: [0] */

function showTotalPokemons(totalPokemons) {
  const $target = document.querySelector('#total-pokemons');
  $target.textContent = `There are ${totalPokemons} Pokemons!`;
}

function createPokemonCard(pokemon) {
  const { name, sprites: { other: { 'official-artwork': { front_default: pokemonImage } } } } = pokemon;

  const $target = document.querySelector('#pokemon-index');

  const $col = document.createElement('div');
  $col.setAttribute('class', 'col-sm-3');

  const $card = document.createElement('div');
  $card.setAttribute('class', 'card mt-3');
  $card.setAttribute('style', 'width: 15rem');

  const $cardImg = document.createElement('img');
  $cardImg.setAttribute('src', pokemonImage);
  $cardImg.setAttribute('alt', `Image of ${name}`);
  $cardImg.setAttribute('class', 'card-img-top');

  const $cardBody = document.createElement('div');
  $cardBody.setAttribute('class', 'card-body');

  const $cardText = document.createElement('p');
  $cardText.setAttribute('class', 'card-text');
  $cardText.setAttribute('id', 'pokemon-name');

  const $headerText = document.createElement('h5');
  $headerText.innerText = name.charAt(0).toUpperCase() + name.slice(1);

  $cardText.appendChild($headerText);
  $cardBody.appendChild($cardText);
  $card.appendChild($cardImg);
  $card.appendChild($cardBody);
  $col.appendChild($card);

  $target.appendChild($col);
}

function handleSelection() {
  const $list = document.querySelectorAll('.card');
  console.log($list);
}

function redirectTo() {
  console.log('qe onda redirect');
}

function loadPokemon(name) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((r) => (r.json()))
    .then((pokemon) => {
      createPokemonCard(pokemon);
    });
}

function showPokemonsList(pokemons) {
  pokemons.forEach((pokemon) => {
    const { name } = pokemon;
    loadPokemon(name);
  });
}

function initialize() {
  fetch('https://pokeapi.co/api/v2/pokemon')
    .then((r) => r.json())
    .then((r) => {
      // This is Destructuring assignment.
      const { count: totalPokemons, results: pokemonsList } = r;
      showTotalPokemons(totalPokemons);
      showPokemonsList(pokemonsList);
    });
}

initialize();
