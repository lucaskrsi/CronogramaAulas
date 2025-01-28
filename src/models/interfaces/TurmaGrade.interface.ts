import { IGradeCurricular } from "./GradeCurricular.interface";
import { ITurma } from "./Turma.interface";

export interface ITurmaGrade
{
    getId(): string;
    setId(id: string): void;
    getAno(): string;
    setAno(ano: string): void;
    getTurma(): ITurma
    setTurma(turma: ITurma): void;
    getGradeCurricular(): IGradeCurricular
    setGradeCurricular(gradeCurricular: IGradeCurricular): void;
}