import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeDisponibilidadeProfessorRepository } from "../../../repositories/factory/makeDisponibilidadeProfessorRepository.ts";

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const disponibilidadeProfessorRepository = makeDisponibilidadeProfessorRepository();
        const disponibilidadeProfessor = await disponibilidadeProfessorRepository.get(id);
        res.status(200).json({
            data: {
                id: disponibilidadeProfessor.getId(),
                diaDaSemana: disponibilidadeProfessor.getDiaDaSemana(),
                inicioHora: disponibilidadeProfessor.getInicioHora(),
                fimHora: disponibilidadeProfessor.getFimHora(),
                professor: {
                    id: disponibilidadeProfessor.getProfessor().getId(),
                    cargaHoraria: disponibilidadeProfessor.getProfessor().getCargaHoraria(),
                }
            }
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}