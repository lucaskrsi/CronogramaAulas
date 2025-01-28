import { IGradeCurricular } from "../../models/interfaces/GradeCurricular.interface"
import { ITurmaGrade } from "../../models/interfaces/TurmaGrade.interface"
import { ITurma } from "../../models/interfaces/Turma.interface"

export interface ITurmaGradeRepository {
    get(id: string): Promise<ITurmaGrade>
    getAll(): Promise<ITurmaGrade[]>
    create(turmaGrade: ITurmaGrade): Promise<ITurmaGrade>
    update(id: string, ano?: string, turma?: ITurma, grade?: IGradeCurricular): Promise<ITurmaGrade>
    delete(id: string): Promise<string>
}