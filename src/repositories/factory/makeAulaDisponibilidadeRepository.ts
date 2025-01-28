import { AulaDisponibilidadeRepository } from "../PrismaRepository/AulaDisponibilidade.repository";

export function makeAulaDisponibilidadeRepository(){
    return  new AulaDisponibilidadeRepository();
}