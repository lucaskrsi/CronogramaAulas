"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisponibilidadeProfessor = void 0;
class DisponibilidadeProfessor {
    constructor(diaDaSemana, turno, professor, id) {
        this._id = id;
        this._diaDaSemana = diaDaSemana;
        this._turno = turno;
        this._professor = professor;
    }
    getId() {
        return this._id;
    }
    setId(id) {
        this._id = id;
    }
    getDiaDaSemana() {
        return this._diaDaSemana;
    }
    setDiaDaSemana(diaDaSemana) {
        this._diaDaSemana = diaDaSemana;
    }
    getTurno() {
        return this._turno;
    }
    setTurno(turno) {
        this._turno = turno;
    }
    getProfessor() {
        return this._professor;
    }
    setProfessor(professor) {
        this._professor = professor;
    }
}
exports.DisponibilidadeProfessor = DisponibilidadeProfessor;
