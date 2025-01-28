import { IDisciplina } from "./interfaces/Disciplina.interface";
import { IDisciplinaProfessor } from "./interfaces/DisciplinaProfessor.interface";
import { IProfessor } from "./interfaces/Professor.interface";

export class DisciplinaProfessor implements IDisciplinaProfessor
{
    private _id: string;
    private _disciplina: IDisciplina;
    private _professor: IProfessor;
    public static disciplinaProfessorList: IDisciplinaProfessor[];

    constructor(disciplina: IDisciplina, professor: IProfessor, id?: string)
    {
        this._id = id;
        this._disciplina = disciplina;
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
    
    public getDisciplina(): IDisciplina
    {
        return this._disciplina;
    }
    
    public setDisciplina(disciplina: IDisciplina): void
    {
        this._disciplina = disciplina;
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