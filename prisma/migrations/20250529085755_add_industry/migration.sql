-- CreateTable
CREATE TABLE "Industry" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Industry_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "CompanyIndustry" (
    "companyId" INTEGER NOT NULL,
    "industryName" TEXT NOT NULL,

    CONSTRAINT "CompanyIndustry_pkey" PRIMARY KEY ("companyId","industryName")
);

-- AddForeignKey
ALTER TABLE "CompanyIndustry" ADD CONSTRAINT "CompanyIndustry_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyIndustry" ADD CONSTRAINT "CompanyIndustry_industryName_fkey" FOREIGN KEY ("industryName") REFERENCES "Industry"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
