import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeAulaDisponibilidadeRepository } from "../../../repositories/factory/makeAulaDisponibilidadeRepository";
import { makeAulaRepository } from "../../../repositories/factory/makeAulaRepository";
import { makeDisponibilidadeProfessorRepository } from "../../../repositories/factory/makeDisponibilidadeProfessorRepository.ts";

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            aulaId: z.string().max(36),
            disponibilidadeProfessorId: z.string().max(36)
        });

        const createParam = z.object({
            id: z.string().max(36),
        })

        const { aulaId, disponibilidadeProfessorId } = createBody.parse(req.body);
        const { id } = createParam.parse(req.params);

        const aulaDisponibilidadeRepository = makeAulaDisponibilidadeRepository();
        const aulaRepository = makeAulaRepository();
        const disponibilidadeProfessorRepository = makeDisponibilidadeProfessorRepository();

        const aula = await aulaRepository.get(aulaId);
        const disponibilidadeProfessor = await disponibilidadeProfessorRepository.get(disponibilidadeProfessorId);

        const aulaDisponibilidade = await aulaDisponibilidadeRepository.update(id, aula, disponibilidadeProfessor);
        res.status(200).json({
            data: { aulaDisponibilidadeId: aulaDisponibilidade.getId() },
            message: 'Atualizado com sucesso!',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}