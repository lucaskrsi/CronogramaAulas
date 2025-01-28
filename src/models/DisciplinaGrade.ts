import { IDisciplina } from "./interfaces/Disciplina.interface";
import { IDisciplinaGrade } from "./interfaces/DisciplinaGrade.interface";
import { IGradeCurricular } from "./interfaces/GradeCurricular.interface";

export class DisciplinaGrade implements IDisciplinaGrade
{
    private _id: string;
    private _disciplina: IDisciplina;
    private _gradeCurricular: IGradeCurricular;
    private _cargaHoraria: number;
    public static disciplinaGradeList: IDisciplinaGrade[];

    constructor(cargaHoraria: number, disciplina: IDisciplina, gradeCurricular: IGradeCurricular, id?: string)
    {
        this._id = id;
        this._disciplina = disciplina;
        this._gradeCurricular = gradeCurricular;
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
    
    public getDisciplina(): IDisciplina
    {
        return this._disciplina;
    }
    
    public setDisciplina(disciplina: IDisciplina): void
    {
        this._disciplina = disciplina;
    }
    
    public getGradeCurricular(): IGradeCurricular
    {
        return this._gradeCurricular;
    }

    public setGradeCurricular(grade: IGradeCurricular): void
    {
        this._gradeCurricular = grade;
    }

}