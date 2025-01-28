"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAulaDisponibilidadeRepository = void 0;
const AulaDisponibilidade_repository_1 = require("../PrismaRepository/AulaDisponibilidade.repository");
function makeAulaDisponibilidadeRepository() {
    return new AulaDisponibilidade_repository_1.AulaDisponibilidadeRepository();
}
exports.makeAulaDisponibilidadeRepository = makeAulaDisponibilidadeRepository;
