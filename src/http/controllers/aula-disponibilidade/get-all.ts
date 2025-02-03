import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeAulaDisponibilidadeRepository } from "../../../repositories/factory/makeAulaDisponibilidadeRepository";

export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const aulaDisponibilidadeRepository = makeAulaDisponibilidadeRepository();
        const aulaDisponibilidadeList = await aulaDisponibilidadeRepository.getAll();
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
                    inicioHora: aulaDisponibilidade.getDisponibilidadeProfessor().getInicioHora(),
                    fimHora: aulaDisponibilidade.getDisponibilidadeProfessor().getFimHora(),
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
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}