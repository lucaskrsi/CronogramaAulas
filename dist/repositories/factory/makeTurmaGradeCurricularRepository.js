"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTurmaGradeCurricularRepository = void 0;
const TurmaGrade_repository_1 = require("../PrismaRepository/TurmaGrade.repository");
function makeTurmaGradeCurricularRepository() {
    return new TurmaGrade_repository_1.TurmaGradeRepository();
}
exports.makeTurmaGradeCurricularRepository = makeTurmaGradeCurricularRepository;
