let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnIndicator = document.querySelector("#turn-indicator");


let turn0 = true;
let moveCount = 0;

const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7], [2, 5, 8], [2, 4, 6],
    [3, 4, 5], [6, 7, 8],
];

const resetGame = () => {
    turn0 = true;
    moveCount = 0;
    enableBoxes();
    msgContainer.classList.remove("show");
    turnIndicator.innerText = "Turn: O";
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("winning-box");
    });
};

const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

const showWinner = (winner) => {
    msg.innerText = `🎉 Winner: ${winner}`;
    msgContainer.classList.add("show");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "It's a draw!";
    msgContainer.classList.add("show");
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let val1 = boxes[a].innerText;
        let val2 = boxes[b].innerText;
        let val3 = boxes[c].innerText;
        if (val1 && val1 === val2 && val2 === val3) {
            boxes[a].classList.add("winning-box");
            boxes[b].classList.add("winning-box");
            boxes[c].classList.add("winning-box");

            showWinner(val1);
            return true;
        }
    }
    return false;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return;

        box.innerText = turn0 ? "O" : "X";
        turn0 = !turn0;
        moveCount++;
        if (!checkWinner() && moveCount < 9) {
            turnIndicator.innerText = `Turn: ${turn0 ? "O" : "X"}`;
        } else if (moveCount === 9 && !checkWinner()) {
            showDraw();
        }
    });
});

reset.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
