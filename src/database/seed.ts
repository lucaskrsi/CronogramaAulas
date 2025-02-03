import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const disciplinasIniciais = [
  { nome: "Matemática" },
  { nome: "Português" },
  { nome: "Inglês" },
  { nome: "Espanhol" },
  { nome: "Geografia" },
  { nome: "História" },
  { nome: "Física" },
  { nome: "Química" },
  { nome: "Biologia" },
  { nome: "Artes" },
  { nome: "Educação Física" },
  { nome: "Ciências" },
  { nome: "Sociologia" },
  { nome: "Filosofia" },
  { nome: "Literatura" },
  { nome: "Música" },
  { nome: "Economia" },
]

async function seed() {
  for (const disciplinaInicial of disciplinasIniciais) {
    const disciplinaPrisma = await prisma.disciplina.findUnique({
      where: {
        nome: disciplinaInicial.nome,
      },
    });

    if (!disciplinaPrisma) {
      await prisma.disciplina.create({
        data: disciplinaInicial,
      });
    }
  }
}

seed()
  .then(() => console.log('Seed executada com sucesso!'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });