import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeAulaDisponibilidadeRepository } from "../../../repositories/factory/makeAulaDisponibilidadeRepository";
import { AulaDisponibilidade } from "../../../models/AulaDisponibilidade";
import { makeAulaRepository } from "../../../repositories/factory/makeAulaRepository";
import { makeDisponibilidadeProfessorRepository } from "../../../repositories/factory/makeDisponibilidadeProfessorRepository.ts";

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            aulaId: z.string().max(36),
            disponibilidadeProfessorId: z.string().max(36)
        });

        const { aulaId, disponibilidadeProfessorId } = createBody.parse(req.body);

        const aulaDisponibilidadeRepository = makeAulaDisponibilidadeRepository();
        const aulaRepository = makeAulaRepository();
        const disponibilidadeProfessorRepository = makeDisponibilidadeProfessorRepository();

        const aula = await aulaRepository.get(aulaId);
        const disponibilidadeProfessor = await disponibilidadeProfessorRepository.get(disponibilidadeProfessorId);

        const aulaDisponibilidade = await aulaDisponibilidadeRepository.create(new AulaDisponibilidade(aula, disponibilidadeProfessor));

        res.status(201).json({
            data: { 
                aulaDisponibilidadeId: aulaDisponibilidade.getId(),
             },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}