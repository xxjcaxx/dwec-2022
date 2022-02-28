function fillBoard(board, data) {}

document.addEventListener("DOMContentLoaded", function initialLoad() {
  // Se hace con declaración de función para rastrear mejor
  const board = document.querySelector("#board");
  fillBoard(board, {
    pos1: 0,
    pos2: 0,
    pos3: 0,
    pos4: 0,
    pos5: 0,
    pos6: 0,
    pos7: 0,
    pos8: 0,
    pos9: 0,
  });
});
