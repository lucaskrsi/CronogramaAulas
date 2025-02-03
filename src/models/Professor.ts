import { IProfessor } from "./interfaces/Professor.interface";

export class Professor implements IProfessor
{
    private _id: string;
    private _cargaHoraria: number;
    private _nome: string;
    private _matricula: number
    public static professorList: IProfessor[];

    constructor(cargaHoraria: number, nome: string, matricula: number, id?: string)
    {
        this._id = id;
        this._cargaHoraria = cargaHoraria;
        this._nome = nome;
        this._matricula = matricula;
    }

    public getId(): string
    {
        return this._id;
    }

    public setId(id: string): void
    {
        this._id = id;
    }

    public getCargaHoraria(): number
    {
        return this._cargaHoraria;
    }

    public setCargaHoraria(cargaHoraria: number): void
    {
        this._cargaHoraria = cargaHoraria;
    }
    
    public getNome(): string
    {
        return this._nome;
    }
    
    public setNome(nome: string): void
    {
        this._nome = nome;
    }
    
    public getMatricula(): number
    {
        return this._matricula;
    }
    
    public setMatricula(matricula: number): void
    {
        this._matricula = matricula;
    }
}