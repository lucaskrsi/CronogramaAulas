import { prisma } from "../../database/config/client";
import { HttpException } from "../../exceptions/HttpException";
import { IAulaDisponibilidade } from "../../models/interfaces/AulaDisponibilidade.interface";
import { AulaDisponibilidade } from "../../models/AulaDisponibilidade";
import { DisponibilidadeProfessor } from "../../models/DisponibilidadeProfessor";
import { Aula } from "../../models/Aula";
import { Disciplina } from "../../models/Disciplina";
import { Turma } from "../../models/Turma";
import { Professor } from "../../models/Professor";
import { IAula } from "../../models/interfaces/Aula.interface";
import { IDisponibilidadeProfessor } from "../../models/interfaces/DisponibilidadeProfessor.interface";
import { IAulaDisponibilidadeRepository } from "../../repositories/interfaces/AulaDisponibilidade.repository.interface";

export class AulaDisponibilidadeRepository implements IAulaDisponibilidadeRepository {

    async create(aulaDisponibilidade: IAulaDisponibilidade): Promise<IAulaDisponibilidade> {

        let aulaDisponibilidadePrisma = await prisma.aulaDisponibilidade.create({
            data: {
                aulaId: aulaDisponibilidade.getAula().getId(),
                disponibilidadeProfessorId: aulaDisponibilidade.getDisponibilidadeProfessor().getId(),
            },
        })

        aulaDisponibilidade.setId(aulaDisponibilidadePrisma.id);
        return aulaDisponibilidade;
    }

    async get(id: string): Promise<IAulaDisponibilidade> {
        const aulaDisponibilidadePrisma = await prisma.aulaDisponibilidade.findUnique({
            where: {
                id: id,
            },
            include: {
                aula: {
                    include: {
                        disciplina: true,
                        turma: true,
                    },
                },
                disponibilidadeProfessor: {
                    include: {
                        professor: true,
                    },
                },
            }
        })

        if (!aulaDisponibilidadePrisma) {
            throw HttpException.NotFoundError("Aula x Disponibilidade do Professor não encontrada");
        }

        const aulaDisponibilidade = new AulaDisponibilidade(
            new Aula(
                aulaDisponibilidadePrisma.aula.inicioHora.toString(),
                aulaDisponibilidadePrisma.aula.fimHora.toString(),
                aulaDisponibilidadePrisma.aula.diaDaSemana,
                new Disciplina(
                    aulaDisponibilidadePrisma.aula.disciplina.nome,
                    aulaDisponibilidadePrisma.aula.disciplina.id
                ),
                new Turma(
                    aulaDisponibilidadePrisma.aula.turma.nome,
                    aulaDisponibilidadePrisma.aula.turma.id
                ),
            ),
            new DisponibilidadeProfessor(
                aulaDisponibilidadePrisma.disponibilidadeProfessor.diaDaSemana,
                aulaDisponibilidadePrisma.disponibilidadeProfessor.turno,
                new Professor(
                    aulaDisponibilidadePrisma.disponibilidadeProfessor.professor.cargaHoraria,
                    aulaDisponibilidadePrisma.disponibilidadeProfessor.professor.id
                ),
            ),
            aulaDisponibilidadePrisma.id
        );

        return aulaDisponibilidade;
    }

    async getAll(): Promise<IAulaDisponibilidade[]> {
        const aulaDisponibilidadePrisma = await prisma.aulaDisponibilidade.findMany({
            include: {
                aula: {
                    include: {
                        disciplina: true,
                        turma: true,
                    },
                },
                disponibilidadeProfessor: {
                    include: {
                        professor: true,
                    },
                },
            }
        });
        AulaDisponibilidade.aulaDisponibilidadeList = aulaDisponibilidadePrisma.map((aulaDisponibilidade) => {
            return new AulaDisponibilidade(
                new Aula(
                    aulaDisponibilidade.aula.inicioHora.toString(),
                    aulaDisponibilidade.aula.fimHora.toString(),
                    aulaDisponibilidade.aula.diaDaSemana,
                    new Disciplina(
                        aulaDisponibilidade.aula.disciplina.nome,
                        aulaDisponibilidade.aula.disciplina.id
                    ),
                    new Turma(
                        aulaDisponibilidade.aula.turma.nome,
                        aulaDisponibilidade.aula.turma.id
                    ),
                ),
                new DisponibilidadeProfessor(
                    aulaDisponibilidade.disponibilidadeProfessor.diaDaSemana,
                    aulaDisponibilidade.disponibilidadeProfessor.turno,
                    new Professor(
                        aulaDisponibilidade.disponibilidadeProfessor.professor.cargaHoraria,
                        aulaDisponibilidade.disponibilidadeProfessor.professor.id
                    ),
                ),
                aulaDisponibilidade.id
            );
        });

        return AulaDisponibilidade.aulaDisponibilidadeList;
    }

    async update(id: string, aula?: IAula, disponibilidadeProfessor?: IDisponibilidadeProfessor): Promise<IAulaDisponibilidade> {
        let aulaDisponibilidadePrisma = await this.get(id);

        if (!aulaDisponibilidadePrisma) {
            throw HttpException.NotFoundError("Aula x Disponibilidade do Professor não encontrada");
        }

        let aulaDisponibilidade = await prisma.aulaDisponibilidade.update({
            where: {
                id: aulaDisponibilidadePrisma.getId(),
            },
            data: {
                aulaId: (aula && typeof aula.getId === "string")? aula.getId() : aulaDisponibilidadePrisma.getAula().getId(),
                disponibilidadeProfessorId: (disponibilidadeProfessor && typeof disponibilidadeProfessor.getId === "string")? disponibilidadeProfessor.getId() : aulaDisponibilidadePrisma.getDisponibilidadeProfessor().getId(),
            }
        })

        return aulaDisponibilidadePrisma;
    }

    async delete(id: string): Promise<string> {
        let aulaDisponibilidadePrisma = await this.get(id);

        if (!aulaDisponibilidadePrisma) {
            throw HttpException.NotFoundError("Aula x Disponibilidade do Professor não encontrada");
        }

        let aulaDisponibilidade = await prisma.aulaDisponibilidade.delete({
            where: {
                id: aulaDisponibilidadePrisma.getId(),
            }
        })

        return aulaDisponibilidade.id.toString();
    }

}