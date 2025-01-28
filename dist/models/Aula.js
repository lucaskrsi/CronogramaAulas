"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aula = void 0;
class Aula {
    constructor(inicioHora, fimHora, diaDaSemana, disciplina, turma, id) {
        this._id = id;
        this._inicioHora = inicioHora;
        this._diaDaSemana = diaDaSemana;
        this._fimHora = fimHora;
        this._disciplina = disciplina;
        this._turma = turma;
    }
    getId() {
        return this._id;
    }
    setId(id) {
        this._id = id;
    }
    getInicioHora() {
        return this._inicioHora;
    }
    setInicioHora(inicioHora) {
        this._inicioHora = inicioHora;
    }
    getFimHora() {
        return this._fimHora;
    }
    setFimHora(fimHora) {
        this._fimHora = fimHora;
    }
    getDiaDaSemana() {
        return this._diaDaSemana;
    }
    setDiaDaSemana(diaDaSemana) {
        this._diaDaSemana = diaDaSemana;
    }
    getDisciplina() {
        return this._disciplina;
    }
    setDisciplina(disciplina) {
        this._disciplina = disciplina;
    }
    getTurma() {
        return this._turma;
    }
    setTurma(turma) {
        this._turma = turma;
    }
}
exports.Aula = Aula;
