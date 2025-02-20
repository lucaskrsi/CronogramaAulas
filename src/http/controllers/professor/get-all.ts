import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeProfessorRepository } from "../../../repositories/factory/makeProfessorRepository";

export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const professorRepository = makeProfessorRepository();
        const professorList = await professorRepository.getAll();
        let list = professorList.map(professor => {
            return {
                id: professor.getId(),
                cargaHoraria: professor.getCargaHoraria(),
                nome: professor.getNome(),
                matricula: professor.getMatricula(),
            };
        });
        res.status(200).json({
            data: {
                professores: list,
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}