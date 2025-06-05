-- CreateEnum
CREATE TYPE "ApplyStatus" AS ENUM ('PENDING', 'VIEWED', 'APPROVED');

-- CreateTable
CREATE TABLE "Apply" (
    "candidateProfileId" INTEGER NOT NULL,
    "jobId" INTEGER NOT NULL,
    "applyDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ApplyStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Apply_pkey" PRIMARY KEY ("candidateProfileId","jobId")
);

-- AddForeignKey
ALTER TABLE "Apply" ADD CONSTRAINT "Apply_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "CandidateProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apply" ADD CONSTRAINT "Apply_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
