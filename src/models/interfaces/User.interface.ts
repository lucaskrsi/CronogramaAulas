export interface IUsuario{
    getId(): string | undefined
    setId(id: string): void
    getNome(): string
    setNome(nome: string): void
    getEmail(): string
    setEmail(email: string): void
    getSenha(): string
    setSenha(senha: string): void
}
