import { IDisciplina } from "./Disciplina.interface";
import { IGradeCurricular } from "./GradeCurricular.interface";

export interface IDisciplinaGrade
{
    getId(): string;
    setId(id: string): void;
    getCargaHoraria(): number;
    setCargaHoraria(cargaHoraria: number): void;
    getDisciplina(): IDisciplina;
    setDisciplina(disciplina: IDisciplina): void;
    getGradeCurricular(): IGradeCurricular;
    setGradeCurricular(gradeCurricular: IGradeCurricular): void;
}