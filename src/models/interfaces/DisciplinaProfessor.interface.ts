import { IDisciplina } from "./Disciplina.interface";
import { IProfessor } from "./Professor.interface";

export interface IDisciplinaProfessor
{
    getId(): string;
    setId(id: string): void;
    getProfessor(): IProfessor
    setProfessor(professor: IProfessor): void;
    getDisciplina(): IDisciplina
    setDisciplina(disciplina: IDisciplina): void;
}