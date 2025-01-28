"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisciplinaProfessor = void 0;
class DisciplinaProfessor {
    constructor(disciplina, professor, id) {
        this._id = id;
        this._disciplina = disciplina;
        this._professor = professor;
    }
    getId() {
        return this._id;
    }
    setId(id) {
        this._id = id;
    }
    getDisciplina() {
        return this._disciplina;
    }
    setDisciplina(disciplina) {
        this._disciplina = disciplina;
    }
    getProfessor() {
        return this._professor;
    }
    setProfessor(professor) {
        this._professor = professor;
    }
}
exports.DisciplinaProfessor = DisciplinaProfessor;
