import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeAulaRepository } from "../../../repositories/factory/makeAulaRepository";

export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const aulaRepository = makeAulaRepository();
        const aulaList = await aulaRepository.getAll();
        let list = aulaList.map(aula => {
            return {
                id: aula.getId(),
                inicioHora: aula.getInicioHora(),
                fimHora: aula.getFimHora(),
                diaDaSemana: aula.getDiaDaSemana(),
                turma: {
                    id: aula.getTurma().getId(),
                    nome: aula.getTurma().getNome(),
                },
                disciplina: {
                    id: aula.getDisciplina().getId(),
                    nome: aula.getDisciplina().getNome(),
                }
            };
        });
        res.status(200).json({
            data: {
                aulas: list,
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}