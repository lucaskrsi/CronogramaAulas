"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Professor = void 0;
class Professor {
    constructor(cargaHoraria, nome, matricula, id) {
        this._id = id;
        this._cargaHoraria = cargaHoraria;
        this._nome = nome;
        this._matricula = matricula;
    }
    getId() {
        return this._id;
    }
    setId(id) {
        this._id = id;
    }
    getCargaHoraria() {
        return this._cargaHoraria;
    }
    setCargaHoraria(cargaHoraria) {
        this._cargaHoraria = cargaHoraria;
    }
    getNome() {
        return this._nome;
    }
    setNome(nome) {
        this._nome = nome;
    }
    getMatricula() {
        return this._matricula;
    }
    setMatricula(matricula) {
        this._matricula = matricula;
    }
}
exports.Professor = Professor;
