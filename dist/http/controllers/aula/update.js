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
const makeAulaRepository_1 = require("../../../repositories/factory/makeAulaRepository");
const makeDisciplinaRepository_1 = require("../../../repositories/factory/makeDisciplinaRepository");
const makeTurmaRepository_1 = require("../../../repositories/factory/makeTurmaRepository");
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createBody = zod_1.z.object({
                inicioHora: zod_1.z.string(),
                fimHora: zod_1.z.string(),
                diaDaSemana: zod_1.z.string(),
                disciplinaId: zod_1.z.string().max(36),
                turmaId: zod_1.z.string().max(36),
            });
            const createParam = zod_1.z.object({
                id: zod_1.z.string().max(36),
            });
            const { inicioHora, fimHora, diaDaSemana, disciplinaId, turmaId } = createBody.parse(req.body);
            const { id } = createParam.parse(req.params);
            const aulaRepository = (0, makeAulaRepository_1.makeAulaRepository)();
            const disciplinaRepository = (0, makeDisciplinaRepository_1.makeDisciplinaRepository)();
            const turmaRepository = (0, makeTurmaRepository_1.makeTurmaRepository)();
            const disciplina = yield disciplinaRepository.get(disciplinaId);
            const turma = yield turmaRepository.get(turmaId);
            const aula = yield aulaRepository.update(id, inicioHora, fimHora, diaDaSemana, disciplina, turma);
            res.status(200).json({
                data: { aulaId: aula.getId() },
                message: 'Atualizado com sucesso!',
            });
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.update = update;
