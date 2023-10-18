/*
  Warnings:

  - The primary key for the `health_info` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `represent` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `represent` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `students` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `relation_tables` DROP FOREIGN KEY `relation_tables_fatherPersonCiNumbers_fkey`;

-- DropForeignKey
ALTER TABLE `relation_tables` DROP FOREIGN KEY `relation_tables_fichaId_fkey`;

-- DropForeignKey
ALTER TABLE `relation_tables` DROP FOREIGN KEY `relation_tables_motherPersonCiNumbers_fkey`;

-- DropForeignKey
ALTER TABLE `relation_tables` DROP FOREIGN KEY `relation_tables_representCiNumbers_fkey`;

-- DropForeignKey
ALTER TABLE `relation_tables` DROP FOREIGN KEY `relation_tables_statusId_fkey`;

-- DropForeignKey
ALTER TABLE `relation_tables` DROP FOREIGN KEY `relation_tables_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `relation_tables` DROP FOREIGN KEY `relation_tables_thirdPersonCiNumbers_fkey`;

-- AlterTable
ALTER TABLE `health_info` DROP PRIMARY KEY,
    MODIFY `idStatus` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idStatus`);

-- AlterTable
ALTER TABLE `ins_info` MODIFY `personalRes` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `relation_tables` ADD COLUMN `deleteAt` DATETIME(3) NULL,
    MODIFY `statusId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `represent` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `students` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AddForeignKey
ALTER TABLE `relation_tables` ADD CONSTRAINT `relation_tables_representCiNumbers_fkey` FOREIGN KEY (`representCiNumbers`) REFERENCES `represent`(`representCiNumber`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `relation_tables` ADD CONSTRAINT `relation_tables_fichaId_fkey` FOREIGN KEY (`fichaId`) REFERENCES `ins_info`(`idFicha`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `relation_tables` ADD CONSTRAINT `relation_tables_motherPersonCiNumbers_fkey` FOREIGN KEY (`motherPersonCiNumbers`) REFERENCES `persons`(`ciNumber`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `relation_tables` ADD CONSTRAINT `relation_tables_fatherPersonCiNumbers_fkey` FOREIGN KEY (`fatherPersonCiNumbers`) REFERENCES `persons`(`ciNumber`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `relation_tables` ADD CONSTRAINT `relation_tables_thirdPersonCiNumbers_fkey` FOREIGN KEY (`thirdPersonCiNumbers`) REFERENCES `persons`(`ciNumber`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `relation_tables` ADD CONSTRAINT `relation_tables_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `health_info`(`idStatus`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `relation_tables` ADD CONSTRAINT `relation_tables_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`studentCiNumber`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ins_info` ADD CONSTRAINT `ins_info_personalRes_fkey` FOREIGN KEY (`personalRes`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
