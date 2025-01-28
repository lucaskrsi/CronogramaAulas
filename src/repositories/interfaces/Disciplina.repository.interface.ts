import { IDisciplina } from "../../models/interfaces/Disciplina.interface"

export interface IDisciplinaRepository {
    get(id: string): Promise<IDisciplina>
    getAll(): Promise<IDisciplina[]>
    create(disciplina: IDisciplina): Promise<IDisciplina>
    update(id: string, nome?: string): Promise<IDisciplina>
    delete(id: string): Promise<string>
}