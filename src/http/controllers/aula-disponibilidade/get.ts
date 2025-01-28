import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeAulaDisponibilidadeRepository } from "../../../repositories/factory/makeAulaDisponibilidadeRepository";

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const aulaDisponibilidadeRepository = makeAulaDisponibilidadeRepository();
        const aulaDisponibilidade = await aulaDisponibilidadeRepository.get(id);
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
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}