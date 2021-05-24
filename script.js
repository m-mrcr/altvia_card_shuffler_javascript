"use strict";

class Card {
  constructor(rank, suit, index) {
    this.suit = suit;
    this.rank = rank;
    this.index = index;
    this.constructCard();
  }

  constructCard() {
    const container = document.getElementById("container");
    this.cardEl = document.createElement("div");
    this.cardEl.classList.add("cardWrapper");
    this.setCustomIndexProperty();
    this.cardEl.innerHTML = /* html */ `
    <div class="card ${this.suit.color}">
      <div class="face back">
        <img src="./img/united_nations_esg_factors.png" />
      </div>  
      <div class="face front">
        <div class="rank top">
        <div>${this.rank}</div>
        <div class="suit">${this.suit.icon}</div>
        </div>
        <p class="suit">${this.suit.icon}</p>
        <div class="rank bottom">
        <div class="suit">${this.suit.icon}</div>
        <div>${this.rank}</div>
        </div>
      </div>
    </div>
  `;

    container.appendChild(this.cardEl);
  }

  setIndex(input) {
    this.index = input;
    this.setCustomIndexProperty();
  }

  setCustomIndexProperty() {
    this.cardEl.style.setProperty("--" + "index", this.index);
  }
}

class Deck {
  constructor() {
    this.ranks = [
      `2`,
      `3`,
      `4`,
      `5`,
      `6`,
      `7`,
      `8`,
      `9`,
      `10`,
      `J`,
      `Q`,
      `K`,
      `A`,
    ];
    this.suits = [
      {
        icon: "♦️",
        color: "red",
      },
      {
        icon: "♥️",
        color: "red",
      },
      {
        icon: "♠️",
        color: "black",
      },
      {
        icon: "♣️",
        color: "black",
      },
    ];

    this.cards = [];
    this.suits.forEach((suit) => {
      this.ranks.forEach((rank) => {
        this.cards.push(new Card(rank, suit, this.cards.length));
      });
    });
  }
}

const newDeck = new Deck();

// Fanning Button
const fanBtn = document.getElementById("fan");
fanBtn.addEventListener("click", function () {
  const container = document.getElementById("container");
  fanBtn.textContent = fanBtn.textContent === "Stack" ? "Fan" : "Stack";
  container.classList.toggle("stacked");
  container.classList.toggle("fanned");
});

// Flipping Button
const flipBtn = document.getElementById("flip");
flipBtn.addEventListener("click", function () {
  const container = document.getElementById("container");
  container.classList.toggle("face-down");
  container.classList.toggle("face-up");
});

// Shuffle Button
const shuffleBtn = document.getElementById("shuffle");
shuffleBtn.addEventListener("click", function () {
  let shuffledDeck = [];
  let cards = newDeck.cards;
  while (cards.length != 0) {
    const oldIndex = Math.floor(Math.random() * cards.length);
    const card = newDeck.cards[oldIndex];
    shuffledDeck.push(card);
    cards.splice(oldIndex, 1);
    card.setIndex(shuffledDeck.length - 1);
  }
  newDeck.cards = shuffledDeck;
});
