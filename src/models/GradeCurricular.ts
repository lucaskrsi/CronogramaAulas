import { IGradeCurricular } from "./interfaces/GradeCurricular.interface";

export class GradeCurricular implements IGradeCurricular
{
    private _id: string;
    private _nome: string;
    public static gradeCurricularList: IGradeCurricular[]

    constructor(nome: string, id?: string) 
    {
        this._id = id;
        this._nome = nome;
    }

    public getId(): string 
    {
        return this._id;
    }
    
    public setId(id: string): void 
    {
        this._id = id;
    }

    public getNome(): string
    {
        return this._nome;
    }

    public setNome(nome: string): void
    {
        this._nome = nome;
    }
}