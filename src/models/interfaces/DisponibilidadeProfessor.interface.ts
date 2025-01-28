import { IProfessor } from "./Professor.interface";

export interface IDisponibilidadeProfessor
{
    getId(): string;
    setId(id: string): void;
    getDiaDaSemana(): string;
    setDiaDaSemana(diaDaSemana: string): void;
    getTurno(): string;
    setTurno(turno: string): void;
    getProfessor(): IProfessor;
    setProfessor(professor: IProfessor): void;
}