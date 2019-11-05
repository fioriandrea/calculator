const operations = new Map();
operations.set("+", (x, y) => x + y);
operations.set("*", (x, y) => x * y);
operations.set("-", (x, y) => x - y);
operations.set("/", (x, y) => x / y);

function operate(operator, x, y) {
  return operations.get(operator)(x, y);
}
