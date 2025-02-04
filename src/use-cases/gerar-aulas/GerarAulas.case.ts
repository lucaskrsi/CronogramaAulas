import { makeDisciplinaGradeCurricularRepository } from "../../repositories/factory/makeDisciplinaGradeCurricularRepository";
import { makeTurmaGradeCurricularRepository } from "../../repositories/factory/makeTurmaGradeCurricularRepository";
import { makeTurmaRepository } from "../../repositories/factory/makeTurmaRepository";
import { makeGradeCurricularRepository } from "../../repositories/factory/makeGradeCurricularRepository";
import { IDisciplinaProfessor } from "models/interfaces/DisciplinaProfessor.interface";
import { makeDisciplinaProfessorRepository } from "repositories/factory/makeDisciplinaProfessorRepository";
import { makeAulaDisponibilidadeRepository } from "repositories/factory/makeAulaDisponibilidadeRepository";

export async function gerarAulas(turmaId: string, dataInicioDasAulas: string)
{
    const turmaRepository = makeTurmaRepository();
    const turma = await turmaRepository.get(turmaId);

    const turmaGradeRepository = makeTurmaGradeCurricularRepository();
    const turmaGrade = await turmaGradeRepository.getByTurma(turma);

    const disciplinaGradeRepository = makeDisciplinaGradeCurricularRepository();
    const disciplinasDaGrade = await disciplinaGradeRepository.getByGrade(turmaGrade.getGradeCurricular());

    const disciplinaProfessorRepository = makeDisciplinaProfessorRepository();
    const disciplinasProfessor = await disciplinaProfessorRepository.getAll();

    const disponibilidadeProfessorRepository = makeDisciplinaProfessorRepository();
    const disponibilidadeProfessor = await disponibilidadeProfessorRepository.getAll();
    
    const aulaDisponibilidadeRepository = makeAulaDisponibilidadeRepository();
    const aulaDisponibilidade = await aulaDisponibilidadeRepository.getAll();

    // Implementar o algoritmo de geração de aulas com base nas disciplinas da grade, carga horaria das disciplinas da grade, professores disponíveis, carga horária máxima dos professores e horarios ainda diponíveis.

    let aulasGeradas = null;

    for(const disciplinaDaGrade of disciplinasDaGrade){

    }
    
}