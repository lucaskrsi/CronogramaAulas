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
const makeDisponibilidadeProfessorRepository_ts_1 = require("../../../repositories/factory/makeDisponibilidadeProfessorRepository.ts");
function getAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const disponibilidadeProfessorRepository = (0, makeDisponibilidadeProfessorRepository_ts_1.makeDisponibilidadeProfessorRepository)();
            const disponibilidadeProfessorList = yield disponibilidadeProfessorRepository.getAll();
            let list = disponibilidadeProfessorList.map(disponibilidadeProfessor => {
                return {
                    id: disponibilidadeProfessor.getId(),
                    diaDaSemana: disponibilidadeProfessor.getDiaDaSemana(),
                    incioHora: disponibilidadeProfessor.getInicioHora(),
                    fimHora: disponibilidadeProfessor.getFimHora(),
                    professor: {
                        id: disponibilidadeProfessor.getProfessor().getId(),
                        cargaHoraria: disponibilidadeProfessor.getProfessor().getCargaHoraria(),
                    }
                };
            });
            res.status(200).json({
                data: {
                    disponibilidadeProfessores: list,
                },
            });
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.getAll = getAll;
