import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { DisponibilidadeProfessor } from "../../../models/DisponibilidadeProfessor";
import { makeDisponibilidadeProfessorRepository } from "../../../repositories/factory/makeDisponibilidadeProfessorRepository.ts";
import { makeProfessorRepository } from "../../../repositories/factory/makeProfessorRepository";

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            diaDaSemana: z.string().max(100),
            inicioHora: z.string(),
            fimHora: z.string(),
            professorId: z.string().max(36),
        });

        const { diaDaSemana, inicioHora, fimHora, professorId } = createBody.parse(req.body);

        const disponibilidadeProfessorRepository = makeDisponibilidadeProfessorRepository();
        const professorRepository = makeProfessorRepository();

        const professor = await professorRepository.get(professorId);

        const disponibilidadeProfessor = await disponibilidadeProfessorRepository.create(new DisponibilidadeProfessor(diaDaSemana, inicioHora, fimHora, professor));

        res.status(201).json({
            data: {
                disponibilidadeProfessorId: disponibilidadeProfessor.getId(),
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}