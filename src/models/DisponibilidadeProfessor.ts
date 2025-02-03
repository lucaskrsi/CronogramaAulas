import { IAula } from "./interfaces/Aula.interface";
import { IDisponibilidadeProfessor } from "./interfaces/DisponibilidadeProfessor.interface";
import { IProfessor } from "./interfaces/Professor.interface";

export class DisponibilidadeProfessor implements IDisponibilidadeProfessor
{
    private _id: string;
    private _diaDaSemana: string;
    private _inicioHora: string;
    private _fimHora: string;
    private _professor: IProfessor;
    public static disponibilidadeProfessorList: IDisponibilidadeProfessor[];
    

    constructor(diaDaSemana: string, inicioHora: string, fimHora: string, professor: IProfessor, id?: string)
    {
        this._id = id;
        this._diaDaSemana = diaDaSemana;
        this._inicioHora = inicioHora;
        this._fimHora = fimHora;
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
    
    public getInicioHora(): string
    {
        return this._inicioHora;
    }
    
    public setInicioHora(inicioHora: string): void
    {
        this._inicioHora = inicioHora;
    }

    public getFimHora(): string
    {
        return this._fimHora;
    }

    public setFimHora(fimHora: string): void
    {
        this._fimHora = fimHora;
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