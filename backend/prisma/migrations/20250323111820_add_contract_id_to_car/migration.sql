/*
  Warnings:

  - You are about to drop the column `contract` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `contract_dur` on the `Contract` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contract_id]` on the table `Car` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contract_number]` on the table `Contract` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[car_id]` on the table `Contract` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `company_name` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contract_exp` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contract_number` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_name` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `license_plate` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "contract_id" TEXT;

-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "contract",
DROP COLUMN "contract_dur",
ADD COLUMN     "company_name" TEXT NOT NULL,
ADD COLUMN     "contract_exp" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "contract_number" TEXT NOT NULL,
ADD COLUMN     "customer_name" TEXT NOT NULL,
ADD COLUMN     "license_plate" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Car_contract_id_key" ON "Car"("contract_id");

-- CreateIndex
CREATE UNIQUE INDEX "Contract_contract_number_key" ON "Contract"("contract_number");

-- CreateIndex
CREATE UNIQUE INDEX "Contract_car_id_key" ON "Contract"("car_id");
