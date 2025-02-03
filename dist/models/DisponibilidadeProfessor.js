"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisponibilidadeProfessor = void 0;
class DisponibilidadeProfessor {
    constructor(diaDaSemana, inicioHora, fimHora, professor, id) {
        this._id = id;
        this._diaDaSemana = diaDaSemana;
        this._inicioHora = inicioHora;
        this._fimHora = fimHora;
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
    getProfessor() {
        return this._professor;
    }
    setProfessor(professor) {
        this._professor = professor;
    }
}
exports.DisponibilidadeProfessor = DisponibilidadeProfessor;
