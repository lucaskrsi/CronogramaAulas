import { validate as validateUuid } from "uuid";
import { IUsuario } from "./interfaces/User.interface";

export class Usuario implements IUsuario {

    private _id?: string;
    private _nome: string
    private _email: string
    private _senha: string
    public static usuarioList: IUsuario[];


    public constructor(nome: string, email: string, senha: string, id?: string) {
        if (typeof id !== "undefined") {
            validateUuid(id);
        }
        this._id = id;
        this._nome = nome;
        this._email = email;
        this._senha = senha;
    }

    public setId(id: string) {
        validateUuid(id);
        this._id = id;
    }

    public getId(): string | undefined {
        return this._id;
    }

    public setNome(nome: string) {
        this._nome = nome;
    }

    public getNome(): string {
        return this._nome;
    }

    public setEmail(email: string) {
        this._email = email;
    }

    public getEmail(): string {
        return this._email;
    }

    public setSenha(senha: string) {
        this._senha = senha;
    }

    public getSenha(): string {
        return this._senha;
    }
}