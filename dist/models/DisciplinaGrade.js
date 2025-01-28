"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisciplinaGrade = void 0;
class DisciplinaGrade {
    constructor(cargaHoraria, disciplina, gradeCurricular, id) {
        this._id = id;
        this._disciplina = disciplina;
        this._gradeCurricular = gradeCurricular;
        this._cargaHoraria = cargaHoraria;
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
    getDisciplina() {
        return this._disciplina;
    }
    setDisciplina(disciplina) {
        this._disciplina = disciplina;
    }
    getGradeCurricular() {
        return this._gradeCurricular;
    }
    setGradeCurricular(grade) {
        this._gradeCurricular = grade;
    }
}
exports.DisciplinaGrade = DisciplinaGrade;
