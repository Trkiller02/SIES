/*
  Warnings:

  - You are about to drop the column `firstLastName` on the `persons` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `persons` table. All the data in the column will be lost.
  - You are about to drop the column `secondLastName` on the `persons` table. All the data in the column will be lost.
  - You are about to drop the column `secondName` on the `persons` table. All the data in the column will be lost.
  - Added the required column `lastName` to the `persons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `persons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `persons` DROP COLUMN `firstLastName`,
    DROP COLUMN `firstName`,
    DROP COLUMN `secondLastName`,
    DROP COLUMN `secondName`,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
