import { IDisponibilidadeProfessor } from "../../models/interfaces/DisponibilidadeProfessor.interface"
import { IProfessor } from "../../models/interfaces/Professor.interface"

export interface IDisponibilidadeProfessorRepository {
    get(id: string): Promise<IDisponibilidadeProfessor>
    getAll(): Promise<IDisponibilidadeProfessor[]>
    create(disponibilidadeProfessor: IDisponibilidadeProfessor): Promise<IDisponibilidadeProfessor>
    update(id: string, diaDaSemana?: string, turno?: string, professor?: IProfessor): Promise<IDisponibilidadeProfessor>
    delete(id: string): Promise<string>
}