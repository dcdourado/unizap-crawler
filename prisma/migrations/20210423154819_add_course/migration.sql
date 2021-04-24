-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "code" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "group" VARCHAR(10) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "type" VARCHAR(20) NOT NULL,

    PRIMARY KEY ("id")
);
