let displayValue = "";


//places buttons in the right order
function placeButtons() {
  const buttons = Array.from(document.querySelectorAll("#buttons button"));
  buttons.forEach((el) => el.style["grid-area"] = el.id);
}

function setActionNumberButtons() {
  const buttons = Array.from(document.querySelectorAll(".number"));
  const display = document.querySelector("#display-text");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      displayValue += button.textContent;
    });
  });
}

function setACAction() {
  const ac = document.querySelector("#ac");

  ac.addEventListener("click", (e) => {
    displayValue = "";
  });
}

function setCancAction() {
  const canc = document.querySelector("#canc");

  canc.addEventListener("click", (e) => displayValue = displayValue.slice(0, -1));
}

function setUpdateScreenWhenButtonPressedAction() {
  const buttons = Array.from(document.querySelectorAll("#buttons button"));
  const display = document.querySelector("#display-text");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      display.textContent = displayValue;
    });
  });
}

function main() {
  setActionNumberButtons();
  setACAction();
  setCancAction();
  setUpdateScreenWhenButtonPressedAction();
  placeButtons();
}

main();
