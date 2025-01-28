import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeGradeCurricularRepository } from "../../../repositories/factory/makeGradeCurricularRepository";
import { GradeCurricular } from "../../../models/GradeCurricular";

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            nome: z.string().max(100),
        });

        const { nome } = createBody.parse(req.body);

        const gradeCurricularRepository = makeGradeCurricularRepository();

        const gradeCurricular = await gradeCurricularRepository.create(new GradeCurricular(nome));

        res.status(201).json({
            data: { 
                gradeCurricularId: gradeCurricular.getId(),
             },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}