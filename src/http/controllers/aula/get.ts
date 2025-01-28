import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeAulaRepository } from "../../../repositories/factory/makeAulaRepository";

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const aulaRepository = makeAulaRepository();
        const aula = await aulaRepository.get(id);
        res.status(200).json({
            data: {
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
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}