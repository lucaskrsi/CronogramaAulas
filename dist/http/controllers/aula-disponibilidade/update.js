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
const makeAulaDisponibilidadeRepository_1 = require("../../../repositories/factory/makeAulaDisponibilidadeRepository");
const makeAulaRepository_1 = require("../../../repositories/factory/makeAulaRepository");
const makeDisponibilidadeProfessorRepository_ts_1 = require("../../../repositories/factory/makeDisponibilidadeProfessorRepository.ts");
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createBody = zod_1.z.object({
                aulaId: zod_1.z.string().max(36),
                disponibilidadeProfessorId: zod_1.z.string().max(36)
            });
            const createParam = zod_1.z.object({
                id: zod_1.z.string().max(36),
            });
            const { aulaId, disponibilidadeProfessorId } = createBody.parse(req.body);
            const { id } = createParam.parse(req.params);
            const aulaDisponibilidadeRepository = (0, makeAulaDisponibilidadeRepository_1.makeAulaDisponibilidadeRepository)();
            const aulaRepository = (0, makeAulaRepository_1.makeAulaRepository)();
            const disponibilidadeProfessorRepository = (0, makeDisponibilidadeProfessorRepository_ts_1.makeDisponibilidadeProfessorRepository)();
            const aula = yield aulaRepository.get(aulaId);
            const disponibilidadeProfessor = yield disponibilidadeProfessorRepository.get(disponibilidadeProfessorId);
            const aulaDisponibilidade = yield aulaDisponibilidadeRepository.update(id, aula, disponibilidadeProfessor);
            res.status(200).json({
                data: { aulaDisponibilidadeId: aulaDisponibilidade.getId() },
                message: 'Atualizado com sucesso!',
            });
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.update = update;
