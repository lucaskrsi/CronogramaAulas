import { IProfessor } from "./Professor.interface";

export interface IDisponibilidadeProfessor
{
    getId(): string;
    setId(id: string): void;
    getDiaDaSemana(): string;
    setDiaDaSemana(diaDaSemana: string): void;
    getInicioHora(): string;
    setInicioHora(inicioHora: string): void;
    getFimHora(): string;
    setFimHora(fimHora: string): void;
    getProfessor(): IProfessor;
    setProfessor(professor: IProfessor): void;
}