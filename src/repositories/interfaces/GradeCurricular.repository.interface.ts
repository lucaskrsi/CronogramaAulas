import { IGradeCurricular } from "../../models/interfaces/GradeCurricular.interface"

export interface IGradeCurricularRepository {
    get(id: string): Promise<IGradeCurricular>
    getAll(): Promise<IGradeCurricular[]>
    create(grade: IGradeCurricular): Promise<IGradeCurricular>
    update(id: string, nome?: string): Promise<IGradeCurricular>
    delete(id: string): Promise<string>
}