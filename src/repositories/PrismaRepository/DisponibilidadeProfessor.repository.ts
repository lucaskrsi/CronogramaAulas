import { prisma } from "../../database/config/client";
import { HttpException } from "../../exceptions/HttpException";
import { IDisponibilidadeProfessor } from "../../models/interfaces/DisponibilidadeProfessor.interface";
import { DisponibilidadeProfessor } from "../../models/DisponibilidadeProfessor";
import { IProfessor } from "../../models/interfaces/Professor.interface";
import { IDisponibilidadeProfessorRepository } from "../../repositories/interfaces/DisponibilidadeProfessor.interface";
import { Professor } from "../../models/Professor";

export class DisponibilidadeProfessorRepository implements IDisponibilidadeProfessorRepository {

    async create(disponibilidadeProfessor: IDisponibilidadeProfessor): Promise<IDisponibilidadeProfessor> {

        let disponibilidadeProfessorPrisma = await prisma.disponibilidadeProfessor.create({
            data: {
                diaDaSemana: disponibilidadeProfessor.getDiaDaSemana(),
                inicioHora: disponibilidadeProfessor.getInicioHora(),
                fimHora: disponibilidadeProfessor.getFimHora(),
                professorId: disponibilidadeProfessor.getProfessor().getId()
            },
        })

        disponibilidadeProfessor.setId(disponibilidadeProfessorPrisma.id);
        return disponibilidadeProfessor;
    }

    async get(id: string): Promise<IDisponibilidadeProfessor> {
        const disponibilidadeProfessorPrisma = await prisma.disponibilidadeProfessor.findUnique({
            where: {
                id: id,
            },
            include: {
                professor: true,
            }
        })

        if (!disponibilidadeProfessorPrisma) {
            throw HttpException.NotFoundError("Disponibilidade x Professor não encontrada");
        }

        const disponibilidadeProfessor = new DisponibilidadeProfessor(
            disponibilidadeProfessorPrisma.diaDaSemana,
            disponibilidadeProfessorPrisma.inicioHora,
            disponibilidadeProfessorPrisma.fimHora,
            new Professor(
                disponibilidadeProfessorPrisma.professor.cargaHoraria,
                disponibilidadeProfessorPrisma.professor.nome,
                disponibilidadeProfessorPrisma.professor.matricula,
                disponibilidadeProfessorPrisma.professor.id
            ),
            disponibilidadeProfessorPrisma.id,
        );

        return disponibilidadeProfessor;
    }

    async getAll(): Promise<IDisponibilidadeProfessor[]> {
        const disponibilidadeProfessorPrisma = await prisma.disponibilidadeProfessor.findMany({
            include: {
                professor: true,
            }
        });
        DisponibilidadeProfessor.disponibilidadeProfessorList = disponibilidadeProfessorPrisma.map((disponibilidadeProfessor) => {
            return new DisponibilidadeProfessor(
                disponibilidadeProfessor.diaDaSemana,
            disponibilidadeProfessor.inicioHora,
            disponibilidadeProfessor.fimHora,
            new Professor(
                disponibilidadeProfessor.professor.cargaHoraria,
                disponibilidadeProfessor.professor.nome,
                disponibilidadeProfessor.professor.matricula,
                disponibilidadeProfessor.professor.id
            ),
            disponibilidadeProfessor.id,
            );
        });

        return DisponibilidadeProfessor.disponibilidadeProfessorList;
    }

    async update(id: string, diaDaSemana?: string, inicioHora?: string, fimHora?: string, professor?: IProfessor): Promise<IDisponibilidadeProfessor> {
        let disponibilidadeProfessorPrisma = await this.get(id);

        if (!disponibilidadeProfessorPrisma) {
            throw HttpException.NotFoundError("Disponibilidade x Professor não encontrada");
        }

        let disponibilidadeProfessor = await prisma.disponibilidadeProfessor.update({
            where: {
                id: disponibilidadeProfessorPrisma.getId(),
            },
            data: {
                diaDaSemana: (typeof diaDaSemana == "string") ? diaDaSemana : disponibilidadeProfessorPrisma.getDiaDaSemana(),
                inicioHora: (typeof inicioHora == "string") ? inicioHora : disponibilidadeProfessorPrisma.getInicioHora(),
                fimHora: (typeof fimHora == "string") ? fimHora : disponibilidadeProfessorPrisma.getFimHora(),
                professorId: (typeof professor == "string") ? professor : disponibilidadeProfessorPrisma.getProfessor().getId(),
            }
        })

        disponibilidadeProfessorPrisma.setDiaDaSemana(disponibilidadeProfessor.diaDaSemana);
        disponibilidadeProfessorPrisma.setInicioHora(disponibilidadeProfessor.inicioHora);
        disponibilidadeProfessorPrisma.setFimHora(disponibilidadeProfessor.fimHora);
        return disponibilidadeProfessorPrisma;
    }

    async delete(id: string): Promise<string> {
        let disponibilidadeProfessorPrisma = await this.get(id);

        if (!disponibilidadeProfessorPrisma) {
            throw HttpException.NotFoundError("Disponibilidade x Professor não encontrada");
        }

        let disponibilidadeProfessor = await prisma.disponibilidadeProfessor.delete({
            where: {
                id: disponibilidadeProfessorPrisma.getId(),
            }
        })

        return disponibilidadeProfessor.id.toString();
    }

}