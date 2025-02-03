export interface IProfessor
{
    getId(): string;
    setId(id: string): void;
    getCargaHoraria(): number;
    setCargaHoraria(cargaHoraria: number): void;
    getNome(): string;
    setNome(nome: string): void;
    getMatricula(): number;
    setMatricula(matricula: number): void;
}