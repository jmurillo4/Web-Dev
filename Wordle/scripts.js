const board = document.getElementById("game-board");
let currentRow = 0;
let currentTile = 0;

let hiddenWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];

function initializeBoard() {
    board.innerHTML = ""; 
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("div");
        row.className = "row";
        for (let j = 0; j < 5; j++) {
            let tile = document.createElement("div");
            tile.className = "tile";
            tile.setAttribute("data-state", "empty"); 
            row.appendChild(tile);
        }
        board.appendChild(row);
    }
}

initializeBoard();
const keyboard = document.getElementById("keyboard");

function initializeKeyboard() {
    keyboard.innerHTML = ""; 
    const keys = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]
    ];

    keys.forEach(rowKeys => {
        const rowDiv = document.createElement("div");
        rowDiv.className = "keyboard-row";
        rowKeys.forEach(key => {
            const button = document.createElement("button");
            button.textContent = key;
            button.className = "key";
            button.addEventListener("click", () => handleKeyPress(key));
            rowDiv.appendChild(button);
        });
        keyboard.appendChild(rowDiv);
    });
}

initializeKeyboard();

function handleKeyPress(key) {
    if (key === "BACKSPACE" || key === "DELETE") {
        deleteTile();
        return;
    }
    if (key === "ENTER") {
        submitGuess();
        return;
    }
    addTile(key);
}

function addTile(letter) {
    if (currentTile < 5 && currentRow < 6) {
        const row = document.querySelectorAll(".row")[currentRow];
        const tile = row.querySelectorAll(".tile")[currentTile];
        tile.textContent = letter;
        currentTile++;
    }
}

function deleteTile() {
    if (currentTile > 0) {
        currentTile--;
        const row = document.querySelectorAll(".row")[currentRow];
        const tile = row.querySelectorAll(".tile")[currentTile];
        tile.textContent = "";
    }
}

function submitGuess() {
    const row = document.querySelectorAll(".row")[currentRow];
    const tiles = row.querySelectorAll(".tile");
    let guess = "";
    tiles.forEach(tile => guess += tile.textContent.toUpperCase());

    if (guess.length !== 5) {
        alert("Not enough letters!");
        return;
    }

    const hiddenWordArr = hiddenWord.split("");
    const guessArr = guess.split("");
    const statuses = Array(5).fill("absent");

    for (let i = 0; i < 5; i++) {
        if (guessArr[i] === hiddenWordArr[i]) {
            statuses[i] = "correct";
            hiddenWordArr[i] = null;
            guessArr[i] = null;
        }
    }

    for (let i = 0; i < 5; i++) {
        if (guessArr[i] !== null) {
            const indexInPool = hiddenWordArr.indexOf(guessArr[i]);
            if (indexInPool !== -1) {
                statuses[i] = "present";
                hiddenWordArr[indexInPool] = null;
            }
        }
    }

    tiles.forEach((tile, i) => {
        tile.setAttribute("data-state", statuses[i]);
    });

    updateKeyboard(guessArr, statuses, guess);

    if (guess === hiddenWord) {
        alert("You Win!");
        setTimeout(resetGame, 2000);
    } else if (currentRow === 5) { 
        alert("Game Over! The word was " + hiddenWord);
        setTimeout(resetGame, 2000);
    } else {
        currentRow++;
        currentTile = 0;
    }
}

function updateKeyboard(guessArr, statuses, originalGuess) {
    const letters = originalGuess.split("");
    letters.forEach((letter, i) => {
        const keyButtons = document.querySelectorAll(".key");
        keyButtons.forEach(btn => {
            if (btn.textContent === letter) {
                const oldState = btn.getAttribute("data-state");
                const newState = statuses[i];

                if (newState === "correct") {
                    btn.setAttribute("data-state", "correct");
                } else if (newState === "present" && oldState !== "correct") {
                    btn.setAttribute("data-state", "present");
                } else if (newState === "absent" && !oldState) {
                    btn.setAttribute("data-state", "absent");
                }
            }
        });
    });
}

function resetGame() {
    currentRow = 0;
    currentTile = 0;
    hiddenWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    console.log("New word is: " + hiddenWord);
    initializeBoard();
    initializeKeyboard();
}

window.addEventListener("keydown", (e) => {
    const key = e.key.toUpperCase();
    if (key === "ENTER") handleKeyPress("ENTER");
    else if (key === "BACKSPACE") handleKeyPress("BACKSPACE");
    else if (key.length === 1 && key >= "A" && key <= "Z") handleKeyPress(key);
});