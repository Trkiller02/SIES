/*
  Warnings:

  - The primary key for the `relation_tables` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `third_person` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `relation_tables` DROP FOREIGN KEY `relation_tables_thirdPersonCiNumbers_fkey`;

-- DropForeignKey
ALTER TABLE `third_person` DROP FOREIGN KEY `third_person_thirdPersonCiNumber_fkey`;

-- AlterTable
ALTER TABLE `persons` ADD COLUMN `relation` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `relation_tables` DROP PRIMARY KEY,
    ADD COLUMN `fatherPersonCiNumbers` VARCHAR(191) NULL,
    ADD COLUMN `motherPersonCiNumbers` VARCHAR(191) NULL,
    MODIFY `idRelation` VARCHAR(191) NOT NULL,
    MODIFY `thirdPersonCiNumbers` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`idRelation`);

-- DropTable
DROP TABLE `third_person`;

-- AddForeignKey
ALTER TABLE `relation_tables` ADD CONSTRAINT `relation_tables_motherPersonCiNumbers_fkey` FOREIGN KEY (`motherPersonCiNumbers`) REFERENCES `persons`(`ciNumber`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relation_tables` ADD CONSTRAINT `relation_tables_fatherPersonCiNumbers_fkey` FOREIGN KEY (`fatherPersonCiNumbers`) REFERENCES `persons`(`ciNumber`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relation_tables` ADD CONSTRAINT `relation_tables_thirdPersonCiNumbers_fkey` FOREIGN KEY (`thirdPersonCiNumbers`) REFERENCES `persons`(`ciNumber`) ON DELETE SET NULL ON UPDATE CASCADE;
