import { DisponibilidadeProfessorRepository } from "../PrismaRepository/DisponibilidadeProfessor.repository";

export function makeDisponibilidadeProfessorRepository(){
    return  new DisponibilidadeProfessorRepository();
}