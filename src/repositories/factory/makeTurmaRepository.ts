import { TurmaRepository } from "../PrismaRepository/Turma.repository";

export function makeTurmaRepository(){
    return  new TurmaRepository();
}