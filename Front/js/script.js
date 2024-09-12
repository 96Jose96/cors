
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const charactersList = document.getElementById('charactersList');


async function fetchCharacters(name = '') {
  let url = 'http://localhost:3000/characters';
  if (name) {
    url += `?name=${name}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
      charactersList.innerHTML = `<p>No se encontraron personajes</p>`;
    } else {
      displayCharacters(data);
    }
  } catch (error) {
    charactersList.innerHTML = `<p>Error al obtener los personajes</p>`;
    console.error(error);
  }
}

function displayCharacters(characters) {
  charactersList.innerHTML = '';

  characters.forEach(character => {
    const { name, status, species, gender, origin, image } = character;

    const characterCard = document.createElement('div');
    characterCard.classList.add('character-card');

    characterCard.innerHTML = `
      <img src="${image}" alt="${name}">
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Estado:</strong> ${status}</p>
      <p><strong>Especie:</strong> ${species}</p>
      <p><strong>Género:</strong> ${gender}</p>
      <p><strong>Origen:</strong> ${origin.name}</p>
    `;

    charactersList.appendChild(characterCard);
  });
}

searchButton.addEventListener('click', () => {
  const characterName = searchInput.value;
  fetchCharacters(characterName);
});

window.addEventListener('load', () => {
  fetchCharacters();
});
