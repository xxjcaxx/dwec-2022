import "mocha/mocha.css";
import mocha from "mocha/mocha-es2018";
import chai from "chai";
import {
  obtenerNumeros,
  validarGrupo,
  descargar,
  getKeys,
  keysFilter,
  generarSudoku,
} from "./sudoku.js";
import { isObservable } from "rxjs";

const expect = chai.expect;

export function doTests() {
  console.log("TESTS!!!!!!!!!!");

  mocha.setup("bdd");

  // DESCRIBES
  describe("Fetch", function () {
    describe("Obtener sudokus", () => {
      it("La función retorna un Observable", () => {
        let sudokus = descargar("static/coleccionsudokus");
        console.log(sudokus);
        expect(isObservable(sudokus)).to.equal(true);
      });
      it("Debe ser un objeto", () => {
        let sudokus = descargar("static/coleccionsudokus");
        sudokus.subscribe((s) => expect(s).to.be.an("Object"));
      });
      it("Debe ser un objeto con clave sudoku", async () => {
        let sudokus = descargar("static/coleccionsudokus");
        sudokus.subscribe((s) => expect(s).to.have.all.keys("sudokus"));
      });
    });
  });

  describe("Sudoku", function () {
    describe("Obtener números", function () {
      beforeEach("carregar un sudoku", async () => {
        await new Promise((resolve) => {
          let sudokus = descargar("static/coleccionsudokus");
          sudokus.subscribe((s) => {
            console.log(s);
            generarSudoku(s.sudokus.s1);
            resolve();
          });
        }).then(() => {});
      });
      it("Debe ser un array de 9 elementos", () => {
        expect(obtenerNumeros().length).to.eql(9);
      });
      it("Cada elemento es un array de 9 elementos", () => {
        expect(obtenerNumeros().every((fila) => fila.length == 9)).to.eql(true);
      });
      it("Los elementos serán numéricos de 0 a 9", () => {
        expect(obtenerNumeros()).to.satisfy((nums) =>
          nums.every((fila) =>
            fila.every(
              (n) => !isNaN(n) && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(n)
            )
          )
        );
      });

      afterEach("borrar el sudoku", () => {
        document.querySelector("#sudoku").innerHTML = "";
      });
    });
    describe("Validaciones", function () {
      it("Validar un set bueno", () => {
        expect(validarGrupo(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]))).to.equal(
          true
        );
      });
      it("Validar un set incompleto", () => {
        expect(validarGrupo(new Set([1, 2, 3, 4, 5, 6, 7, 9]))).to.equal(false);
      });
      it("Validar un set de más de 9", () => {
        expect(validarGrupo(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]))).to.equal(
          false
        );
      });
    });
  });

  mocha.run();
}
