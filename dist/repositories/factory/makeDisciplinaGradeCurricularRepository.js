"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDisciplinaGradeCurricularRepository = void 0;
const DisciplinaGrade_repository_1 = require("../PrismaRepository/DisciplinaGrade.repository");
function makeDisciplinaGradeCurricularRepository() {
    return new DisciplinaGrade_repository_1.DisciplinaGradeRepository();
}
exports.makeDisciplinaGradeCurricularRepository = makeDisciplinaGradeCurricularRepository;
