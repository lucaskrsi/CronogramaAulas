"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Professor = void 0;
class Professor {
    constructor(cargaHoraria, id) {
        this._id = id;
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
}
exports.Professor = Professor;
