-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "acronym" VARCHAR(10) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "workload" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subject.acronym_unique" ON "Subject"("acronym");
