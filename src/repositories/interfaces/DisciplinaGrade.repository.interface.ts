import { IGradeCurricular } from "../../models/interfaces/GradeCurricular.interface"
import { IDisciplinaGrade } from "../../models/interfaces/DisciplinaGrade.interface"
import { IDisciplina } from "../../models/interfaces/Disciplina.interface"

export interface IDisciplinaGradeRepository {
    get(id: string): Promise<IDisciplinaGrade>
    getAll(): Promise<IDisciplinaGrade[]>
    create(disciplinaGrade: IDisciplinaGrade): Promise<IDisciplinaGrade>
    update(id: string, cargaHoraria?: number, disciplina?: IDisciplina, grade?: IGradeCurricular): Promise<IDisciplinaGrade>
    delete(id: string): Promise<string>
}