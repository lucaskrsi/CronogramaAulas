import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeProfessorRepository } from "../../../repositories/factory/makeProfessorRepository";
import { makeDisponibilidadeProfessorRepository } from "../../../repositories/factory/makeDisponibilidadeProfessorRepository.ts";

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            diaDaSemana: z.string().max(100),
            turno: z.string().max(100),
            professorId: z.string().max(36),
        });

        const createParam = z.object({
            id: z.string().max(36),
        })

        const { diaDaSemana, turno, professorId } = createBody.parse(req.body);
        const { id } = createParam.parse(req.params);

        const disponibilidadeProfessorRepository = makeDisponibilidadeProfessorRepository();
        const professorRepository = makeProfessorRepository();

        const professor = await professorRepository.get(professorId);


        const disponibilidadeProfessor = await disponibilidadeProfessorRepository.update(id, diaDaSemana, turno, professor);
        res.status(200).json({
            data: { disponibilidadeProfessorId: disponibilidadeProfessor.getId() },
            message: 'Atualizado com sucesso!',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}