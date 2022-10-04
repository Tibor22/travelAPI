/*
  Warnings:

  - You are about to drop the column `countriesId` on the `Flights` table. All the data in the column will be lost.
  - You are about to drop the `Countries` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[destinationsId]` on the table `Flights` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `destinationsId` to the `Flights` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Countries" DROP CONSTRAINT "Countries_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Flights" DROP CONSTRAINT "Flights_countriesId_fkey";

-- DropIndex
DROP INDEX "Flights_countriesId_key";

-- AlterTable
ALTER TABLE "Flights" DROP COLUMN "countriesId",
ADD COLUMN     "destinationsId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Countries";

-- CreateTable
CREATE TABLE "Destinations" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "capitolIATA" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "Destinations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Destinations_countryId_key" ON "Destinations"("countryId");

-- CreateIndex
CREATE UNIQUE INDEX "Flights_destinationsId_key" ON "Flights"("destinationsId");

-- AddForeignKey
ALTER TABLE "Destinations" ADD CONSTRAINT "Destinations_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flights" ADD CONSTRAINT "Flights_destinationsId_fkey" FOREIGN KEY ("destinationsId") REFERENCES "Destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
