import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeDisponibilidadeProfessorRepository } from "../../../repositories/factory/makeDisponibilidadeProfessorRepository.ts";

export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const disponibilidadeProfessorRepository = makeDisponibilidadeProfessorRepository();
        const disponibilidadeProfessorList = await disponibilidadeProfessorRepository.getAll();
        let list = disponibilidadeProfessorList.map(disponibilidadeProfessor => {
            return {
                id: disponibilidadeProfessor.getId(),
                diaDaSemana: disponibilidadeProfessor.getDiaDaSemana(),
                turno: disponibilidadeProfessor.getTurno(),
                professor: {
                    id: disponibilidadeProfessor.getProfessor().getId(),
                    cargaHoraria: disponibilidadeProfessor.getProfessor().getCargaHoraria(),
                }
            };
        });
        res.status(200).json({
            data: {
                disponibilidadeProfessores: list,
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}