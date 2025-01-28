import { IProfessor } from "./interfaces/Professor.interface";

export class Professor implements IProfessor
{
    private _id: string;
    private _cargaHoraria: number;
    public static professorList: IProfessor[];

    constructor(cargaHoraria: number, id?: string)
    {
        this._id = id;
        this._cargaHoraria = cargaHoraria;
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
}