const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

// Id primário do Pokemon
let searchPokemon = 1;

// Consumo e manipulação da API 'Promise' await irá esperar a resposta da API
// Função asyncrona
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    // Extrair os dados em Json
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {
// Indica o carregamento do meu search na API
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  // Verifica o meu If e me retorna os dados ao meu Front nome/id/Img...
  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    // Acessa as chaves para buscar a img do Pokemon
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

// Envia os dados para efetuar a pesquisa
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // Para não ocorrer erro na pesquisa iremos passar tudo para minúsculo
  renderPokemon(input.value.toLowerCase());
});

// Button de contagem -1 ao id do Pokemon 'Contador'
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

// Button de contagem +1 ao id do Pokemon 'Contador'
buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
