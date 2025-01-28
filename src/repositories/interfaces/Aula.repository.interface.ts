import { IDisciplina } from "../../models/interfaces/Disciplina.interface"
import { IAula } from "../../models/interfaces/Aula.interface"
import { ITurma } from "../../models/interfaces/Turma.interface"

export interface IAulaRepository {
    get(id: string): Promise<IAula>
    getAll(): Promise<IAula[]>
    create(aula: IAula): Promise<IAula>
    update(id: string, inicioHora?: string, fimHora?: string, diaDaSemana?: string, disciplina?: IDisciplina, turma?: ITurma): Promise<IAula>
    delete(id: string): Promise<string>
}