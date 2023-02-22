const URL = 'https://majazocom.github.io/Data/solaris.json';
const inputBtn = document.querySelector('.input-btn');
let planetsArray = [];


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
        //viewResults(planet);
        planetsArray.push(planet.name)
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


// Funktion som öppnas när användaren sökt på något som inte matchar
function openWrongInputModal() {

}


// Vid klick på search-knappen körs funktionen compareInput
inputBtn.addEventListener('click', () => {
    compareInput();
})


// Funktion som skapar list-item med planeterna när man söker
// function viewResults(planet) {
//     const resultsUl = document.querySelector('.input-search-results');
//     let resultsLi = document.createElement('li');
//     resultsLi.innerHTML = planet.id;
//     resultsUl.appendChild(resultsLi);
// };


// Funktion som jämför input-value med planetArray + lowerCase + upperCase
function compareInput(planet) {
    let inputValue = document.querySelector('.input-search').value;
    let lowerCase = planetsArray.map(planet => (planet).toLowerCase());
    let upperCase = planetsArray.map(planet => (planet).toUpperCase());

    if (planetsArray.includes(inputValue) || lowerCase.includes(inputValue) || upperCase.includes(inputValue)){
        //viewResults(planet);
        openModal(planetsArray);
        console.log(inputValue); 
    } else {
        console.log('error');
    };
};
 

// Eventlyssnare som ska reagera på tangent-ner och sedan jämföra med compareInput
// let inputField = document.querySelector('.input-search');

// inputField.addEventListener('onkeydown', () => {
//     compareInput(planet);
// });