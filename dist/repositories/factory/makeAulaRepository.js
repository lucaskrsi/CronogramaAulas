"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAulaRepository = void 0;
const Aula_repository_1 = require("../PrismaRepository/Aula.repository");
function makeAulaRepository() {
    return new Aula_repository_1.AulaRepository();
}
exports.makeAulaRepository = makeAulaRepository;
