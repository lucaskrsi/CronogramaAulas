import { prisma } from "../../database/config/client";
import { HttpException } from "../../exceptions/HttpException";
import { ITurmaRepository } from "../interfaces/Turma.repository.interface";
import { ITurma } from "../../models/interfaces/Turma.interface";
import { Turma } from "../../models/Turma";

export class TurmaRepository implements ITurmaRepository {

    async create(turma: ITurma): Promise < ITurma > {

            let turmaPrisma = await prisma.turma.create({
                data: {
                    nome: turma.getNome(),
                },
            })

        turma.setId(turmaPrisma.id);
            return turma;
        }

    async get(id: string): Promise < ITurma > {
            const turmaPrisma = await prisma.turma.findUnique({
                where: {
                    id: id,
                },
            })

        if(!turmaPrisma) {
                throw HttpException.NotFoundError("Turma não encontrada");
            }

        const turma = new Turma(
                turmaPrisma.nome,
                turmaPrisma.id
            );

            return turma;
        }

    async getAll(): Promise < ITurma[] > {
            const turmaPrisma = await prisma.turma.findMany();
            Turma.turmaList = turmaPrisma.map((turma) => {
                return new Turma(
                    turma.nome,
                    turma.id
                );
            });

            return Turma.turmaList;
        }

    async update(id: string, nome ?: string): Promise < ITurma > {
            let turmaPrisma = await this.get(id);

            if(!turmaPrisma) {
                throw HttpException.NotFoundError("Turma não encontrada");
            }

        let turma = await prisma.turma.update({
                where: {
                    id: turmaPrisma.getId(),
                },
                data: {
                    nome: (typeof nome == "string") ? nome : turmaPrisma.getNome(),
                }
            })

        turmaPrisma.setNome(turma.nome);
            return turmaPrisma;
        }

    async delete (id: string): Promise<string>{
            let turmaPrisma = await this.get(id);

            if(!turmaPrisma) {
                throw HttpException.NotFoundError("Turma não encontrada");
            }

        let turma = await prisma.turma.delete({
                where: {
                    id: turmaPrisma.getId(),
                }
            })

        return turma.id.toString();
        }

    }