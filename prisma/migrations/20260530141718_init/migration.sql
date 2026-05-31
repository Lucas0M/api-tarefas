-- CreateTable
CREATE TABLE "Tarefa" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "feito" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);
