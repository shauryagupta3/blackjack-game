let dealersum = 0;
let playersum = 0;
let deck = [];
let win = true;
bet = document.getElementById("bet").value;
balance = document.getElementById("deposit").value;
imgbox = document.querySelectorAll(".card");
reset = false;

buildDeck = () => {
  let values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  let types = ["C", "D", "H", "S"];

  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < types.length; j++) {
      deck.push(values[i] + "-" + types[j]);
    }
  }
};

checkSum = () => {
  if (playersum > 21) {
    win = false;
    checkwin();
  } else if (playersum === 21) {
    win = true;
    checkwin();
  } else if (dealersum > 21) {
    win = true;
    checkwin();
  } else if (playersum < 21 && playersum > dealersum) {
    win = true;
    checkwin();
  } else if (playersum < 21 && playersum < dealersum) {
    win = false;
    checkwin();
  } else {
    win = false;
    checkwin();
  }
};

checkwin = () => {
  if (win === true) {
    document.querySelector(".result").classList.add("show");
    document.querySelector(".result").classList.add("win");
    document.getElementById("result").innerText = "You win! + " + bet;
    balance += bet * 2;
    document.getElementById("displayBalance").innerText = balance;
  } else {
    document.querySelector(".result").classList.add("show");
    document.querySelector(".result").classList.add("lose");
    document.getElementById("result").innerText = "You lose! - " + bet;
    console.log("lose");
    // balance -= bet;
  }
};

shuffleDeck = () => {
  for (let i = 0; i < deck.length; i++) {
    let random = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[random];
    deck[random] = temp;
  }
  console.log(deck);
};

checkDealerSum = () => {
  while (dealersum < 17) {
    dealerNewCard = deck.pop();
    dealersum += getCardValue(dealerNewCard);
    console.log(dealerNewCard);
    for (let i = 1; i++; ) {
      if (document.querySelectorAll(".card")[i].innerHTML === "") {
        document.querySelectorAll(".card")[
          i
        ].innerHTML = `<img src="cards/${dealerNewCard}.png">`;
        break;
      }
    }
  }
};

startGame = () => {
  hiddenCard = deck.pop();
  dealerCard = deck.pop();
  dealersum += getCardValue(hiddenCard) + getCardValue(dealerCard);
  console.log(dealerCard);
  console.log(hiddenCard);
  document.querySelectorAll(
    ".card"
  )[1].innerHTML = `<img src="cards/${dealerCard}.png">`;

  playerCard = deck.pop();
  playerCard2 = deck.pop();
  playersum = getCardValue(playerCard) + getCardValue(playerCard2);
  document.getElementById("displaysum").innerText = playersum;

  for (let i = 4; i++; ) {
    if (document.querySelectorAll(".card")[i].innerHTML === "") {
      document.querySelectorAll(".card")[
        i
      ].innerHTML = `<img src="cards/${playerCard}.png">`;
      break;
    }
  }

  for (let i = 4; i++; ) {
    if (document.querySelectorAll(".card")[i].innerHTML === "") {
      document.querySelectorAll(".card")[
        i
      ].innerHTML = `<img src="cards/${playerCard2}.png">`;
      break;
    }
  }
};

getCardValue = (card) => {
  let data = card.split("-");
  let value = data[0];

  if (isNaN(value)) {
    if (value === "A") {
      if (playersum <= 10 || dealersum <= 10) {
        value = 11;
      } else {
        value = 1;
      }
    } else {
      value = 10;
    }
    return value;
  }
  return parseInt(value);
};

document.getElementById("submitdeposit").onclick = () => {
  balance = document.getElementById("deposit").value;
  document.getElementById("displayBalance").innerText = balance;
};

document.getElementById("submitbet").onclick = () => {
  if (document.getElementById("bet").value > balance) {
    alert("You don't have enough money!");
  } else {
    bet = document.getElementById("bet").value;
    balance -= bet;
    document.getElementById("displayBalance").innerText = balance;
    document.getElementById("displayBet").innerText = bet;
    document.getElementById("displaysum").innerText = playersum;
    buildDeck();
    shuffleDeck(deck);
    startGame();
  }
};

removeCards = () => {
  if (reset === true) {
    for (let i = 0; i < 10; i++) {
      document.querySelectorAll(".card")[i].innerHTML = "";
    }

    imgbox[0].innerHTML = `<img src="cards/BACK.png" alt="">`;
  }
};

document.getElementById("reset").onclick = () => {
  document.querySelector(".result").classList.remove("show");
  reset = true;
  removeCards();
  playersum = 0;
  dealersum = 0;
  bet = 0;
  document.getElementById("displaysum").innerText = playersum;
  document.getElementById("displayBet").innerText = bet;
};

document.getElementById("hit").onclick = () => {
  if (playersum < 21) {
    playerCard = deck.pop();
    playersum += getCardValue(playerCard);
    console.log(playerCard);
    document.getElementById("displaysum").innerText = playersum;
    for (let i = 4; i++; ) {
      if (document.querySelectorAll(".card")[i].innerHTML === "") {
        document.querySelectorAll(".card")[
          i
        ].innerHTML = `<img src="cards/${playerCard}.png">`;
        break;
      }
    }
  }
  checkDealerSum();
};

document.getElementById("stay").onclick = () => {
  checkDealerSum();
  checkSum();

  document.querySelectorAll(".card")[0].innerHTML === "";
  document.querySelectorAll(
    ".card"
  )[0].innerHTML = `<img src="cards/${hiddenCard}.png">`;
};
