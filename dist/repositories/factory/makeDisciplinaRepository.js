"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDisciplinaRepository = void 0;
const Disciplina_repository_1 = require("../PrismaRepository/Disciplina.repository");
function makeDisciplinaRepository() {
    return new Disciplina_repository_1.DisciplinaRepository();
}
exports.makeDisciplinaRepository = makeDisciplinaRepository;
