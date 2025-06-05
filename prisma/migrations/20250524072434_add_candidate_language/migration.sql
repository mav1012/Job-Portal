-- CreateEnum
CREATE TYPE "Level" AS ENUM ('NATIVE', 'FLUENT', 'BASIC');

-- CreateTable
CREATE TABLE "CandidateLanguage" (
    "candidateProfileId" INTEGER NOT NULL,
    "languageName" TEXT NOT NULL,
    "level" "Level" NOT NULL DEFAULT 'BASIC'
);

-- CreateIndex
CREATE UNIQUE INDEX "CandidateLanguage_candidateProfileId_languageName_key" ON "CandidateLanguage"("candidateProfileId", "languageName");

-- AddForeignKey
ALTER TABLE "CandidateLanguage" ADD CONSTRAINT "CandidateLanguage_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "CandidateProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateLanguage" ADD CONSTRAINT "CandidateLanguage_languageName_fkey" FOREIGN KEY ("languageName") REFERENCES "Language"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
