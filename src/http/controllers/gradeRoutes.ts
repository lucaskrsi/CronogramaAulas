import { Router } from "express";
import { gerarGradeHoraria } from "../../service/geracaoAutomatica";
import { makeDisciplinaProfessorRepository } from "../../repositories/factory/makeDisciplinaProfessorRepository";
import {
    makeDisponibilidadeProfessorRepository
} from "../../repositories/factory/makeDisponibilidadeProfessorRepository.ts";

export async function gradeRoutes(router: Router) {
    router.get("/gerar-grade", async (req, res, next) => {
        try {
            // Obtendo os dados diretamente dos repositórios
            const disciplinaProfessorRepository = makeDisciplinaProfessorRepository();
            const disponibilidadeProfessorRepository = makeDisponibilidadeProfessorRepository();

            const disciplinasProfessores = await disciplinaProfessorRepository.getAll();
            const disponibilidadeProfessores = await disponibilidadeProfessorRepository.getAll();

            if (!disciplinasProfessores || !disponibilidadeProfessores) {
                return res.status(400).json({ error: "Não há dados suficientes para gerar a grade." });
            }

            // Chamando a função de geração automática
            const gradeHoraria = gerarGradeHoraria(disciplinasProfessores, disponibilidadeProfessores);
            return res.status(200).json({ grade: gradeHoraria });

        } catch (error) {
            next(error);
        }
    });
}
