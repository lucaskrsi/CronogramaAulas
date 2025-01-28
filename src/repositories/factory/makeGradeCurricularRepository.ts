import { GradeCurricularRepository } from "../PrismaRepository/GradeCurricular.repository";

export function makeGradeCurricularRepository(){
    return  new GradeCurricularRepository();
}