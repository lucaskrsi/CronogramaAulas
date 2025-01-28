import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeDisciplinaGradeCurricularRepository } from "../../../repositories/factory/makeDisciplinaGradeCurricularRepository";
import { makeDisciplinaRepository } from "../../../repositories/factory/makeDisciplinaRepository";
import { makeGradeCurricularRepository } from "../../../repositories/factory/makeGradeCurricularRepository";

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            cargaHoraria: z.coerce.number(),
            disciplinaId: z.string().max(36),
            gradeCurricularId: z.string().max(36),
        });

        const createParam = z.object({
            id: z.string().max(36),
        })

        const { cargaHoraria, disciplinaId, gradeCurricularId } = createBody.parse(req.body);
        const { id } = createParam.parse(req.params);

        const disciplinaGradeRepository = makeDisciplinaGradeCurricularRepository();
        const disciplinaRepository = makeDisciplinaRepository();
        const gradeCurricularRepository = makeGradeCurricularRepository();

        const disciplina = await disciplinaRepository.get(disciplinaId);
        const gradeCurricular = await gradeCurricularRepository.get(gradeCurricularId);

        const disciplinaGrade = await disciplinaGradeRepository.update(id, cargaHoraria, disciplina, gradeCurricular);
        res.status(200).json({
            data: { disciplinaGradeId: disciplinaGrade.getId() },
            message: 'Atualizado com sucesso!',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}