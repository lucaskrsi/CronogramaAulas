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
const makeProfessorRepository_1 = require("../../../repositories/factory/makeProfessorRepository");
const makeDisponibilidadeProfessorRepository_ts_1 = require("../../../repositories/factory/makeDisponibilidadeProfessorRepository.ts");
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createBody = zod_1.z.object({
                diaDaSemana: zod_1.z.string().max(100),
                inicioHora: zod_1.z.string(),
                fimHora: zod_1.z.string(),
                professorId: zod_1.z.string().max(36),
            });
            const createParam = zod_1.z.object({
                id: zod_1.z.string().max(36),
            });
            const { diaDaSemana, inicioHora, fimHora, professorId } = createBody.parse(req.body);
            const { id } = createParam.parse(req.params);
            const disponibilidadeProfessorRepository = (0, makeDisponibilidadeProfessorRepository_ts_1.makeDisponibilidadeProfessorRepository)();
            const professorRepository = (0, makeProfessorRepository_1.makeProfessorRepository)();
            const professor = yield professorRepository.get(professorId);
            const disponibilidadeProfessor = yield disponibilidadeProfessorRepository.update(id, diaDaSemana, inicioHora, fimHora, professor);
            res.status(200).json({
                data: { disponibilidadeProfessorId: disponibilidadeProfessor.getId() },
                message: 'Atualizado com sucesso!',
            });
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.update = update;
