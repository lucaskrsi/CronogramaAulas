import { prisma } from "../../database/config/client";
import { HttpException } from "../../exceptions/HttpException";
import { IDisciplinaGrade } from "../../models/interfaces/DisciplinaGrade.interface";
import { DisciplinaGrade } from "../../models/DisciplinaGrade";
import { GradeCurricular } from "../../models/GradeCurricular";
import { IGradeCurricular } from "../../models/interfaces/GradeCurricular.interface";
import { Disciplina } from "../../models/Disciplina";
import { IDisciplina } from "../../models/interfaces/Disciplina.interface";
import { IDisciplinaGradeRepository } from "../../repositories/interfaces/DisciplinaGrade.repository.interface";

export class DisciplinaGradeRepository implements IDisciplinaGradeRepository {

    async create(disciplinaGrade: IDisciplinaGrade): Promise<IDisciplinaGrade> {

        let disciplinaGradePrisma = await prisma.disciplinaGrade.create({
            data: {
                cargaHoraria: disciplinaGrade.getCargaHoraria(),
                disciplinaId: disciplinaGrade.getDisciplina().getId(),
                gradeId: disciplinaGrade.getGradeCurricular().getId(),
            },
        })

        disciplinaGrade.setId(disciplinaGradePrisma.id);
        return disciplinaGrade;
    }

    async get(id: string): Promise<IDisciplinaGrade> {
        const disciplinaGradePrisma = await prisma.disciplinaGrade.findUnique({
            where: {
                id: id,
            },
            include: {
                disciplina: true,
                gradeCurricular: true,
            }
        })

        if (!disciplinaGradePrisma) {
            throw HttpException.NotFoundError("Disciplina x Grade curricular não encontrada");
        }

        const disciplinaGrade = new DisciplinaGrade(
            disciplinaGradePrisma.cargaHoraria,
            new Disciplina(
            disciplinaGradePrisma.disciplina.nome,
            disciplinaGradePrisma.disciplina.id
            ),
            new GradeCurricular(
                disciplinaGradePrisma.gradeCurricular.nome,
                disciplinaGradePrisma.gradeCurricular.id
            ),
            disciplinaGradePrisma.id
           );

        return disciplinaGrade;
    }

    public async getByGrade(grade: IGradeCurricular): Promise<IDisciplinaGrade[]> {
        const disciplinaGradePrisma = await prisma.disciplinaGrade.findMany({
            where: {
                gradeId: grade.getId(),
            },
            include: {
                disciplina: true,
                gradeCurricular: true,
            }
        });
        DisciplinaGrade.disciplinaGradeList = disciplinaGradePrisma.map((disciplinaGrade) => {
            return new DisciplinaGrade(
                disciplinaGrade.cargaHoraria,
                new Disciplina(
                disciplinaGrade.disciplina.nome,
                disciplinaGrade.disciplina.id
                ),
                new GradeCurricular(
                    disciplinaGrade.gradeCurricular.nome,
                    disciplinaGrade.gradeCurricular.id
                ),
                disciplinaGrade.id
            );
        });

        return DisciplinaGrade.disciplinaGradeList;
    }

    async getAll(): Promise<IDisciplinaGrade[]> {
        const disciplinaGradePrisma = await prisma.disciplinaGrade.findMany({
            include: {
                disciplina: true,
                gradeCurricular: true,
            }
        });
        DisciplinaGrade.disciplinaGradeList = disciplinaGradePrisma.map((disciplinaGrade) => {
            return new DisciplinaGrade(
                disciplinaGrade.cargaHoraria,
                new Disciplina(
                disciplinaGrade.disciplina.nome,
                disciplinaGrade.disciplina.id
                ),
                new GradeCurricular(
                    disciplinaGrade.gradeCurricular.nome,
                    disciplinaGrade.gradeCurricular.id
                ),
                disciplinaGrade.id
            );
        });

        return DisciplinaGrade.disciplinaGradeList;
    }

    async update(id: string, cargaHoraria?: number, disciplina?: IDisciplina, grade?: IGradeCurricular): Promise<IDisciplinaGrade> {
        let disciplinaGradePrisma = await this.get(id);

        if (!disciplinaGradePrisma) {
            throw HttpException.NotFoundError("Disciplina x Grade curricular não encontrada");
        }

        let disciplinaGrade = await prisma.disciplinaGrade.update({
            where: {
                id: disciplinaGradePrisma.getId(),
            },
            data: {
                cargaHoraria: (typeof cargaHoraria == "number") ? cargaHoraria : disciplinaGradePrisma.getCargaHoraria(),
                disciplinaId: (disciplina && typeof disciplina.getId === "string")? disciplina.getId() : disciplinaGradePrisma.getDisciplina().getId(),
                gradeId: (grade && typeof grade.getId === "string")? grade.getId() : disciplinaGradePrisma.getGradeCurricular().getId(),
            }
        })

        disciplinaGradePrisma.setCargaHoraria(disciplinaGrade.cargaHoraria);

        return disciplinaGradePrisma;
    }

    async delete(id: string): Promise<string> {
        let disciplinaGradePrisma = await this.get(id);

        if (!disciplinaGradePrisma) {
            throw HttpException.NotFoundError("Disciplina x Grade curricular não encontrada");
        }

        let disciplinaGrade = await prisma.disciplinaGrade.delete({
            where: {
                id: disciplinaGradePrisma.getId(),
            }
        })

        return disciplinaGrade.id.toString();
    }

}