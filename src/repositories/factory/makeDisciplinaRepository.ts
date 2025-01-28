import { DisciplinaRepository } from "../PrismaRepository/Disciplina.repository";

export function makeDisciplinaRepository(){
    return  new DisciplinaRepository();
}