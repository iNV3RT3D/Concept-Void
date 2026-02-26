const infoContainer = document.getElementById("infoContainer");
const infoContainerHeaderTitle = document.getElementById("infoHeaderTitle");
const infoHeaderSubtitle = document.getElementById("infoHeaderSubtitle");
const infoBody = document.getElementById("infoBody");

const cardHistory = [];
let currentCard = '';

const r = document.querySelector(':root');

function getMenuData(id){
    return cards.find(menu => menu.id === id);
}

const displayCardEvent = new Event("displayCard")
function displayMenu(id = null, data = null){
    if(!data){
        data = getMenuData(id);
    }
    infoContainer.classList.remove("hidden");
    infoContainerHeaderTitle.innerHTML = data.title;
    infoHeaderSubtitle.innerHTML = data.subtitle;

    infoBody.innerHTML = '';

    cardHistory.push(data);

    document.getElementById("closeBtn").classList.remove("hidden");
    document.getElementById("backBtn").classList.remove("hidden");

    currentCard = data.id;

    displayCardEvent.data = data;
    document.dispatchEvent(displayCardEvent);

    if (Array.isArray(data.content)) {
        populateCards(data.content);
        return;
    }

    infoBody.innerHTML = data.content;
}

const hideCardEvent = new Event("hideCard")
function hideMenu(){
    infoContainer.classList.add("hidden");
    cardHistory.length = 0;

    document.getElementById("closeBtn").classList.add("hidden");
    document.getElementById("backBtn").classList.add("hidden");

    document.dispatchEvent(hideCardEvent);

    currentCard = '';
}

function backMenu() {
    cardHistory.pop(); //Remove current card
    const card = cardHistory.pop(); //Get previous card

    if(!card){
        hideMenu();
        return;
    }

    displayMenu(null, card);
}

function getCardRefData(cardData){
    if(cardData.cardId != undefined){
        return cards.find(card => card.id === cardData.cardId);
    }
    if(cardData.groupId != undefined){
        const group = cardGroups.find(group => group.id === cardData.groupId)
        group.isGroup = true;
        return group;
    }
    return cardData;
}

function populateCards(data){
    if(!data){
        return;
    }

    data.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("card")

        const cardData = getCardRefData(item)

        if(cardData.isGroup){
            console.log("Populating Group")
            populateCards(cardData.cards);
            return;
        }

        infoBody.appendChild(card);
        loadCardData(card, cardData);
    })
}

function loadCardData(card, data){

    if (data.banner) {card.dataset.banner = data.banner;}
    if (data.noClick) {card.dataset.noClick = data.noClick;}

    let html = `
        ${data.image ? `<img src=${data.image}>` : ''}
        ${data.title || data.subtitle ? `
        <div class="card-text">
            ${data.title ? `<div class="card-text-title">${data.title}</div>` : ''}
            ${data.subtitle ? `<div class="card-text-subtitle">${data.subtitle}</div>` : ''}
        </div>
        ` : ''}
        <div class="card-content">
            ${data.content && data.fullDisplay ? `<div class="card-text-content">${data.content}</div>` : ''}
        </div>
        `;

    if (data.separator) {
        card.dataset.separator = data.separator;
        html = `
        <div class="card-text">
            ${data.title ? `<div class="card-text-title">${data.title}</div>` : ''}
            ${data.subtitle ? `<div class="card-text-subtitle">${data.subtitle}</div>` : ''}
            <hr>
        </div>
        `;
    }

    if (data.menu) {
        html = `
        ${data.image ? `<img src=${data.image}>` : ''}
        ${data.menu.title || data.menu.subtitle ? `
        <div class="card-text">
            ${data.menu.title ? `<div class="card-text-title">${data.menu.title}</div>` : ''}
            ${data.menu.subtitle ? `<div class="card-text-subtitle">${data.menu.subtitle}</div>` : ''}
        </div>
        ` : ''}
        `;
    }

    if (!data.noClick){
        card.addEventListener("click", function () {
            displayMenu(null, data);
        })
    }

    card.innerHTML = html;
    if(data.startFunc instanceof Function){
        console.log("startFunc");
        data.startFunc();
    }
}
