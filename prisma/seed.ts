import { db } from "~/server/db";
import { } from 'date-fns';

const tarefas = [
  {
    title: "Implementar novas funcionalidades na interface",
    description: "Adicionar novas funcionalidades ao frontend utilizando React, HTML e CSS.",
    status: "pendente",
    date: new Date("2024-09-08")
  },
  {
    title: "Refatorar código CSS",
    description: "Melhorar e organizar o código CSS utilizando Tailwind e Styled Components.",
    status: "pendente",
    date: new Date("2024-09-08")
  },
  {
    title: "Realizar testes de usabilidade",
    description: "Testar a interface para garantir uma boa experiência do usuário.",
    status: "concluido",
    date: new Date("2024-09-08")
  },
  {
    title: "Colaborar com o designer",
    description: "Trabalhar junto ao designer para ajustar elementos visuais e protótipos.",
    status: "pendente",
    date: new Date("2024-09-08")
  },
  {
    title: "Documentar mudanças no repositório",
    description: "Registrar as mudanças realizadas na interface no repositório de projeto.",
    status: "pendente",
    date: new Date("2024-09-08")
  },
  {
    title: "Criar e manter endpoints da API",
    description: "Desenvolver e gerenciar endpoints da API REST/tRPC para o backend.",
    status: "concluido",
    date: new Date("2024-09-08")
  },
  {
    title: "Integrar funcionalidades ao banco de dados",
    description: "Conectar novas funcionalidades com o banco de dados utilizando Prisma.",
    status: "pendente",
    date: new Date("2024-09-08")
  },
  {
    title: "Implementar segurança e autenticação",
    description: "Garantir a segurança e a autenticação dos usuários utilizando NextAuth.",
    status: "concluido",
    date: new Date("2024-09-08")
  },
  {
    title: "Realizar testes unitários e de integração",
    description: "Testar individualmente e em conjunto as funcionalidades do backend.",
    status: "concluido",
    date: new Date("2024-09-08")
  },
  {
    title: "Garantir deploy contínuo",
    description: "Manter a integração contínua e garantir o deploy regular das atualizações.",
    status: "concluido",
    date: new Date("2024-09-08")
  },
  {
    title: "Gerenciar containers Docker",
    description: "Administrar e configurar containers Docker para ambientes de desenvolvimento e produção.",
    status: "pendente",
    date: new Date("2024-09-08")
  },
  {
    title: "Automatizar processos de CI/CD",
    description: "Configurar pipelines de integração e deploy contínuos.",
    status: "pendente",
    date: new Date("2024-09-08")
  },
  {
    title: "Monitorar performance e segurança",
    description: "Acompanhar a performance e segurança dos ambientes de produção.",
    status: "pendente",
    date: new Date("2024-09-08")
  },
  {
    title: "Atualizar documentação de deploy",
    description: "Manter a documentação de processos de deploy atualizada.",
    status: "pendente",
    date: new Date("2024-09-08")
  },
  {
    title: "Acompanhar progresso da equipe",
    description: "Monitorar o progresso das tarefas e atividades dos membros da equipe.",
    status: "pendente",
    date: new Date("2024-09-08")
  },
  {
    title: "Revisar e aprovar pull requests",
    description: "Revisar o código submetido e aprovar ou sugerir melhorias nos pull requests.",
    status: "pendente",
    date: new Date("2024-09-08")
  },
  {
    title: "Manter backlog atualizado",
    description: "Atualizar e priorizar o backlog de tarefas e funcionalidades.",
    status: "pendente",
    date: new Date("2024-09-08")
  },
  {
    title: "Realizar reuniões de planejamento",
    description: "Conduzir reuniões de planejamento e retrospectiva com a equipe.",
    status: "pendente",
    date: new Date("2024-09-08")
  },
  {
    title: "Criar wireframes e protótipos",
    description: "Desenvolver wireframes e protótipos interativos para a interface do usuário.",
    status: "pendente",
    date: new Date("2024-09-08")
  },
  {
    title: "Colaborar com desenvolvedores",
    description: "Trabalhar com desenvolvedores para garantir a viabilidade técnica das propostas de design.",
    status: "pendente",
    date: new Date("2024-09-08")
  },
  {
    title: "Realizar testes de usabilidade",
    description: "Conduzir testes de usabilidade para melhorar a experiência do usuário.",
    status: "pendente",
    date: new Date("2024-09-08")
  },
  {
    title: "Documentar padrões visuais",
    description: "Registrar e manter atualizados os padrões visuais e guidelines de estilo.",
    status: "pendente",
    date: new Date("2024-09-08")
  },
  {
    title: "Responder a tickets de suporte",
    description: "Atender e solucionar tickets de suporte relacionados a bugs e falhas.",
    status: "pendente",
    date: new Date("2024-09-08")
  },
  {
    title: "Corrigir bugs reportados",
    description: "Investigar e corrigir bugs identificados pelos usuários.",
    status: "pendente",
    date: new Date("2024-09-08")
  },
  {
    title: "Atualizar documentação",
    description: "Manter a documentação técnica e de usuário atualizada.",
    status: "pendente",
    date: new Date("2024-09-08")
  }
];

const seed = async () => {
  try {
    await db.task.createMany({
      data: tarefas,
    });
    console.log("Tarefas criadas com sucesso!");
  } catch (error) {
    console.error("Erro ao criar tarefas:", error);
  }
};

seed().catch(console.log);

