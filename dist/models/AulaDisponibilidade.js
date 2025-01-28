"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AulaDisponibilidade = void 0;
class AulaDisponibilidade {
    constructor(aula, disponibilidadeProfessor, id) {
        this._id = id;
        this._aula = aula;
        this._disponibilidadeProfessor = disponibilidadeProfessor;
    }
    getId() {
        return this._id;
    }
    setId(id) {
        this._id = id;
    }
    getAula() {
        return this._aula;
    }
    setAula(aula) {
        this._aula = aula;
    }
    getDisponibilidadeProfessor() {
        return this._disponibilidadeProfessor;
    }
    setDisponibilidadeProfessor(disponibilidadeProfessor) {
        this._disponibilidadeProfessor = disponibilidadeProfessor;
    }
}
exports.AulaDisponibilidade = AulaDisponibilidade;
