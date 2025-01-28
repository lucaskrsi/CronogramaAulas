import { prisma } from "../../database/config/client";
import { HttpException } from "../../exceptions/HttpException";
import { ITurmaGrade } from "../../models/interfaces/TurmaGrade.interface";
import { TurmaGrade } from "../../models/TurmaGrade";
import { Turma } from "../../models/Turma";
import { GradeCurricular } from "../../models/GradeCurricular";
import { IGradeCurricular } from "../../models/interfaces/GradeCurricular.interface";
import { ITurma } from "../../models/interfaces/Turma.interface";
import { ITurmaGradeRepository } from "../../repositories/interfaces/TurmaGrade.repository.interface";

export class TurmaGradeRepository implements ITurmaGradeRepository {

    async create(turmaGrade: ITurmaGrade): Promise<ITurmaGrade> {

        let turmaGradePrisma = await prisma.turmaGrade.create({
            data: {
                ano: turmaGrade.getAno(),
                turmaId: turmaGrade.getTurma().getId(),
                gradeId: turmaGrade.getGradeCurricular().getId(),
            },
        })

        turmaGrade.setId(turmaGradePrisma.id);
        return turmaGrade;
    }

    async get(id: string): Promise<ITurmaGrade> {
        const turmaGradePrisma = await prisma.turmaGrade.findUnique({
            where: {
                id: id,
            },
            include: {
                turma: true,
                gradeCurricular: true,
            }
        })

        if (!turmaGradePrisma) {
            throw HttpException.NotFoundError("Turma x Grade curricular não encontrada");
        }

        const turmaGrade = new TurmaGrade(
            turmaGradePrisma.ano,
            new Turma(
            turmaGradePrisma.turma.nome,
            turmaGradePrisma.turma.id
            ),
            new GradeCurricular(
                turmaGradePrisma.gradeCurricular.nome,
                turmaGradePrisma.gradeCurricular.id
            ),
            turmaGradePrisma.id
           );

        return turmaGrade;
    }

    async getAll(): Promise<ITurmaGrade[]> {
        const turmaGradePrisma = await prisma.turmaGrade.findMany({
            include: {
                turma: true,
                gradeCurricular: true,
            }
        });
        TurmaGrade.turmaGradeList = turmaGradePrisma.map((turmaGrade) => {
            return new TurmaGrade(
                turmaGrade.ano,
                new Turma(
                turmaGrade.turma.nome,
                turmaGrade.turma.id
                ),
                new GradeCurricular(
                    turmaGrade.gradeCurricular.nome,
                    turmaGrade.gradeCurricular.id
                ),
                turmaGrade.id
            );
        });

        return TurmaGrade.turmaGradeList;
    }

    async update(id: string, ano?: string, turma?: ITurma, grade?: IGradeCurricular): Promise<ITurmaGrade> {
        let turmaGradePrisma = await this.get(id);

        if (!turmaGradePrisma) {
            throw HttpException.NotFoundError("Turma x Grade curricular não encontrada");
        }

        let turmaGrade = await prisma.turmaGrade.update({
            where: {
                id: turmaGradePrisma.getId(),
            },
            data: {
                ano: (typeof ano == "string") ? ano : turmaGradePrisma.getAno(),
                turmaId: (turma && typeof turma.getId === "string")? turma.getId() : turmaGradePrisma.getTurma().getId(),
                gradeId: (grade && typeof grade.getId === "string")? grade.getId() : turmaGradePrisma.getGradeCurricular().getId(),
            }
        });

        turmaGradePrisma.setAno(turmaGrade.ano);

        return turmaGradePrisma;
    }

    async delete(id: string): Promise<string> {
        let turmaGradePrisma = await this.get(id);

        if (!turmaGradePrisma) {
            throw HttpException.NotFoundError("Turma x Grade curricular não encontrada");
        }

        let turmaGrade = await prisma.turmaGrade.delete({
            where: {
                id: turmaGradePrisma.getId(),
            }
        })

        return turmaGrade.id.toString();
    }

}