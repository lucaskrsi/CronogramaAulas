import { IGradeCurricular } from "./interfaces/GradeCurricular.interface";
import { ITurma } from "./interfaces/Turma.interface";
import { ITurmaGrade } from "./interfaces/TurmaGrade.interface";

export class TurmaGrade implements ITurmaGrade
{
    private _id: string;
    private _ano: string;
    private _turma: ITurma;
    private _grade: IGradeCurricular
    public static turmaGradeList: ITurmaGrade[];

    constructor(ano: string, turma: ITurma, grade: IGradeCurricular, id?: string)
    {
        this._id = id;
        this._ano = ano;
        this._turma = turma;
        this._grade = grade;
    }
    
    public getId(): string
    {
        return this._id;
    }
    
    public setId(id: string): void
    {
        this._id = id;
    }
    
    public getAno(): string
    {
        return this._ano;
    }
    
    public setAno(ano: string): void
    {
        this._ano = ano;
    }
    
    public getTurma(): ITurma
    {
        return this._turma;
    }
    
    public setTurma(turma: ITurma): void
    {
        this._turma = turma;
    }
    
    public getGradeCurricular(): IGradeCurricular
    {
        return this._grade;
    }
    
    public setGradeCurricular(grade: IGradeCurricular): void
    {
        this._grade = grade;
    }
}