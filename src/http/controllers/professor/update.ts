import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeProfessorRepository } from "../../../repositories/factory/makeProfessorRepository";

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            cargaHoraria: z.coerce.number(),
            nome: z.string().max(100),
            matricula: z.coerce.number()
        });

        const createParam = z.object({
            id: z.string().max(36),
        })

        const { cargaHoraria, nome, matricula } = createBody.parse(req.body);
        const { id } = createParam.parse(req.params);

        const professorRepository = makeProfessorRepository();

        const professor = await professorRepository.update(id, cargaHoraria, nome, matricula);
        res.status(200).json({
            data: { professorId: professor.getId() },
            message: 'Atualizado com sucesso!',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}