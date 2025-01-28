"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDisciplinaProfessorRepository = void 0;
const DisciplinaProfessor_repository_1 = require("../PrismaRepository/DisciplinaProfessor.repository");
function makeDisciplinaProfessorRepository() {
    return new DisciplinaProfessor_repository_1.DisciplinaProfessorRepository();
}
exports.makeDisciplinaProfessorRepository = makeDisciplinaProfessorRepository;
