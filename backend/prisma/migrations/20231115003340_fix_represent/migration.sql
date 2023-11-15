/*
  Warnings:

  - You are about to drop the column `ageHer` on the `health_info` table. All the data in the column will be lost.
  - You are about to drop the column `asisMedica` on the `health_info` table. All the data in the column will be lost.
  - You are about to drop the column `bloodType` on the `health_info` table. All the data in the column will be lost.
  - You are about to drop the column `conditionEsp` on the `health_info` table. All the data in the column will be lost.
  - You are about to drop the column `creationGroup` on the `health_info` table. All the data in the column will be lost.
  - You are about to drop the column `enfermedades` on the `health_info` table. All the data in the column will be lost.
  - You are about to drop the column `infoMedic` on the `health_info` table. All the data in the column will be lost.
  - You are about to drop the column `levelHer` on the `health_info` table. All the data in the column will be lost.
  - You are about to drop the column `liveWith` on the `health_info` table. All the data in the column will be lost.
  - You are about to drop the column `medicEsp` on the `health_info` table. All the data in the column will be lost.
  - You are about to drop the column `operation` on the `health_info` table. All the data in the column will be lost.
  - You are about to drop the column `poseeHer` on the `health_info` table. All the data in the column will be lost.
  - You are about to drop the column `preferComp` on the `health_info` table. All the data in the column will be lost.
  - You are about to drop the column `resOriStudent` on the `health_info` table. All the data in the column will be lost.
  - You are about to drop the column `transporte` on the `health_info` table. All the data in the column will be lost.
  - You are about to alter the column `level` on the `ins_info` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(1)`.
  - You are about to drop the column `thirdPersonCiNumbers` on the `relation_tables` table. All the data in the column will be lost.
  - You are about to drop the column `Instrution` on the `represent` table. All the data in the column will be lost.
  - You are about to drop the column `business` on the `represent` table. All the data in the column will be lost.
  - You are about to drop the column `civilStatus` on the `represent` table. All the data in the column will be lost.
  - You are about to drop the column `sourceIncome` on the `represent` table. All the data in the column will be lost.
  - You are about to drop the column `workEmail` on the `represent` table. All the data in the column will be lost.
  - You are about to drop the column `bornMunicipio` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `bornParroquia` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `bornPlace` on the `students` table. All the data in the column will be lost.
  - Added the required column `etapa` to the `ins_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turno` to the `ins_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `liveWith` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `relation_tables` DROP FOREIGN KEY `relation_tables_fatherPersonCiNumbers_fkey`;

-- DropForeignKey
ALTER TABLE `relation_tables` DROP FOREIGN KEY `relation_tables_motherPersonCiNumbers_fkey`;

-- DropForeignKey
ALTER TABLE `relation_tables` DROP FOREIGN KEY `relation_tables_thirdPersonCiNumbers_fkey`;

-- AlterTable
ALTER TABLE `health_info` DROP COLUMN `ageHer`,
    DROP COLUMN `asisMedica`,
    DROP COLUMN `bloodType`,
    DROP COLUMN `conditionEsp`,
    DROP COLUMN `creationGroup`,
    DROP COLUMN `enfermedades`,
    DROP COLUMN `infoMedic`,
    DROP COLUMN `levelHer`,
    DROP COLUMN `liveWith`,
    DROP COLUMN `medicEsp`,
    DROP COLUMN `operation`,
    DROP COLUMN `poseeHer`,
    DROP COLUMN `preferComp`,
    DROP COLUMN `resOriStudent`,
    DROP COLUMN `transporte`,
    ADD COLUMN `plantProce` VARCHAR(191) NULL,
    ADD COLUMN `proLevel` VARCHAR(191) NULL,
    ADD COLUMN `siteAct` VARCHAR(191) NULL,
    ADD COLUMN `trataEsp` TEXT NULL,
    MODIFY `preferAct` TEXT NULL,
    MODIFY `recreTime` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ins_info` ADD COLUMN `etapa` CHAR(1) NOT NULL,
    ADD COLUMN `turno` CHAR(1) NOT NULL,
    MODIFY `level` CHAR(1) NOT NULL;

-- AlterTable
ALTER TABLE `relation_tables` DROP COLUMN `thirdPersonCiNumbers`;

-- AlterTable
ALTER TABLE `represent` DROP COLUMN `Instrution`,
    DROP COLUMN `business`,
    DROP COLUMN `civilStatus`,
    DROP COLUMN `sourceIncome`,
    DROP COLUMN `workEmail`,
    ADD COLUMN `tlfnHome` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `students` DROP COLUMN `bornMunicipio`,
    DROP COLUMN `bornParroquia`,
    DROP COLUMN `bornPlace`,
    ADD COLUMN `liveWith` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `relation_tables` ADD CONSTRAINT `relation_tables_motherPersonCiNumbers_fkey` FOREIGN KEY (`motherPersonCiNumbers`) REFERENCES `represent`(`representCiNumber`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `relation_tables` ADD CONSTRAINT `relation_tables_fatherPersonCiNumbers_fkey` FOREIGN KEY (`fatherPersonCiNumbers`) REFERENCES `represent`(`representCiNumber`) ON DELETE RESTRICT ON UPDATE RESTRICT;
