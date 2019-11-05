function placeButtons() {
  const buttons = Array.from(document.querySelectorAll("#buttons button"));
  buttons.forEach((el) => el.style["grid-area"] = el.id);
}

function main() {
  placeButtons();
}

main();
