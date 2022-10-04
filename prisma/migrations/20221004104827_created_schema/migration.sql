-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "capitolIATA" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Countries" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "capitolIATA" VARCHAR(255) NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "Countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flights" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "airlines" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "countriesId" INTEGER NOT NULL,

    CONSTRAINT "Flights_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_capitolIATA_key" ON "Country"("capitolIATA");

-- CreateIndex
CREATE UNIQUE INDEX "Countries_countryId_key" ON "Countries"("countryId");

-- CreateIndex
CREATE UNIQUE INDEX "Flights_countriesId_key" ON "Flights"("countriesId");

-- AddForeignKey
ALTER TABLE "Countries" ADD CONSTRAINT "Countries_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flights" ADD CONSTRAINT "Flights_countriesId_fkey" FOREIGN KEY ("countriesId") REFERENCES "Countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
