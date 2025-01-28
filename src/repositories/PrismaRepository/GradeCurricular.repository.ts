import { prisma } from "../../database/config/client";
import { HttpException } from "../../exceptions/HttpException";
import { IGradeCurricular } from "../../models/interfaces/GradeCurricular.interface";
import { GradeCurricular } from "../../models/GradeCurricular";
import { IGradeCurricularRepository } from "../../repositories/interfaces/GradeCurricular.repository.interface";

export class GradeCurricularRepository implements IGradeCurricularRepository {

    async create(gradeCurricular: IGradeCurricular): Promise<IGradeCurricular> {

        let gradeCurricularPrisma = await prisma.gradeCurricular.create({
            data: {
                nome: gradeCurricular.getNome(),
            },
        })

        gradeCurricular.setId(gradeCurricularPrisma.id);
        return gradeCurricular;
    }

    async get(id: string): Promise<IGradeCurricular> {
        const gradeCurricularPrisma = await prisma.gradeCurricular.findUnique({
            where: {
                id: id,
            },
        })

        if (!gradeCurricularPrisma) {
            throw HttpException.NotFoundError("Grade curricular não encontrada");
        }

        const gradeCurricular = new GradeCurricular(
            gradeCurricularPrisma.nome,
            gradeCurricularPrisma.id
        );

        return gradeCurricular;
    }

    async getAll(): Promise<IGradeCurricular[]> {
        const gradeCurricularPrisma = await prisma.gradeCurricular.findMany();
        GradeCurricular.gradeCurricularList = gradeCurricularPrisma.map((gradeCurricular) => {
            return new GradeCurricular(
                gradeCurricular.nome,
                gradeCurricular.id
            );
        });

        return GradeCurricular.gradeCurricularList;
    }

    async update(id: string, nome?: string): Promise<IGradeCurricular> {
        let gradeCurricularPrisma = await this.get(id);

        if (!gradeCurricularPrisma) {
            throw HttpException.NotFoundError("Grade curricular não encontrada");
        }

        let gradeCurricular = await prisma.gradeCurricular.update({
            where: {
                id: gradeCurricularPrisma.getId(),
            },
            data: {
                nome: (typeof nome == "string") ? nome : gradeCurricularPrisma.getNome(),
            }
        })

        gradeCurricularPrisma.setNome(gradeCurricular.nome);
        return gradeCurricularPrisma;
    }

    async delete(id: string): Promise<string> {
        let gradeCurricularPrisma = await this.get(id);

        if (!gradeCurricularPrisma) {
            throw HttpException.NotFoundError("Grade curricular não encontrada");
        }

        let gradeCurricular = await prisma.gradeCurricular.delete({
            where: {
                id: gradeCurricularPrisma.getId(),
            }
        })

        return gradeCurricular.id.toString();
    }

}