/*
  Warnings:

  - Added the required column `jobRoleName` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "jobRoleName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_jobRoleName_fkey" FOREIGN KEY ("jobRoleName") REFERENCES "JobRole"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
