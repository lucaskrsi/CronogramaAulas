import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeDisciplinaRepository } from "../../../repositories/factory/makeDisciplinaRepository";
import { Disciplina } from "../../../models/Disciplina";

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            nome: z.string().max(100),
        });

        const { nome } = createBody.parse(req.body);

        const disciplinaRepository = makeDisciplinaRepository();

        const disciplina = await disciplinaRepository.create(new Disciplina(nome));

        res.status(201).json({
            data: { 
                disciplinaId: disciplina.getId(),
             },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}