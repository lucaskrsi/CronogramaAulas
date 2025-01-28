"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDisponibilidadeProfessorRepository = void 0;
const DisponibilidadeProfessor_repository_1 = require("../PrismaRepository/DisponibilidadeProfessor.repository");
function makeDisponibilidadeProfessorRepository() {
    return new DisponibilidadeProfessor_repository_1.DisponibilidadeProfessorRepository();
}
exports.makeDisponibilidadeProfessorRepository = makeDisponibilidadeProfessorRepository;
