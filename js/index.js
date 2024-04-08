const answer = "APPLE";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const handleBackspace = () => {
    if (index !== 0) {
      index--;
      const formerBlock = document.querySelector(
        `.board-column[data-index="${attempts}${index}"]`
      );
      formerBlock.innerText = "";
    }
  };
  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "game end!";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top: 30vh; left: 30vw; background-color:white; width: 200px; height: 100px; border-radius:15px; border:1px solid black;";
    document.body.appendChild(div);
  };

  const gameOver = () => {
    window.removeEventListener("keydown", handleKeyDown);
    displayGameOver();
    clearInterval(timer);
  };
  const nextLine = () => {
    if (attempts === 6) return gameOver();
    attempts++;
    index = 0;
  };

  const handleEnterkey = () => {
    let correct_count = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index="${attempts}${i}"]`
      );
      const input_word = block.innerText;
      const answer_word = answer[i];
      if (input_word === answer_word) {
        correct_count++;
        block.style.background = "#67B360";
      } else if (answer.includes(input_word))
        block.style.background = "#D6BE4E";
      else block.style.background = "grey";
      block.style.color = "white";
    }

    if (correct_count === 5) gameOver();
    else nextLine();
  };

  const handleKeyDown = (event) => {
    const key = event.key;
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index="${attempts}${index}"]`
    );
    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterkey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key.toUpperCase();
      index++;
    }
  };

  const startTimer = () => {
    const start_time = new Date();
    function setTime() {
      const current_time = new Date();
      elapsed_time = new Date(current_time - start_time);
      const minute = elapsed_time.getMinutes().toString().padStart(2, "0");
      const second = elapsed_time.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${minute}:${second}`;
    }
    timer = setInterval(setTime, 1000);
  };
  startTimer();
  window.addEventListener("keydown", handleKeyDown);
}

appStart();
