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
exports.getAll = void 0;
const ErrorHandler_1 = require("../../../exceptions/ErrorHandler");
const makeDisciplinaGradeCurricularRepository_1 = require("../../../repositories/factory/makeDisciplinaGradeCurricularRepository");
function getAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const disciplinaGradeRepository = (0, makeDisciplinaGradeCurricularRepository_1.makeDisciplinaGradeCurricularRepository)();
            const disciplinaGradeList = yield disciplinaGradeRepository.getAll();
            let list = disciplinaGradeList.map(disciplinaGrade => {
                return {
                    id: disciplinaGrade.getId(),
                    cargaHoraria: disciplinaGrade.getCargaHoraria(),
                    disciplina: {
                        id: disciplinaGrade.getDisciplina().getId(),
                        nome: disciplinaGrade.getDisciplina().getNome(),
                    },
                    gradeCurricular: {
                        id: disciplinaGrade.getGradeCurricular().getId(),
                        nome: disciplinaGrade.getGradeCurricular().getNome(),
                    },
                };
            });
            res.status(200).json({
                data: {
                    disciplinasGrades: list,
                },
            });
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.getAll = getAll;
