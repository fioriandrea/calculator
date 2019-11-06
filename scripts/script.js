const operations = new Map();
operations.set("+", (x, y) => x + y);
operations.set("*", (x, y) => x * y);
operations.set("-", (x, y) => x - y);
operations.set("/", (x, y) => x / y);

function operate(operator, x, y) {
  return operations.get(operator)(x, y);
}

function isValid(expression) {
  return !(expression === "" || "+*-/".includes(expression[expression.length - 1]));
}

function precedence(op) {
  if(op === "+" || op === "-") {
    return 0;
  }
  else {
    return 1;
  }
}

function addZeroIfLeadingSign(expr) {
  return expr[0] === "+" || expr[0] === "-" ? "0" + expr : expr;
}

function tokenizeNumbers(expr) {
  let tokens = expr.split(/\+|-|\/|\*/);

  for(let i = 0; i < tokens.length; ++i) {
    tokens[i] = parseFloat(tokens[i]);
  }

  return tokens;
}

function tokenizeOperators(expr) {
  let ops = expr.split(/[0-9]*\.[0-9]+|[0-9]+/);
  ops.shift();
  ops.pop();
  return ops;
}

function compute(expr) {
  let s = addZeroIfLeadingSign(expr);
  let numbers = tokenizeNumbers(s);
  let operators = tokenizeOperators(s);

  while(operators.length > 0) {
    if(operators.length >= 2) { //at least 2 operators present: check precedence
      const op1 = operators[0];
      const op2 = operators[1];

      if(precedence(op1) >= precedence(op2)) {
        let first = numbers.shift();
        let second = numbers[0];
        numbers[0] = operate(op1, first, second);
        operators.shift();
      }
      else {
        let first = numbers[1];
        let second = numbers[2];
        numbers[1] = operate(op2, first, second);
        numbers.splice(2, 1);
        operators.splice(1, 1);
      }
    }
    else {
      let first = numbers.shift();
      let second = numbers[0];
      numbers[0] = operate(operators.shift(), first, second);
    }
  }
  return numbers[0];
}






let displayValue = "";
let computed = false;

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

      if(computed) {
        displayValue = "";
        computed = false;
      }
    });
  });
}

function setEqualAction() {
  const equal = document.querySelector("#equals");

  equals.addEventListener("click", (e) => {
    computed = true;
    if(!isValid(displayValue)) {
      displayValue = "Error";
    }
    else {
      displayValue = parseFloat(compute(displayValue)).toFixed(3);
    }
  });
}

function main() {
  setEqualAction();
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
