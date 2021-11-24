import "mocha/mocha.css";
import mocha from "mocha/mocha-es2018";
import chai from "chai";
import { obtenerNumeros, validarGrupo } from "./sudoku.js";

var expect = chai.expect;

export function doTests() {
  console.log("TESTS!!!!!!!!!!");

  mocha.setup("bdd");

  // DESCRIBES
  describe("Sudoku", function () {
    describe("Obtener números", function () {
      it("Debe ser un array de 81 elementos", () => {
        expect(obtenerNumeros().length).to.eql(81);
      });
      it("Los elementos serán numéricos de 0 a 9", () => {
        expect(obtenerNumeros()).to.satisfy((nums) =>
          nums.every(
            (n) => !isNaN(n) && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(n)
          )
        );
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
