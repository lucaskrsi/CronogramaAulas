import { UsuarioRepository } from "../PrismaRepository/Usuario.repository";

export function makeUsuarioRepository(){
    return  new UsuarioRepository();
}