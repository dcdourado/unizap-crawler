/*
  Warnings:

  - Added the required column `updatedAt` to the `SubjectsOnCourses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period` to the `SubjectsOnCourses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubjectsOnCourses" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "period" INTEGER NOT NULL;
