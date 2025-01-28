import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { DisciplinaGrade } from "../../../models/DisciplinaGrade";
import { makeGradeCurricularRepository } from "../../../repositories/factory/makeGradeCurricularRepository";
import { makeDisciplinaRepository } from "../../../repositories/factory/makeDisciplinaRepository";
import { makeDisciplinaGradeCurricularRepository } from "../../../repositories/factory/makeDisciplinaGradeCurricularRepository";

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            cargaHoraria: z.coerce.number(),
            disciplinaId: z.string().max(36),
            gradeCurricularId: z.string().max(36),
        });

        const { cargaHoraria, disciplinaId, gradeCurricularId } = createBody.parse(req.body);

        const disciplinaGradeRepository = makeDisciplinaGradeCurricularRepository();
        const disciplinaRepository = makeDisciplinaRepository();
        const gradeCurricularRepository = makeGradeCurricularRepository();

        const disciplina = await disciplinaRepository.get(disciplinaId);
        const gradeCurricular = await gradeCurricularRepository.get(gradeCurricularId);


        const disciplinaGrade = await disciplinaGradeRepository.create(new DisciplinaGrade(cargaHoraria, disciplina, gradeCurricular));

        res.status(201).json({
            data: {
                disciplinaGradeId: disciplinaGrade.getId(),
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}