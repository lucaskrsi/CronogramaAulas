import { IUsuario } from "../../models/interfaces/User.interface"

export interface IUsuarioRepository{
    get(id: string): Promise<IUsuario>
    getByEmail(email: string): Promise<IUsuario>
    getAll(): Promise<IUsuario[]>
    create(user: IUsuario): Promise<IUsuario>
    update(id: string, nome?: string, email?: string, senha?: string): Promise<IUsuario>
    delete(id: string): Promise<string>
    executeAuthentication(email: string, senha: string)
}