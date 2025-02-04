import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeAulaRepository } from "../../../repositories/factory/makeAulaRepository";
import { Aula } from "../../../models/Aula";
import { makeDisciplinaRepository } from "../../../repositories/factory/makeDisciplinaRepository";
import { makeTurmaRepository } from "../../../repositories/factory/makeTurmaRepository";
import { makeDisciplinaProfessorRepository } from "../../../repositories/factory/makeDisciplinaProfessorRepository";
import { makeDisponibilidadeProfessorRepository } from "../../../repositories/factory/makeDisponibilidadeProfessorRepository.ts";
import { makeAulaDisponibilidadeRepository } from "../../../repositories/factory/makeAulaDisponibilidadeRepository";
import { makeProfessorRepository } from "../../../repositories/factory/makeProfessorRepository";
import { makeDisciplinaGradeCurricularRepository } from "../../../repositories/factory/makeDisciplinaGradeCurricularRepository";
import { makeGradeCurricularRepository } from "../../../repositories/factory/makeGradeCurricularRepository";


export async function Generate(req: Request, res: Response, next: NextFunction) {
    try {
        // Validação do corpo da requisição
        const createBody = z.object({
            inicioHora: z.string(),
            fimHora: z.string(),
            diaDaSemana: z.string(),
            disciplinaId: z.string().max(36),
            turmaId: z.string().max(36),
            semestre: z.string(),
        });

        const { inicioHora, fimHora, diaDaSemana, disciplinaId, turmaId, semestre } = createBody.parse(req.body);

        // Instanciação dos repositórios
        const aulaRepository = makeAulaRepository();
        const disciplinaRepository = makeDisciplinaRepository();
        const turmaRepository = makeTurmaRepository();
        const disciplinaProfessorRepository = makeDisciplinaProfessorRepository();
        const disponibilidadeProfessorRepository = makeDisponibilidadeProfessorRepository();
        const aulaDisponibilidadeRepository = makeAulaDisponibilidadeRepository();
        const professorRepository = makeProfessorRepository();
        const disciplinaGradeCurricularRepository = makeDisciplinaGradeCurricularRepository();
        const gradeCurricularRepository = makeGradeCurricularRepository();

        // Recupera a disciplina e a turma pelos IDs
        const disciplina = await disciplinaRepository.get(disciplinaId);
        const turma = await turmaRepository.get(turmaId);

        if (!disciplina) {
            throw new Error("Disciplina não encontrada.");
        }

        if (!turma) {
            throw new Error("Turma não encontrada.");
        }

        // Obtém a grade curricular da turma
        const gradeCurricular = await gradeCurricularRepository.getAll();
        if (!gradeCurricular) {
            throw new Error("Grade curricular não encontrada para o semestre informado.");
        }

        // Verifica se a disciplina está na grade curricular
        const disciplinaNaGrade = await disciplinaGradeCurricularRepository.getAll() ==null;
        if (!disciplinaNaGrade) {
            throw new Error("Disciplina não pertence à grade curricular do semestre informado.");
        }

        // Obtém professores que ministram essa disciplina
        const professores = await disciplinaProfessorRepository.getAll();
        if (professores.length === 0) {
            throw new Error("Nenhum professor disponível para esta disciplina.");
        }

        // Filtra professores disponíveis no horário solicitado
        let professorDisponivel = null;
        for (const professor of professores) {
            const disponibilidade = await disponibilidadeProfessorRepository.get(professor.getId());

            // Verifica se disponibilidade é uma array válida antes de chamar .some()
            if (Array.isArray(disponibilidade) && disponibilidade.length > 0) {
                const disponivelNoHorario = disponibilidade.some((disp) => 
                disp.diaDaSemana === diaDaSemana &&
                disp.inicioHora <= inicioHora &&
                disp.fimHora >= fimHora
                );

                if (disponivelNoHorario) {
                    professorDisponivel = professor;
                break;
                }
            }

        }

        if (!professorDisponivel) {
            throw new Error("Nenhum professor disponível no horário solicitado.");
        }

        // Criação de uma nova aula com o professor disponível
        const aula = await aulaRepository.create(new Aula(inicioHora, fimHora, diaDaSemana, disciplina, turma, professorDisponivel));

        res.status(201).json({
            data: {
                aulaId: aula.getId(),
                professorId: professorDisponivel.id,
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}
