"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradeRoutes = void 0;
const geracaoAutomatica_1 = require("../../service/geracaoAutomatica");
const makeDisciplinaProfessorRepository_1 = require("../../repositories/factory/makeDisciplinaProfessorRepository");
const makeDisponibilidadeProfessorRepository_ts_1 = require("../../repositories/factory/makeDisponibilidadeProfessorRepository.ts");
function gradeRoutes(router) {
    return __awaiter(this, void 0, void 0, function* () {
        router.get("/gerar-grade", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Obtendo os dados diretamente dos repositórios
                const disciplinaProfessorRepository = (0, makeDisciplinaProfessorRepository_1.makeDisciplinaProfessorRepository)();
                const disponibilidadeProfessorRepository = (0, makeDisponibilidadeProfessorRepository_ts_1.makeDisponibilidadeProfessorRepository)();
                const disciplinasProfessores = yield disciplinaProfessorRepository.getAll();
                const disponibilidadeProfessores = yield disponibilidadeProfessorRepository.getAll();
                if (!disciplinasProfessores || !disponibilidadeProfessores) {
                    return res.status(400).json({ error: "Não há dados suficientes para gerar a grade." });
                }
                // Chamando a função de geração automática
                const gradeHoraria = (0, geracaoAutomatica_1.gerarGradeHoraria)(disciplinasProfessores, disponibilidadeProfessores);
                return res.status(200).json({ grade: gradeHoraria });
            }
            catch (error) {
                next(error);
            }
        }));
    });
}
exports.gradeRoutes = gradeRoutes;
