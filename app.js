const disneyCard = document.querySelector('.disney-card')
const get = { method: 'GET', headers: { Accept: 'application/json' } }
const URI = 'https://api.disneyapi.dev/characters'
const showD = document.querySelector('.showD')
const prevD = document.querySelector('.prevD')

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
            <img src="${disney.imageUrl}" alt="" class="disney-img">
            <p class="disney-name">The name :  ${disney.name}</p>
            <p class="apparition">The first apparition</p>
            <p class="disney-film">${disney.films[0] || ''}</p>
            <p class="disney-tv">${disney.tvShows[0] || ''}</p>
            <p class="disney-attraction">${disney.parkAttractions[0] || ''}</p></div>
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

prevD.addEventListener('click', previousBtn);
showD.addEventListener('click', nextBtn);