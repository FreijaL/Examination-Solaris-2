// --- TO DO ---
// Få bort sökreslutatet även när man raderat inputField 
// Rensa sökfältet om man klickar utanför listan
// Få klick utanför modal att funka ordentligt
// Gör en ring runt saturnus
// Få namen att duka upp när man hovrar över planeterna


const URL = 'https://majazocom.github.io/Data/solaris.json';
let planetsArray = [];
const inputField = document.querySelector('.input-search');
const ulContainer = document.querySelector('.input-search-results');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
let currentPlanetIndex;
let planetEl;


// Hämtar data från API
async function getApi() {
    let response = await fetch(URL);
    planetsArray = await response.json();
    return planetsArray;
};
getApi();


// Gör om datan till enskilda planeter och skicka vidare informationen till de andra funktionerna
async function getPlanets() {
    let planets = await getApi();

    planetsArray.map(function(planet) {
        renderPlanetsUI(planet);
        return planet;
    });
};
getPlanets();


// Renderar ut planeterna i UI
function renderPlanetsUI(planet) {
    const mainEl = document.querySelector('.planets-container');
    const planetEl = document.createElement('article');
    planetEl.classList.add('planet', `planet-${planet.id}`);
    planetEl.innerHTML = `<h2 class="planet-name-h2">${planet.name}</h2>`
    mainEl.appendChild(planetEl);

    // Vid klick på planeterna öppnas Modalen
    planetEl.addEventListener('click', () => {
        openModal(planet);
        console.log(planet)
    })
};


function renderOutMatch(planets) {
    ulContainer.innerHTML = '';
    planets.forEach(planet => {
        planetEl = document.createElement('li');
        planetEl.classList.add(`${planet.id}`);
        planetEl.innerHTML = `${planet.name}`;
        planetEl.addEventListener('click', function() {
            openModal(planet);
        })
        ulContainer.appendChild(planetEl);
    })
};


// Jämför input-fältets värde med arrayens innehåll
inputField.addEventListener('keyup', function() {
    let input = inputField.value;
    let matchedPlanet = [];
    // gå igenom listan med planet och kollar om något name inkluderar inputen
    planetsArray.forEach(planet => {
        // om det inkluderar inputen skall vi lägga in planeten i matchedPlanet
        if (planet.name.toLowerCase().includes(input.toLowerCase()) && input.length >= 1){
            matchedPlanet.push(planet);
        }
    });
    if (matchedPlanet.length > 0) {
        renderOutMatch(matchedPlanet);
    } else {
        // inga matchningar
        ulContainer.innerHTML = 'Inga matchningar hittades';
    };
});


// Funktionen som får modalen att visas / stängas samt renderar ut planeterns information
function openModal(planet) {
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.close-modal');
    const planetFigure = document.querySelector('.figure');

    modal.style.display = 'flex';
    let modalImg = document.createElement('div');
    modalImg.classList.add('modal-img', `modal-img-${planet.id}`);
    planetFigure.appendChild(modalImg);
    
    document.querySelector('.planet-name').innerHTML = planet.name;
    document.querySelector('.planet-name-latin').innerHTML = planet.latinName;
    document.querySelector('.planet-text').innerHTML = planet.desc;
    document.querySelector('.planet-circumference').innerHTML = planet.circumference;
    document.querySelector('.planet-distance').innerHTML = planet.distance;
    document.querySelector('.planet-max-temp').innerHTML = planet.temp.day;
    document.querySelector('.planet-min-temp').innerHTML = planet.temp.night;
    document.querySelector('.planet-orbital-period').innerHTML = planet.orbitalPeriod;
    document.querySelector('.planet-moons').innerHTML = planet.moons.map((moon) => moon).join('&#160 &#160 &#160');

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        };
    });

    makeArrowWork(planet);
};


// EventListener på pilarna för att byta modal/planet  --- fungerar ej vid sök 
function makeArrowWork(planet) {
    currentPlanetIndex = planetsArray.findIndex(p => p.id === planet.id);
};

arrowLeft.addEventListener('click', () => {
    openModal(planetsArray[currentPlanetIndex - 1]);
});

arrowRight.addEventListener('click', () => {
    openModal(planetsArray[currentPlanetIndex + 1]);
});