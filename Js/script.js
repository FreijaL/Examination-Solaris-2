const URL = 'https://majazocom.github.io/Data/solaris.json';
//const inputBtn = document.querySelector('.input-btn');
let planetsArray = [];
const inputField = document.querySelector('.input-search');
const ulContainer = document.querySelector('.input-search-results');
let planetEl;


// Hämtar data från API
async function getApi() {
    let response = await fetch(URL);
    planetsArray = await response.json();
    renderOut(planetsArray)
    return planetsArray;
};
getApi();


// Gör om datan till enskilda planeter och skicka vidare informationen till de andra funktionerna
async function getPlanets() {
    let planets = await getApi();

    planetsArray.map(function(planet) {
        renderPlanets(planet);
        //renderPlanetsLi(planet);
        //planetsArray.push(planet);
        return planet;
    });
};
getPlanets();


// Renderar ut planeterna i UI
function renderPlanets(planet) {
    const mainEl = document.querySelector('.planets-container');
    const planetEl = document.createElement('article');
    planetEl.classList.add('planet', `planet-${planet.id}`, `${planet.id}`);
    mainEl.appendChild(planetEl);

    // Vid klick på planeterna öppnas Modalen
    planetEl.addEventListener('click', () => {
        openModal(planet);
        console.log(planet)
    })
};


// Renderar ut planerna i söklistan
function renderOut(planets) {
    ulContainer.innerHTML = '';
    planets.forEach(planet => {
        planetEl = document.createElement('li');
        planetEl.classList.add('notShowing', `${planet.id}`);
        planetEl.innerHTML = `<p>${planet.name}</p>`;
        planetEl.addEventListener('click', function() {
            //console.log(planet);
            openModal(planet);
        })
        ulContainer.appendChild(planetEl);
    })
};



// Jämför input-fältets värde med arrayens innehåll
inputField.addEventListener('keyup', function() {
    let input = inputField.value;
    //console.log(input);
    let matchedPlanet = [];
    // gå igenom listan med planet och kollar om något name inkluderar inputen
    planetsArray.forEach(planet => {
        // om det inkluderar inputen skall vi lägga in planeten i matchedPlanet
        if (planet.name.toLowerCase().includes(input.toLowerCase())){
            planetEl.classList.add('showing');
            matchedPlanet.push(planet);

            console.log(matchedPlanet);
        }
    });
    if (matchedPlanet.length > 0) {
        planetEl.classList.add('showing');
        renderOut(matchedPlanet);
        matchedPlanet.forEach(planet => {
            planetEl.classList.remove('notShowing');
            planetEl.classList.add('showing');
        })
    } else {
        // inga matchningar
        ulContainer.innerHTML = 'Inga matchningar hittades';
    };
});




// Funktionen som får modalen att visas / stängas samt renderar ut planeterns information
function openModal(planet) {
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.close-modal');

    modal.style.display = 'flex';
    document.querySelector('.planet-name').innerHTML = planet.name;
    document.querySelector('.planet-name-latin').innerHTML = planet.latinName;
    document.querySelector('.planet-text').innerHTML = planet.desc;
    document.querySelector('.planet-circumference').innerHTML = planet.circumference;
    document.querySelector('.planet-distance').innerHTML = planet.distance;
    document.querySelector('.planet-max-temp').innerHTML = planet.temp.day;
    document.querySelector('.planet-min-temp').innerHTML = planet.temp.night;
    document.querySelector('.planet-orbital-period').innerHTML = planet.orbitalPeriod;
    document.querySelector('.planet-moons').innerHTML = planet.moons.map((moon) => moon).join(' | ');

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        };
    });
};


// EventListener på pilarna för att byta modal/planet
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
arrowLeft.addEventListener('click', () => {
    let openModal = openModal(planet).findIndex
})




