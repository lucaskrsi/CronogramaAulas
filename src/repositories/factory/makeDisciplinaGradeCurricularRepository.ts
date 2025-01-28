import { DisciplinaGradeRepository } from "../PrismaRepository/DisciplinaGrade.repository";

export function makeDisciplinaGradeCurricularRepository(){
    return  new DisciplinaGradeRepository();
}