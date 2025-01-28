import { TurmaGradeRepository } from "../PrismaRepository/TurmaGrade.repository";

export function makeTurmaGradeCurricularRepository(){
    return  new TurmaGradeRepository();
}