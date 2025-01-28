import { IAula } from "./interfaces/Aula.interface";
import { IDisciplina } from "./interfaces/Disciplina.interface";
import { ITurma } from "./interfaces/Turma.interface";

export class Aula implements IAula
{
    private _id: string;
    private _inicioHora: string
    private _fimHora: string
    private _diaDaSemana: string
    private _disciplina: IDisciplina
    private _turma: ITurma
    public static aulaList: IAula[];

    constructor(inicioHora: string, fimHora: string, diaDaSemana: string, disciplina: IDisciplina, turma: ITurma, id?: string)
    {
        this._id = id;
        this._inicioHora = inicioHora;
        this._diaDaSemana = diaDaSemana;
        this._fimHora = fimHora;
        this._disciplina = disciplina;
        this._turma = turma;
    }

    public getId(): string
    {
        return this._id;
    }
    
    public setId(id: string): void
    {
        this._id = id;
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

    public getDiaDaSemana(): string
    {
        return this._diaDaSemana;
    }
    
    public setDiaDaSemana(diaDaSemana: string): void
    {
        this._diaDaSemana = diaDaSemana;
    }
    
    public getDisciplina(): IDisciplina
    {
        return this._disciplina;
    }
    
    public setDisciplina(disciplina: IDisciplina): void
    {
        this._disciplina = disciplina;
    }
    
    public getTurma(): ITurma
    {
        return this._turma;
    }
    
    public setTurma(turma: ITurma): void
    {
        this._turma = turma;
    }
}