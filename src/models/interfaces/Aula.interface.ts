import { IDisciplina } from "./Disciplina.interface";
import { ITurma } from "./Turma.interface";

export interface IAula
{
    getId(): string;
    setId(id: string): void;
    getInicioHora(): string
    setInicioHora(hora: string): void;
    getFimHora(): string
    setFimHora(hora: string): void;
    getDiaDaSemana(): string
    setDiaDaSemana(dia: string): void;
    getTurma(): ITurma
    setTurma(turma: ITurma): void;
    getDisciplina(): IDisciplina
    setDisciplina(disciplina: IDisciplina): void;
}