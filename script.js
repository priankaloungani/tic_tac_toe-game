const cells = document.querySelectorAll("[data-cell]");
const statusText = document.querySelector(".status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let board = Array(9).fill("");

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => cellClicked(index), { once: true });
});

function cellClicked(index) {
    if (board[index] !== "") return;

    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add("taken");

    if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
        disableBoard();
    } else if (board.every(cell => cell !== "")) {
        statusText.textContent = "It's a Draw! 🤝";
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function disableBoard() {
    cells.forEach(cell => cell.removeEventListener("click", cellClicked));
}

restartBtn.addEventListener("click", restartGame);

function restartGame() {
    currentPlayer = "X";
    board = Array(9).fill("");
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
        cell.replaceWith(cell.cloneNode(true)); // remove old event listeners
    });
    document.querySelectorAll("[data-cell]").forEach((cell, index) => {
        cell.addEventListener("click", () => cellClicked(index), { once: true });
    });
}
