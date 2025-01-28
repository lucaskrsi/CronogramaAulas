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
const makeAulaDisponibilidadeRepository_1 = require("../../../repositories/factory/makeAulaDisponibilidadeRepository");
function getAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const aulaDisponibilidadeRepository = (0, makeAulaDisponibilidadeRepository_1.makeAulaDisponibilidadeRepository)();
            const aulaDisponibilidadeList = yield aulaDisponibilidadeRepository.getAll();
            let list = aulaDisponibilidadeList.map(aulaDisponibilidade => {
                return {
                    id: aulaDisponibilidade.getId(),
                    aula: {
                        id: aulaDisponibilidade.getAula().getId(),
                        inicioHora: aulaDisponibilidade.getAula().getInicioHora(),
                        fimHora: aulaDisponibilidade.getAula().getFimHora(),
                        diaDaSemana: aulaDisponibilidade.getAula().getDiaDaSemana(),
                        disciplina: {
                            id: aulaDisponibilidade.getAula().getDisciplina().getId(),
                            nome: aulaDisponibilidade.getAula().getDisciplina().getNome(),
                        },
                        turma: {
                            id: aulaDisponibilidade.getAula().getTurma().getId(),
                            nome: aulaDisponibilidade.getAula().getTurma().getNome(),
                        }
                    },
                    disponibilidadeProfessor: {
                        id: aulaDisponibilidade.getDisponibilidadeProfessor().getId(),
                        diaDaSemana: aulaDisponibilidade.getDisponibilidadeProfessor().getDiaDaSemana(),
                        turno: aulaDisponibilidade.getDisponibilidadeProfessor().getTurno(),
                        professor: {
                            id: aulaDisponibilidade.getDisponibilidadeProfessor().getProfessor().getId(),
                            cargaHoraria: aulaDisponibilidade.getDisponibilidadeProfessor().getProfessor().getCargaHoraria(),
                        },
                    }
                };
            });
            res.status(200).json({
                data: {
                    aulasDisponibilidades: list,
                },
            });
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.getAll = getAll;
