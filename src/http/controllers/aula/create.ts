import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeAulaRepository } from "../../../repositories/factory/makeAulaRepository";
import { Aula } from "../../../models/Aula";
import { makeDisciplinaRepository } from "../../../repositories/factory/makeDisciplinaRepository";
import { makeTurmaRepository } from "../../../repositories/factory/makeTurmaRepository";

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            inicioHora: z.string(),
            fimHora: z.string(),
            diaDaSemana: z.string(),
            disciplinaId: z.string().max(36),
            turmaId: z.string().max(36),
        });

        const { inicioHora, fimHora, diaDaSemana, disciplinaId, turmaId } = createBody.parse(req.body);

        const aulaRepository = makeAulaRepository();
        const disciplinaRepository = makeDisciplinaRepository();
        const turmaRepository = makeTurmaRepository();

        const disciplina = await disciplinaRepository.get(disciplinaId);
        const turma = await turmaRepository.get(turmaId);

        const aula = await aulaRepository.create(new Aula(inicioHora, fimHora, diaDaSemana, disciplina, turma));

        res.status(201).json({
            data: { 
                aulaId: aula.getId(),
             },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}