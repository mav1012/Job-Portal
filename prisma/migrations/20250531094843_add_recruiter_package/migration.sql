-- CreateTable
CREATE TABLE "RecruitersPackage" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "packageId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecruitersPackage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecruitersPackage" ADD CONSTRAINT "RecruitersPackage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecruitersPackage" ADD CONSTRAINT "RecruitersPackage_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
