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
const makeAulaDisponibilidadeRepository_1 = require("../../../repositories/factory/makeAulaDisponibilidadeRepository");
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createParam = zod_1.z.object({
                id: zod_1.z.string().max(36),
            });
            const { id } = createParam.parse(req.params);
            const aulaDisponibilidadeRepository = (0, makeAulaDisponibilidadeRepository_1.makeAulaDisponibilidadeRepository)();
            const aulaDisponibilidade = yield aulaDisponibilidadeRepository.get(id);
            res.status(200).json({
                data: {
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
                },
            });
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.get = get;
