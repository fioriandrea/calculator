let displayValue = "";

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

function onOperator() {
  return onPlus() || onMinus() || onMultiply() || onDivide();
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

function beginningAllowedAction(button, symbol) {
  button.addEventListener("click", (e) => {
    if(!onOperator() && !onDot()) {
      displayValue += symbol;
    }
  });
}

function beginningNotAllowedAction(button, symbol) {
  button.addEventListener("click", (e) => {
    if(!onOperator() && !onDot() && displayValue !== "") {
      displayValue += symbol;
    }
  });
}

function setDotAction() {
  const dot = document.querySelector("#dot");
  beginningNotAllowedAction(dot, ".");
}

function setPlusAction() {
  const plus = document.querySelector("#plus");
  beginningAllowedAction(plus, "+");
}

function setMinusAction() {
  const minus = document.querySelector("#minus");
  beginningAllowedAction(minus, "-");
}

function setMultiplyAction() {
  const multiply = document.querySelector("#multiply");
  beginningNotAllowedAction(multiply, "*");
}

function setDivideAction() {
  const divide = document.querySelector("#division");
  beginningNotAllowedAction(divide, "/");
}

function setNumberAction() {
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
  setNumberAction();
  setACAction();
  setCancAction();
  setDotAction();
  setPlusAction();
  setMinusAction();
  setDivideAction();
  setMultiplyAction();
  setUpdateScreenWhenButtonPressedAction();
  placeButtons();
}

main();
