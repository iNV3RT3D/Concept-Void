const infoContainer = document.getElementById("infoContainer");

const cardHistory = [];
let currentCard = '';

const r = document.querySelector(':root');

function getMenuData(id){
    return cards.find(menu => menu.id === id);
}

function loadMenuStyle(layout){
    let html =
        `<div id="infoHeader" class="info-header">
            <div id="infoHeaderTitle" class="info-header-title">Concept Void</div>
            <div id="infoHeaderSubtitle" class="info-header-description">The place of lost ideas</div>
            <hr>
        </div>
        <div id="infoBody" class="info-body">

        </div>`
    infoContainer.className = "info-container";

    if(layout === "character"){
        html =
            `
            <div id="infoSideBar" class="info-side-bar">
                <img id="infoImage" class="info-image" src="" alt="">
                <div id="infoHeaderTitle" class="info-header-title" style="text-align: center">Concept Void</div>
            </div>
            <div id="characterInfo">
                <div id="infoHeader" class="info-header">
                    <div id="infoHeaderTitle" class="info-header-title">Concept Void</div>
                    <div id="infoHeaderSubtitle" class="info-header-description">The place of lost ideas</div>
                    <hr>
                </div>
                <div id="infoBody" class="info-body">
        
                </div>
            </div>`
        infoContainer.classList.add("character")
    }

    infoContainer.innerHTML = html;
}

const displayCardEvent = new Event("displayCard")
function displayMenu(id = null, data = null){
    if(!data){
        data = getMenuData(id);
    }
    infoContainer.classList.remove("hidden");

    loadMenuStyle(data.layout);

    const infoContainerHeaderTitle = document.querySelectorAll(".info-header-title");
    const infoHeaderSubtitle = document.querySelectorAll(".info-header-description");
    const infoImages = document.querySelectorAll(".info-image");
    const infoBody = document.getElementById("infoBody");

    for (let i = 0; i < infoContainerHeaderTitle.length; i++) {
        infoContainerHeaderTitle[i].innerHTML = data.title;
    }
    for (let i = 0; i < infoHeaderSubtitle.length; i++) {
        infoHeaderSubtitle[i].innerHTML = data.subtitle;
    }
    for (let i = 0; i < infoImages.length; i++) {
        infoImages[i].src = data.image;
    }

    const root = document.documentElement

    infoBody.innerHTML = '';

    cardHistory.push(data);

    document.getElementById("closeBtn").classList.remove("hidden");
    document.getElementById("backBtn").classList.remove("hidden");

    currentCard = data.id;

    displayCardEvent.data = data;
    document.dispatchEvent(displayCardEvent);

    if(data.color){
        let color = new Color(data.color);
        root.style.setProperty("--main-color", color.toString());
        color.lch.l *= 2;
        root.style.setProperty("--subtitle-color", color.toString());
    }

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
    if(cardData.cardId !== undefined){
        return cards.find(card => card.id === cardData.cardId);
    }
    if(cardData.groupId !== undefined){
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
        ${data.image ? `<img src=${data.image} alt="">` : ''}
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
        ${data.image ? `<img src=${data.image} alt="">` : ''}
        ${data.menu.title || data.menu.subtitle ? `
        <div class="card-text">
            ${data.menu.title ? `<div class="card-text-title">${data.menu.title}</div>` : ''}
            ${data.menu.subtitle ? `<div class="card-text-subtitle">${data.menu.subtitle}</div>` : ''}
        </div>
        ` : ''}
        `;
    }

    if (!data.noClick){
        if(data.redirect){
            card.addEventListener("click", function () {
                window.open(data.redirect);
            })
        }
        else {
            card.addEventListener("click", function () {
                displayMenu(null, data);
            })
        }
    }

    card.innerHTML = html;
    if(data.startFunc instanceof Function){
        console.log("startFunc");
        data.startFunc();
    }
}
