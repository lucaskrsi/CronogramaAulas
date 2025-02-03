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
exports.get = void 0;
const zod_1 = require("zod");
const ErrorHandler_1 = require("../../../exceptions/ErrorHandler");
const makeDisponibilidadeProfessorRepository_ts_1 = require("../../../repositories/factory/makeDisponibilidadeProfessorRepository.ts");
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createParam = zod_1.z.object({
                id: zod_1.z.string().max(36),
            });
            const { id } = createParam.parse(req.params);
            const disponibilidadeProfessorRepository = (0, makeDisponibilidadeProfessorRepository_ts_1.makeDisponibilidadeProfessorRepository)();
            const disponibilidadeProfessor = yield disponibilidadeProfessorRepository.get(id);
            res.status(200).json({
                data: {
                    id: disponibilidadeProfessor.getId(),
                    diaDaSemana: disponibilidadeProfessor.getDiaDaSemana(),
                    inicioHora: disponibilidadeProfessor.getInicioHora(),
                    fimHora: disponibilidadeProfessor.getFimHora(),
                    professor: {
                        id: disponibilidadeProfessor.getProfessor().getId(),
                        cargaHoraria: disponibilidadeProfessor.getProfessor().getCargaHoraria(),
                    }
                }
            });
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.get = get;
