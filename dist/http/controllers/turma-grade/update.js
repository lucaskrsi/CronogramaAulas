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
const makeGradeCurricularRepository_1 = require("../../../repositories/factory/makeGradeCurricularRepository");
const makeTurmaRepository_1 = require("../../../repositories/factory/makeTurmaRepository");
const makeTurmaGradeCurricularRepository_1 = require("../../../repositories/factory/makeTurmaGradeCurricularRepository");
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createBody = zod_1.z.object({
                ano: zod_1.z.string(),
                turmaId: zod_1.z.string().max(36),
                gradeCurricularId: zod_1.z.string().max(36)
            });
            const createParam = zod_1.z.object({
                id: zod_1.z.string().max(36),
            });
            const { ano, turmaId, gradeCurricularId } = createBody.parse(req.body);
            const { id } = createParam.parse(req.params);
            const turmaGradeRepository = (0, makeTurmaGradeCurricularRepository_1.makeTurmaGradeCurricularRepository)();
            const gradeCurricularRepository = (0, makeGradeCurricularRepository_1.makeGradeCurricularRepository)();
            const turmaRepository = (0, makeTurmaRepository_1.makeTurmaRepository)();
            const grade = yield gradeCurricularRepository.get(gradeCurricularId);
            const turma = yield turmaRepository.get(turmaId);
            const turmaGrade = yield turmaGradeRepository.update(id, ano, turma, grade);
            res.status(200).json({
                data: { turmaGradeId: turmaGrade.getId() },
                message: 'Atualizado com sucesso!',
            });
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.update = update;
