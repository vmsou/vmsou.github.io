let N_CARDS = 6 * 3;
let cards = [];
let cardFolder = "yugioh"
let yugiohNames = [], pokemonNames = [];

let cardNames = [];
let lastClicked = null;

let cursor_enabled = false;
let nTries = 0;
let nMatches = 0;

let yugiohRequestURL = "../json/yugioh.json";
let pokemonRequestURL = "../json/pokemon.json";

function getValuesRequest(requestURL, to_array) {
    let request = new XMLHttpRequest();
    request.responseType = 'json';
    request.open('GET', requestURL);
    request.send();
    request.onload = function() {
        to_array.push(...request.response);
    }

}


getValuesRequest(yugiohRequestURL, yugiohNames);
getValuesRequest(pokemonRequestURL, pokemonNames);

class Card {
    constructor(x, front) {
        this.faceUp = false;
        this.match = false;
        this.front = front;
        this.back = "../images/" + cardFolder + "/cards-back/default.png";
        this.cardElement = null;
        this.buildElement();
    }
    buildElement() {
        let flip = document.createElement("div");
        flip.className = "card";

        let inner = document.createElement("div");
        inner.className = "card-wrapper";
        flip.append(inner);

        let front = document.createElement("div");
        front.className = "card-front";

        if (Math.random() < 0.1) {
            front.classList.add("holo");
        }
        inner.append(front);

        let back = document.createElement("div");
        back.className = "card-back";
        inner.append(back);

        let img_front = document.createElement("img");
        img_front.src = this.front;
        img_front.className = 'card-img';
        front.append(img_front);

        let img_back = document.createElement("img");
        img_back.src = this.back;
        img_back.className = 'card-img';
        back.append(img_back);

        this.eventCard(flip);
        this.cardElement = flip;
    }

    showCard() {
        this.faceUp = true;
        this.cardElement.classList.add("active");
    }

    hideCard() {
        this.faceUp = false;
        this.cardElement.classList.remove("active");
    }

    eventCard(card) {
        card.addEventListener("click", () => {
            if (cursor_enabled) {
                if (!this.faceUp && !this.match) {
                    ++nTries;
                    this.showCard();
                    if (lastClicked instanceof Card) {
                        if (lastClicked.front === this.front) {
                            ++nMatches;
                            this.cardElement.classList.add("scaleHover");
                            lastClicked.cardElement.classList.add("scaleHover");
                            lastClicked = null;
                            if (nMatches >= N_CARDS / 2) {
                                setTimeout(() => {
                                    alert(`Todas combinações encontradas em ${nTries} Tentativas.`)
                                }, 1000)
                            }
                        } else {
                            setTimeout(() => {
                                this.hideCard();
                                lastClicked.hideCard();
                                lastClicked = null;
                            }, 500)
                        }
                    } else lastClicked = this;
                }
            }
        })
    }
}

function buttonToggle(e) {
    let container = document.getElementsByClassName("btn");
    let play = document.getElementById("startGame") !== null ? document.getElementById("startGame") : document.getElementById("showCards") ;
    for (let i = 0; i < container.length; i++) {
        let b = container[i];
        b.classList.remove("active");

    }
    play.classList.remove(play.classList[1]);
    play.classList.add(e.classList[1]);
    e.classList.add("active");
    cardFolder = e.id;

}


function randChoice(choices) {
    let index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function randShuffle(sampleList) {
    sampleList.sort(() => Math.random() -0.5);
}

function preload(imgName) {
    if (document.images && !loadedNames.includes(imgName)) {
        let img = new Image();
        img.src = imgName
        loadedNames.push(imgName);
    }
}

function start() {
    switch (cardFolder) {
        case "yugioh":
            cardNames = yugiohNames;
            break;
        case "pokemon":
            cardNames = pokemonNames;
            break;
        default:
            cardNames = yugiohNames;
    }

    cursor_enabled = false;
    preload("../images/" + cardFolder + "/cards-back/default.png");
    nTries = 0;
    nMatches = 0;
    lastClicked = null;
    let container = document.getElementById("cards-container");
    container.innerHTML = "";
    cards = [];
    for (let i = 0; i < N_CARDS / 2; i++) {
        let card_name = randChoice(cardNames);
        let card_link = "../images/" + cardFolder + "/cards-front/" + card_name + ".png"
        preload(card_link)
        let card1 = new Card(i, card_link);
        let card2 = new Card(i, card_link);
        cards.push(card1);
        cards.push(card2);
    }

    randShuffle(cards);
    for (let i = 0; i < N_CARDS; i++) {
        let card = cards[i];
        container.append(card.cardElement);
    }

    setTimeout(() => {
        for (let i = 0; i < N_CARDS; i++) {
            let card = cards[i];
            card.showCard();
            setTimeout(() => {
                card.hideCard();
            }, 2300);
        }
    }, 1500);

    setTimeout(() => {
        cursor_enabled = true;
    }, 2500);
}


function showCards() {
    cursor_enabled = false;
    switch (cardFolder) {
        case "yugioh":
            cardNames = yugiohNames;
            break;
        case "pokemon":
            cardNames = pokemonNames;
            break;
        default:
            cardNames = yugiohNames;
    }

    N_CARDS = cardNames.length;
    preload("../images/" + cardFolder + "/cards-back/default.png");
    let container = document.getElementById("cards-container");
    container.innerHTML = "";
    cards = [];
    for (let i = 0; i < N_CARDS; i++) {
        let card_name = cardNames[i];
        let card_link = "../images/" + cardFolder + "/cards-front/" + card_name + ".png"
        preload(card_link)
        let card1 = new Card(i, card_link);
        cards.push(card1);
    }

    for (let i = 0; i < N_CARDS; i++) {
        let card = cards[i];
        container.append(card.cardElement);
    }

    setTimeout(() => {
        for (let i = 0; i < N_CARDS; i++) {
            let card = cards[i];
            card.showCard();
            card.cardElement.classList.add("scaleHover");
        }
    }, 1500);
}

