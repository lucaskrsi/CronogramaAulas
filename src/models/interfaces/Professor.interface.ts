export interface IProfessor
{
    getId(): string;
    setId(id: string): void;
    getCargaHoraria(): number;
    setCargaHoraria(cargaHoraria: number): void;
}