import { ITurma } from "../../models/interfaces/Turma.interface";

export interface ITurmaRepository{
    get(id: string): Promise<ITurma>
    getAll(): Promise<ITurma[]>
    create(turma: ITurma): Promise<ITurma>
    update(id: string, nome?: string): Promise<ITurma>
    delete(id: string): Promise<string>
}