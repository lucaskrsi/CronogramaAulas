import { AulaRepository } from "../PrismaRepository/Aula.repository";

export function makeAulaRepository(){
    return  new AulaRepository();
}