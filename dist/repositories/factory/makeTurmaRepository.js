"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTurmaRepository = void 0;
const Turma_repository_1 = require("../PrismaRepository/Turma.repository");
function makeTurmaRepository() {
    return new Turma_repository_1.TurmaRepository();
}
exports.makeTurmaRepository = makeTurmaRepository;
