import { IAula } from "./Aula.interface";
import { IDisponibilidadeProfessor } from "./DisponibilidadeProfessor.interface";

export interface IAulaDisponibilidade
{
    getId(): string;
    setId(id: string): void;
    getAula(): IAula;
    setAula(aula: IAula): void;
    getDisponibilidadeProfessor(): IDisponibilidadeProfessor
    setDisponibilidadeProfessor(disponibilidadeProfessor: IDisponibilidadeProfessor): void;
}