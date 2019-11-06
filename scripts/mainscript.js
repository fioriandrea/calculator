let displayValue = "";
/*let currentNum = "";
let onDot = false;
let onOperator = false;*/

const operations = new Map();
operations.set("+", (x, y) => x + y);
operations.set("*", (x, y) => x * y);
operations.set("-", (x, y) => x - y);
operations.set("/", (x, y) => x / y);

function operate(operator, x, y) {
  return operations.get(operator)(x, y);
}

function onCharacter(c) {
  return displayValue.length > 0 ? displayValue[displayValue.length - 1] === c : false;
}

function onDot() {
  return onCharacter(".");
}

function onPlus() {
  return onCharacter("+");
}

function onMinus() {
  return onCharacter("-");
}

function onMultiply() {
  return onCharacter("*");
}

function onDivide() {
  return onCharacter("/");
}

function onNumber() {
  let flag = false;
  for(let i = 0; i <= 9; ++i) {
    flag = flag || onCharacter("" + i);
  }
  return flag;
}

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
