// Descrizione:
// Visualizzare in un alert 5 numeri casuali.
// 30 secondi dopo la chiusura dell'alert, l'utente deve inserire,
// uno alla volta, i numeri che ha visto precedentemente,
// tramite il prompt().
// Dopo che sono stati inseriti i 5 numeri,
// il software dice quanti e quali dei numeri da indovinare
// sono stati individuati.

// *FUNCTIONS*
function randomNumArrayGen (numRange, maxValue) {

    let randomNumber;

    const randomNumArray = [];

    while (randomNumArray.length < numRange) {

        randomNumber = getRndInteger(1, maxValue);
        
        if (!randomNumArray.includes(randomNumber)) {
            randomNumArray.push(randomNumber);
        }
    }

    return randomNumArray;
}

function getRndInteger (min, max) {

    return Math.floor(Math.random() * (max - min + 1) ) + min;

}

// *VARIABLES*
// *salvo in una variabile "memoNumbers" la quantità di numeri che dovrà memorizzare l'utente*
let memoNumbers;

// *salvo in una variabile "memoNumbersRange" il range dei numeri che dovrà memorizzare l'utente*
let memoNumbersRange;

const userNumbersArray = [];

const guessedNumbersArray = [];

const triesContainer = ["primo", "secondo", "terzo", "quarto", "quinto", "sesto", "settimo", "ottavo", "nono", "decimo", "undicesimo", "dodicesimo", "tredicesimo", "quattordicesimo", "quindicesimo"];

let userNumber;

const selectModeWrapper = document.getElementById("select-mode");

const difficulty = document.getElementById("difficulty");

const startBtnDiv = document.getElementById("start-game");

const startBtn = document.querySelector(".start-btn");

const counterWrapper = document.getElementById("counter-wrapper");

const counterSpan = document.querySelector(".counter-number");

let counter = parseInt(counterSpan.innerHTML);

// *LOGIC*
// *faccio scegliere all'utente la difficoltà:
// *se sceglie "easy" dovrà memorizzare 5 numeri da 1 a 50,*
// *se sceglie "medium" dovrà memorizzare 5 numeri da 1 a 100,*
// *se sceglie "hard" dovrà memorizzare 10 numeri da 1 a 100,*
// *se sceglie "ultra hard" dovrà memorizzare 10 numeri da 1 a 1000,*
// *se sceglie "extreme" dovrà memorizzare 15 numeri da 1 a 1000,*
// *se sceglie "impossible" dovrà memorizzare 15 numeri da 1 a 10000,*
startBtn.addEventListener("click", function () {

    const gameMode = parseInt(difficulty.value);

    if(gameMode === 1) {
        memoNumbers = 5;
        memoNumbersRange = 50;
    } else if (gameMode === 2) {
        memoNumbers = 5;
        memoNumbersRange = 100;
    } else if (gameMode === 3) {
        memoNumbers = 10;
        memoNumbersRange = 100;
    } else if (gameMode === 4) {
        memoNumbers = 10;
        memoNumbersRange = 1000;
    } else if (gameMode === 5) {
        memoNumbers = 15;
        memoNumbersRange = 1000;
    } else if (gameMode === 6) {
        memoNumbers = 15;
        memoNumbersRange = 10000;
    }

    const randomArray = randomNumArrayGen(memoNumbers, memoNumbersRange);

    // !console log di debug!
    // console.log(gameMode);
    
    // *alert con regole del gioco*
    alert(`sto per mostrarti ${memoNumbers} numeri randomici compresi tra 1 e ${memoNumbersRange}.\nAvrai tutto il tempo che vorrai per memorizzarli. Quando sarai pronto/a premi invio, dopodichè partirà un counter di 30 secondi al termine del quale inizierà ufficialmente il gioco. Tutto chiaro? Sei pronto/a?`);

    alert("VIA!");

    // *faccio comparire un alert con tot numeri generati*
    // *randomicamente al caricamento della pagina dando la possibilità
    // *all'utente di memorizzarli tutti*
    alert(randomArray.join(",  "));

    // !console log di debug!
    // console.log(randomArray);

    counterSpan.classList.add("active");

    const countDown = setInterval(function () {

        if(counter === 1) {

            clearInterval(countDown);

            counterSpan.innerHTML = "GO!";

        } else {

            counter--;

            counterSpan.innerHTML = counter;
        }

    

    }, 1000);

    setTimeout(function () {

        alert(`Ok ci siamo il gioco inizia ora!\nRicorda che se inserisci numeri minori di 1 o maggiori di ${memoNumbersRange} o lettere e/o spazi vuoti sprecherai un tentativo!`);

        for(let i = 0; i < memoNumbers; i++) {

            let nTry = triesContainer[i];

            alert(`${nTry} tentativo`);

            userNumber = parseInt(prompt("scrivi un numero"));

            if(!userNumbersArray.includes(userNumber) && !isNaN(userNumber) ) {
            
                userNumbersArray.push(userNumber);
            
            }

        }

        // !console log di debug!
        // console.log(userNumbersArray);

        for(let i = 0; i < memoNumbers; i++) {

            let thisUserNumber = userNumbersArray[i];

            if(randomArray.includes(thisUserNumber)) {

                guessedNumbersArray.push(thisUserNumber);

            }

        }

        // !console log di debug!
        // console.log(guessedNumbersArray);

        alert(`il tuo punteggio è ${guessedNumbersArray.length}!\nI numeri indovinati sono: ${guessedNumbersArray.join(",  ")}`)

    }, 30500);
});