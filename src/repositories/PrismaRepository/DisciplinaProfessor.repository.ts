import { prisma } from "../../database/config/client";
import { HttpException } from "../../exceptions/HttpException";
import { IDisciplinaProfessorRepository } from "../interfaces/DisciplinaProfessor.repository.interface";
import { IDisciplinaProfessor } from "../../models/interfaces/DisciplinaProfessor.interface";
import { DisciplinaProfessor } from "../../models/DisciplinaProfessor";
import { IDisciplina } from "../../models/interfaces/Disciplina.interface";
import { IProfessor } from "../../models/interfaces/Professor.interface";
import { Professor } from "../../models/Professor";
import { Disciplina } from "../../models/Disciplina";

export class DisciplinaProfessorRepository implements IDisciplinaProfessorRepository {

    async create(disciplinaProfessor: IDisciplinaProfessor): Promise<IDisciplinaProfessor> {

        let disciplinaProfessorPrisma = await prisma.disciplinaProfessor.create({
            data: {
                disciplinaId: disciplinaProfessor.getDisciplina().getId(),
                professorId: disciplinaProfessor.getProfessor().getId()
            },
        })

        disciplinaProfessor.setId(disciplinaProfessorPrisma.id);
        return disciplinaProfessor;
    }

    async get(id: string, canPass: boolean): Promise<IDisciplinaProfessor> {
        const disciplinaProfessorPrisma = await prisma.disciplinaProfessor.findFirst({
            where: {
                id: id,
            },
            include: {
                disciplina: true,
                professor: true,
            }
        })

        if (!disciplinaProfessorPrisma) {
            if (canPass) {
                return null;
            }
            throw HttpException.NotFoundError("Disciplina x Professor não encontrada");
        }

        const disciplinaProfessor = new DisciplinaProfessor(
            new Disciplina(
                disciplinaProfessorPrisma.disciplina.nome,
                disciplinaProfessorPrisma.disciplina.id,
            ),
            new Professor(
                disciplinaProfessorPrisma.professor.cargaHoraria,
                disciplinaProfessorPrisma.professor.nome,
                disciplinaProfessorPrisma.professor.matricula,
                disciplinaProfessorPrisma.professor.id,
            ),
            disciplinaProfessorPrisma.id,
        );

        return disciplinaProfessor;
    }

    async getAll(): Promise<IDisciplinaProfessor[]> {
        const disciplinaProfessorPrisma = await prisma.disciplinaProfessor.findMany({
            include: {
                disciplina: true,
                professor: true,
            }
        });
        DisciplinaProfessor.disciplinaProfessorList = disciplinaProfessorPrisma.map((disciplinaProfessor) => {
            return new DisciplinaProfessor(
                new Disciplina(
                    disciplinaProfessor.disciplina.nome,
                    disciplinaProfessor.disciplina.id,
                ),
                new Professor(
                    disciplinaProfessor.professor.cargaHoraria,
                    disciplinaProfessor.professor.nome,
                    disciplinaProfessor.professor.matricula,
                    disciplinaProfessor.professor.id,
                ),
                disciplinaProfessor.id,
            );
        });

        return DisciplinaProfessor.disciplinaProfessorList;
    }

    async update(id: string, disciplina?: IDisciplina, professor?: IProfessor): Promise<IDisciplinaProfessor> {
        let disciplinaProfessorPrisma = await this.get(id, true);

        if (!disciplinaProfessorPrisma) {
            //throw HttpException.NotFoundError("Disciplina x Professor não encontrada");
            return await this.create(new DisciplinaProfessor(disciplina, professor));
        }

        let disciplinaProfessor = await prisma.disciplinaProfessor.update({
            where: {
                id: disciplinaProfessorPrisma.getId(),
            },
            data: {
                disciplinaId: (disciplina && typeof disciplina.getId === "string") ? disciplina.getId() : disciplinaProfessorPrisma.getDisciplina().getId(),
                professorId: (professor && typeof professor.getId === "string") ? professor.getId() : disciplinaProfessorPrisma.getProfessor().getId(),
            }
        })

        return disciplinaProfessorPrisma;
    }

    async delete(id: string): Promise<string> {
        let disciplinaProfessorPrisma = await this.get(id, false);

        if (!disciplinaProfessorPrisma) {
            throw HttpException.NotFoundError("Disciplina x Professor não encontrada");
        }

        let disciplinaProfessor = await prisma.disciplinaProfessor.delete({
            where: {
                id: disciplinaProfessorPrisma.getId(),
            }
        })

        return disciplinaProfessor.id.toString();
    }

}