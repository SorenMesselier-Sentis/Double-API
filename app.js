const disneyCard = document.querySelector('.disney-card')
const rickCard = document.querySelector('.rick-card')
const get = { method: 'GET', headers: { Accept: 'application/json' } }
const URI = 'https://api.disneyapi.dev/characters'
const URR = 'https://rickandmortyapi.com/api/character'
const showD = document.querySelector('.showD')
const prevD = document.querySelector('.prevD')
const showR = document.querySelector('#showR')
const prevR = document.querySelector('#prevR')
const toggleDisney = document.querySelector('#disney')
const toggleRick = document.querySelector('#rick')

let nextDisney = null;
let prevDisney = null;
let page = localStorage.getItem('page') ?? 1;

let fetchDisney = () => {
    fetch(`${URI}?page=${page}`, get)
        .then(res => res.json())
        .then(response => {
            response.data.forEach(disney => {
                disneyCard.innerHTML += `
            <div class="SingleDisney">
            <div class="imgBox">
            <img src="${disney.imageUrl}" alt="" class="disney-img">
            </div>
            <div class="contentBox">
            <h2 class="disney-name">${disney.name}</h2>
            <p class="disney-film">${disney.films[0] || ''}</p>
            <p class="disney-tv">${disney.tvShows[0] || ''}</p>
            <p class="disney-attraction">${disney.parkAttractions[0] || ''}</p></div>
            </div>
            `
            })
        })
}
fetchDisney();

let previousBtn = () => {
    if (page > 1) {
        page--
        localStorage.setItem('page', page);
        window.location.reload();
        fetchDisney()
    }
}

let nextBtn = () => {
    if (page < 150) {
        page++
        localStorage.setItem('page', page);
        window.location.reload();
        fetchDisney()
    }
}

let previousBtnR = () => {
    if (page > 1) {
        page--
        localStorage.setItem('page', page);
        window.location.reload();
        fetchRick()
    }
}

let nextBtnR = () => {
    if (page < 42) {
        page++
        localStorage.setItem('page', page);
        window.location.reload();
        fetchRick()
    }
}

prevD.addEventListener('click', previousBtn);
showD.addEventListener('click', nextBtn);

prevR.addEventListener('click', previousBtnR);
showR.addEventListener('click', nextBtnR);

let tDisney = () => {
    showD.style.display = 'flex';
    prevD.style.display = 'flex';
    disneyCard.style.display = 'flex';
    rickCard.style.display = 'none';
    showR.style.display = 'none';
    prevR.style.display = 'none';
}

let tRick = () => {
    showD.style.display = 'none';
    prevD.style.display = 'none';
    disneyCard.style.display = 'none';
    rickCard.style.display = 'flex';
    showR.style.display = 'flex';
    prevR.style.display = 'flex';
}

toggleDisney.addEventListener('click', tDisney)
toggleRick.addEventListener('click', tRick)

let fetchRick = () => {
    fetch(`${URR}?page=${page}`, get)
        .then(res => res.json())
        .then(response => {
            console.log(response)
            response.results.forEach(rick => {
                rickCard.innerHTML += `
            <div class="SingleRick">
            <div class="imgBox">
            <img src="${rick.image}" alt="" class="disney-img">
            </div>
            <div class="contentBox">
            <h2 class="disney-name">${rick.name}</h2>
            <p class="disney-film">${rick.status}</p>
            <p class="disney-tv">${rick.location.name}</p>
            <p class="disney-attraction">${rick.species}</p></div>
            </div>
            `
            })
        })
}
fetchRick();