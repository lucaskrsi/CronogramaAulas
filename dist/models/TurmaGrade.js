"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurmaGrade = void 0;
class TurmaGrade {
    constructor(ano, turma, grade, id) {
        this._id = id;
        this._ano = ano;
        this._turma = turma;
        this._grade = grade;
    }
    getId() {
        return this._id;
    }
    setId(id) {
        this._id = id;
    }
    getAno() {
        return this._ano;
    }
    setAno(ano) {
        this._ano = ano;
    }
    getTurma() {
        return this._turma;
    }
    setTurma(turma) {
        this._turma = turma;
    }
    getGradeCurricular() {
        return this._grade;
    }
    setGradeCurricular(grade) {
        this._grade = grade;
    }
}
exports.TurmaGrade = TurmaGrade;
