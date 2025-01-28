import { IProfessor } from "../../models/interfaces/Professor.interface"

export interface IProfessorRepository {
    get(id: string): Promise<IProfessor>
    getAll(): Promise<IProfessor[]>
    create(professor: IProfessor): Promise<IProfessor>
    update(id: string, cargaHoraria?: number): Promise<IProfessor>
    delete(id: string): Promise<string>
}