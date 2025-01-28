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
exports.update = void 0;
const zod_1 = require("zod");
const ErrorHandler_1 = require("../../../exceptions/ErrorHandler");
const makeDisciplinaGradeCurricularRepository_1 = require("../../../repositories/factory/makeDisciplinaGradeCurricularRepository");
const makeDisciplinaRepository_1 = require("../../../repositories/factory/makeDisciplinaRepository");
const makeGradeCurricularRepository_1 = require("../../../repositories/factory/makeGradeCurricularRepository");
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createBody = zod_1.z.object({
                cargaHoraria: zod_1.z.coerce.number(),
                disciplinaId: zod_1.z.string().max(36),
                gradeCurricularId: zod_1.z.string().max(36),
            });
            const createParam = zod_1.z.object({
                id: zod_1.z.string().max(36),
            });
            const { cargaHoraria, disciplinaId, gradeCurricularId } = createBody.parse(req.body);
            const { id } = createParam.parse(req.params);
            const disciplinaGradeRepository = (0, makeDisciplinaGradeCurricularRepository_1.makeDisciplinaGradeCurricularRepository)();
            const disciplinaRepository = (0, makeDisciplinaRepository_1.makeDisciplinaRepository)();
            const gradeCurricularRepository = (0, makeGradeCurricularRepository_1.makeGradeCurricularRepository)();
            const disciplina = yield disciplinaRepository.get(disciplinaId);
            const gradeCurricular = yield gradeCurricularRepository.get(gradeCurricularId);
            const disciplinaGrade = yield disciplinaGradeRepository.update(id, cargaHoraria, disciplina, gradeCurricular);
            res.status(200).json({
                data: { disciplinaGradeId: disciplinaGrade.getId() },
                message: 'Atualizado com sucesso!',
            });
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.update = update;
