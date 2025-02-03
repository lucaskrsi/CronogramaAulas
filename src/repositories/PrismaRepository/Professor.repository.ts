import { IProfessorRepository } from "../../repositories/interfaces/Professor.repository.interface";
import { prisma } from "../../database/config/client";
import { HttpException } from "../../exceptions/HttpException";
import { IProfessor } from "../../models/interfaces/Professor.interface";
import { Professor } from "../../models/Professor";

export class ProfessorRepository implements IProfessorRepository {

    async create(professor: IProfessor): Promise < IProfessor > {

            let professorPrisma = await prisma.professor.create({
                data: {
                    cargaHoraria: professor.getCargaHoraria(),
                    nome: professor.getNome(),
                    matricula: professor.getMatricula(),
                },
            })

        professor.setId(professorPrisma.id);
            return professor;
        }

    async get(id: string): Promise < IProfessor > {
            const professorPrisma = await prisma.professor.findUnique({
                where: {
                    id: id,
                },
            })

        if(!professorPrisma) {
                throw HttpException.NotFoundError("Professor não encontrada");
            }

        const professor = new Professor(
                professorPrisma.cargaHoraria,
                professorPrisma.nome,
                professorPrisma.matricula,
                professorPrisma.id
            );

            return professor;
        }

    async getAll(): Promise < IProfessor[] > {
            const professorPrisma = await prisma.professor.findMany();
            Professor.professorList = professorPrisma.map((professor) => {
                return new Professor(
                    professor.cargaHoraria,
                    professor.nome,
                    professor.matricula,
                    professor.id
                );
            });

            return Professor.professorList;
        }

    async update(id: string, cargaHoraria ?: number, nome?: string, matricula?: number): Promise < IProfessor > {
            let professorPrisma = await this.get(id);

            if(!professorPrisma) {
                throw HttpException.NotFoundError("Professor não encontrada");
            }

        let professor = await prisma.professor.update({
                where: {
                    id: professorPrisma.getId(),
                },
                data: {
                    cargaHoraria: (typeof cargaHoraria == "number") ? cargaHoraria : professorPrisma.getCargaHoraria(),
                    nome: (nome && typeof nome === "string")? nome : professorPrisma.getNome(),
                    matricula: (typeof matricula === "number")? matricula : professorPrisma.getMatricula(),
                }
            })

        professorPrisma.setCargaHoraria(professor.cargaHoraria);
            return professorPrisma;
        }

    async delete (id: string): Promise<string>{
            let professorPrisma = await this.get(id);

            if(!professorPrisma) {
                throw HttpException.NotFoundError("Professor não encontrada");
            }

        let professor = await prisma.professor.delete({
                where: {
                    id: professorPrisma.getId(),
                }
            })

        return professor.id.toString();
        }

    }