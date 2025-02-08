import { IDisciplina } from "../../models/interfaces/Disciplina.interface"
import { IDisciplinaProfessor } from "../../models/interfaces/DisciplinaProfessor.interface"
import { IProfessor } from "../../models/interfaces/Professor.interface"

export interface IDisciplinaProfessorRepository {
    get(id: string, canPass: boolean): Promise<IDisciplinaProfessor>
    getAll(): Promise<IDisciplinaProfessor[]>
    create(disciplinaProfessor: IDisciplinaProfessor): Promise<IDisciplinaProfessor>
    update(id: string, disciplina ?: IDisciplina, professor?: IProfessor): Promise < IDisciplinaProfessor >
    delete(id: string): Promise<string>
}