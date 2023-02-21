const URL = 'https://majazocom.github.io/Data/solaris.json';
const inputBtn = document.querySelector('.input-btn');


// Hämtar data från API
async function getApi() {
    let response = await fetch(URL);
    let data = await response.json();
    return data;
};
getApi();


// Gör om datan till enskilda planeter
async function getPlanets() {
    let planets = await getApi();

    planets.map(function(planet) {
        renderPlanets(planet);
        searchInput(planet);
        return planet;
    });
};
getPlanets();


// Renderar ut planeterna i UI
function renderPlanets(planet) {
    const mainEl = document.querySelector('.planets-container');
    let planetEl = document.createElement('article');
    planetEl.classList.add('planet', `planet-${planet.id}`);
    mainEl.appendChild(planetEl);

    
    // Vid klick på planeterna öppnas Modalen
    planetEl.addEventListener('click', () => {
        openModal(planet);
        console.log(planet)
    })
};


// Funktionen som får modalen att visas / stängas samt renderar ut planeterns information
function openModal(planet) {
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.close-modal');

    modal.style.display = 'flex';
    //console.log('hjehje');
    document.querySelector('.planet-name').innerHTML = planet.name;
    document.querySelector('.planet-name-latin').innerHTML = planet.latinName;
    document.querySelector('.planet-text').innerHTML = planet.desc;
    document.querySelector('.planet-circumference').innerHTML = planet.circumference;
    document.querySelector('.planet-distance').innerHTML = planet.distance;
    document.querySelector('.planet-max-temp').innerHTML = planet.temp.day;
    document.querySelector('.planet-min-temp').innerHTML = planet.temp.night;

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        };
    });
};



inputBtn.addEventListener('click', () => {
    console.log(searchInput());
});

function searchInput(planet) {
    let inputSearch = document.querySelector('.input-search').value;
    let planetName = planet.name;

    if (inputSearch == planetName) {
        console.log(planetName);
    } else {
        console.log('najj');
    }

    return inputSearch;

};
//searchInput();