//// TODO: check if a string is valid

const operations = new Map();
operations.set("+", (x, y) => x + y);
operations.set("*", (x, y) => x * y);
operations.set("-", (x, y) => x - y);
operations.set("/", (x, y) => x / y);

function operate(operator, x, y) {
  return operations.get(operator)(x, y);
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
  return expr[0] === "+" || expr[0] === "-" ? "0" + expr || expr;
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

    return numbers[0];
  }
}
