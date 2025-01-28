"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGradeCurricularRepository = void 0;
const GradeCurricular_repository_1 = require("../PrismaRepository/GradeCurricular.repository");
function makeGradeCurricularRepository() {
    return new GradeCurricular_repository_1.GradeCurricularRepository();
}
exports.makeGradeCurricularRepository = makeGradeCurricularRepository;
