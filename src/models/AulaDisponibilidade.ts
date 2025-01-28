import { IAula } from "./interfaces/Aula.interface";
import { IAulaDisponibilidade } from "./interfaces/AulaDisponibilidade.interface";
import { IDisponibilidadeProfessor } from "./interfaces/DisponibilidadeProfessor.interface";

export class AulaDisponibilidade implements IAulaDisponibilidade
{
    private _id: string;
    private _aula: IAula;
    private _disponibilidadeProfessor: IDisponibilidadeProfessor
    public static aulaDisponibilidadeList: IAulaDisponibilidade[];
    
    constructor(aula: IAula, disponibilidadeProfessor: IDisponibilidadeProfessor, id?: string)
    {
        this._id = id;
        this._aula = aula;
        this._disponibilidadeProfessor = disponibilidadeProfessor;
    }
    
    public getId(): string
    {
        return this._id;
    }
    
    public setId(id: string): void
    {
        this._id = id;
    }
    
    public getAula(): IAula
    {
        return this._aula;
    }
    
    public setAula(aula: IAula): void
    {
        this._aula = aula;
    }
    
    public getDisponibilidadeProfessor(): IDisponibilidadeProfessor
    {
        return this._disponibilidadeProfessor;
    }
    
    public setDisponibilidadeProfessor(disponibilidadeProfessor: IDisponibilidadeProfessor): void
    {
        this._disponibilidadeProfessor = disponibilidadeProfessor;
    }
}