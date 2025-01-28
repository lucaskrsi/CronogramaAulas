import { IAula } from "./interfaces/Aula.interface";
import { IDisponibilidadeProfessor } from "./interfaces/DisponibilidadeProfessor.interface";
import { IProfessor } from "./interfaces/Professor.interface";

export class DisponibilidadeProfessor implements IDisponibilidadeProfessor
{
    private _id: string;
    private _diaDaSemana: string;
    private _turno: string;
    private _professor: IProfessor;
    public static disponibilidadeProfessorList: IDisponibilidadeProfessor[];
    

    constructor(diaDaSemana: string, turno: string, professor: IProfessor, id?: string)
    {
        this._id = id;
        this._diaDaSemana = diaDaSemana;
        this._turno = turno;
        this._professor = professor;
    }

    public getId(): string
    {
        return this._id;
    }
    
    public setId(id: string): void
    {
        this._id = id;
    }
    
    public getDiaDaSemana(): string
    {
        return this._diaDaSemana;
    }
    
    public setDiaDaSemana(diaDaSemana: string): void
    {
        this._diaDaSemana = diaDaSemana;
    }
    
    public getTurno(): string
    {
        return this._turno;
    }
    
    public setTurno(turno: string): void
    {
        this._turno = turno;
    }
    
    public getProfessor(): IProfessor
    {
        return this._professor;
    }
    
    public setProfessor(professor: IProfessor): void
    {
        this._professor = professor;
    }
}