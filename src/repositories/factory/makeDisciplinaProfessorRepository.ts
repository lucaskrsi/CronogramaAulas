import { DisciplinaProfessorRepository } from "../PrismaRepository/DisciplinaProfessor.repository";

export function makeDisciplinaProfessorRepository(){
    return  new DisciplinaProfessorRepository();
}