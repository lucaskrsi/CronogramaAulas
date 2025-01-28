import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeProfessorRepository } from "../../../repositories/factory/makeProfessorRepository";
import { Professor } from "../../../models/Professor";

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            cargaHoraria: z.coerce.number(),
        });

        const { cargaHoraria } = createBody.parse(req.body);

        const professorRepository = makeProfessorRepository();

        const professor = await professorRepository.create(new Professor(cargaHoraria));

        res.status(201).json({
            data: { 
                professorId: professor.getId(),
             },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}