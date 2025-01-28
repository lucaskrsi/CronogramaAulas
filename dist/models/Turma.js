"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Turma = void 0;
class Turma {
    constructor(nome, id) {
        this._id = id;
        this._nome = nome;
    }
    getId() {
        return this._id;
    }
    setId(id) {
        this._id = id;
    }
    getNome() {
        return this._nome;
    }
    setNome(nome) {
        this._nome = nome;
    }
}
exports.Turma = Turma;
