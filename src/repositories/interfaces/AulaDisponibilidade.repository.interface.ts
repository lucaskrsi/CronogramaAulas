import { IDisponibilidadeProfessor } from "../../models/interfaces/DisponibilidadeProfessor.interface"
import { IAulaDisponibilidade } from "../../models/interfaces/AulaDisponibilidade.interface"
import { IAula } from "../../models/interfaces/Aula.interface"

export interface IAulaDisponibilidadeRepository {
    get(id: string): Promise<IAulaDisponibilidade>
    getAll(): Promise<IAulaDisponibilidade[]>
    create(disciplinaProfessor: IAulaDisponibilidade): Promise<IAulaDisponibilidade>
   update(id: string, aula?: IAula, disponibilidadeProfessor?: IDisponibilidadeProfessor): Promise<IAulaDisponibilidade>
    delete(id: string): Promise<string>
}