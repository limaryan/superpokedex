const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const bPrev = document.querySelector('.btn-prev');
const bNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (apiResponse.status == 200){
        const data = await apiResponse.json();

        return data;
    } 

    
}

const renderPokemon = async (pokemon) => {
    
    pokemonName.innerHTML = 'Carregando...';

    const data = await fetchPokemon(pokemon);

    if (data){
        pokemonImage.style.display ='block';

        pokemonName.innerHTML = data.name;
    
        pokemonNumber.innerHTML = data.id;
    
        pokemonImage.src = data['sprites']['versions']['generation-viii']['icons']['front_default'];
    
        searchPokemon = data.id;

        input.value = '';
    } else {
        pokemonImage.style.display = 'none';

        pokemonName.innerHTML = 'Not founded ;c';

        pokemonNumber.innerHTML = '';
    }

    

}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});

bPrev.addEventListener('click', () => {
    searchPokemon -=1
    renderPokemon(searchPokemon);
});

bNext.addEventListener('click', () => {
    if (searchPokemon >1 ){
        searchPokemon +=1
        renderPokemon(searchPokemon);
    }
});

renderPokemon(searchPokemon);

