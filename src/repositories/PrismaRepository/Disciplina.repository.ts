import { prisma } from "../../database/config/client";
import { HttpException } from "../../exceptions/HttpException";
import { IDisciplinaRepository } from "../interfaces/Disciplina.repository.interface";
import { IDisciplina } from "../../models/interfaces/Disciplina.interface";
import { Disciplina } from "../../models/Disciplina";

export class DisciplinaRepository implements IDisciplinaRepository {

    async create(disciplina: IDisciplina): Promise < IDisciplina > {

            let disciplinaPrisma = await prisma.disciplina.create({
                data: {
                    nome: disciplina.getNome(),
                },
            })

        disciplina.setId(disciplinaPrisma.id);
            return disciplina;
        }

    async get(id: string): Promise < IDisciplina > {
            const disciplinaPrisma = await prisma.disciplina.findUnique({
                where: {
                    id: id,
                },
            })

        if(!disciplinaPrisma) {
                throw HttpException.NotFoundError("Disciplina não encontrada");
            }

        const disciplina = new Disciplina(
                disciplinaPrisma.nome,
                disciplinaPrisma.id
            );

            return disciplina;
        }

    async getAll(): Promise < IDisciplina[] > {
            const disciplinaPrisma = await prisma.disciplina.findMany();
            Disciplina.disciplinaList = disciplinaPrisma.map((disciplina) => {
                return new Disciplina(
                    disciplina.nome,
                    disciplina.id
                );
            });

            return Disciplina.disciplinaList;
        }

    async update(id: string, nome ?: string): Promise < IDisciplina > {
            let disciplinaPrisma = await this.get(id);

            if(!disciplinaPrisma) {
                throw HttpException.NotFoundError("Disciplina não encontrada");
            }

        let disciplina = await prisma.disciplina.update({
                where: {
                    id: disciplinaPrisma.getId(),
                },
                data: {
                    nome: (typeof nome == "string") ? nome : disciplinaPrisma.getNome(),
                }
            })

        disciplinaPrisma.setNome(disciplina.nome);
            return disciplinaPrisma;
        }

    async delete (id: string): Promise<string>{
            let disciplinaPrisma = await this.get(id);

            if(!disciplinaPrisma) {
                throw HttpException.NotFoundError("Disciplina não encontrada");
            }

        let disciplina = await prisma.disciplina.delete({
                where: {
                    id: disciplinaPrisma.getId(),
                }
            })

        return disciplina.id.toString();
        }

    }