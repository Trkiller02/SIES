-- CreateTable
CREATE TABLE `persons` (
    `ciNumber` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `secondName` VARCHAR(191) NOT NULL,
    `firstLastName` VARCHAR(191) NOT NULL,
    `secondLastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `homeDir` TEXT NULL,
    `homeParroquia` VARCHAR(191) NOT NULL,
    `homeMunicipio` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `persons_ciNumber_key`(`ciNumber`),
    PRIMARY KEY (`ciNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `studentCiNumber` VARCHAR(191) NOT NULL,
    `bornPlace` TEXT NOT NULL,
    `bornState` VARCHAR(191) NOT NULL,
    `bornMunicipio` VARCHAR(191) NOT NULL,
    `bornParroquia` VARCHAR(191) NOT NULL,
    `bornPais` VARCHAR(191) NOT NULL,
    `bornDate` DATETIME(3) NOT NULL,
    `age` INTEGER NOT NULL,
    `sex` CHAR(1) NOT NULL,
    `weight` DECIMAL(65, 30) NULL,
    `size` DECIMAL(65, 30) NULL,
    `Lateralidad` VARCHAR(191) NOT NULL,
    `instPro` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `students_studentCiNumber_key`(`studentCiNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `third_person` (
    `thirdPersonCiNumber` VARCHAR(191) NOT NULL,
    `parentesco` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `third_person_thirdPersonCiNumber_key`(`thirdPersonCiNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `represent` (
    `representCiNumber` VARCHAR(191) NOT NULL,
    `afinidad` VARCHAR(191) NOT NULL,
    `civilStatus` VARCHAR(191) NOT NULL,
    `Instrution` VARCHAR(191) NOT NULL,
    `profession` VARCHAR(191) NULL,
    `business` VARCHAR(191) NULL,
    `workPlace` TEXT NULL,
    `workPhoneNumber` VARCHAR(191) NULL,
    `workEmail` VARCHAR(191) NULL,
    `incomeMonth` DECIMAL(65, 30) NULL,
    `sourceIncome` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `represent_representCiNumber_key`(`representCiNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `relation_tables` (
    `idRelation` INTEGER NOT NULL,
    `representCiNumbers` VARCHAR(191) NOT NULL,
    `fichaId` VARCHAR(191) NOT NULL,
    `thirdPersonCiNumbers` VARCHAR(191) NOT NULL,
    `statusId` INTEGER NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `relation_tables_fichaId_key`(`fichaId`),
    UNIQUE INDEX `relation_tables_statusId_key`(`statusId`),
    UNIQUE INDEX `relation_tables_studentId_key`(`studentId`),
    PRIMARY KEY (`idRelation`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `health_info` (
    `idStatus` INTEGER NOT NULL,
    `typeAler` TEXT NULL,
    `operation` TEXT NULL,
    `enfermedades` TEXT NOT NULL,
    `conditionEsp` VARCHAR(191) NOT NULL,
    `asisMedica` VARCHAR(191) NOT NULL,
    `bloodType` VARCHAR(191) NOT NULL,
    `medicEsp` VARCHAR(191) NOT NULL,
    `infoMedic` VARCHAR(191) NOT NULL,
    `liveWith` VARCHAR(191) NOT NULL,
    `poseeHer` VARCHAR(191) NOT NULL,
    `levelHer` VARCHAR(191) NULL,
    `ageHer` VARCHAR(191) NULL,
    `preferComp` VARCHAR(191) NOT NULL,
    `creationGroup` VARCHAR(191) NOT NULL,
    `preferAct` TEXT NOT NULL,
    `recreTime` VARCHAR(191) NOT NULL,
    `transporte` VARCHAR(191) NOT NULL,
    `resOriStudent` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idStatus`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ins_info` (
    `idFicha` VARCHAR(191) NOT NULL,
    `level` VARCHAR(191) NOT NULL,
    `section` CHAR(1) NOT NULL,
    `procePlant` TEXT NOT NULL,
    `escolarPeriod` VARCHAR(191) NOT NULL,
    `InsDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `personalRes` TEXT NOT NULL,

    PRIMARY KEY (`idFicha`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `periodo_academico` (
    `age` YEAR NOT NULL,
    `periodo` VARCHAR(191) NOT NULL,
    `fecha_inicio` DATETIME(3) NOT NULL,
    `fecha_fin` DATETIME(3) NOT NULL,

    PRIMARY KEY (`periodo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asignaturas` (
    `idAsignatura` INTEGER NOT NULL,
    `nameAsignatura` VARCHAR(191) NOT NULL,
    `teacher` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idAsignatura`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notas` (
    `id` INTEGER NOT NULL,
    `idStudent` VARCHAR(191) NOT NULL,
    `asignatura` INTEGER NOT NULL,
    `ageAcademicos` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `idRol` INTEGER NOT NULL AUTO_INCREMENT,
    `nameRol` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idRol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `ciNumber` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NOT NULL DEFAULT 3,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_ciNumber_key`(`ciNumber`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_studentCiNumber_fkey` FOREIGN KEY (`studentCiNumber`) REFERENCES `persons`(`ciNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `third_person` ADD CONSTRAINT `third_person_thirdPersonCiNumber_fkey` FOREIGN KEY (`thirdPersonCiNumber`) REFERENCES `persons`(`ciNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `represent` ADD CONSTRAINT `represent_representCiNumber_fkey` FOREIGN KEY (`representCiNumber`) REFERENCES `persons`(`ciNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relation_tables` ADD CONSTRAINT `relation_tables_representCiNumbers_fkey` FOREIGN KEY (`representCiNumbers`) REFERENCES `represent`(`representCiNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relation_tables` ADD CONSTRAINT `relation_tables_fichaId_fkey` FOREIGN KEY (`fichaId`) REFERENCES `ins_info`(`idFicha`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relation_tables` ADD CONSTRAINT `relation_tables_thirdPersonCiNumbers_fkey` FOREIGN KEY (`thirdPersonCiNumbers`) REFERENCES `third_person`(`thirdPersonCiNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relation_tables` ADD CONSTRAINT `relation_tables_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `health_info`(`idStatus`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relation_tables` ADD CONSTRAINT `relation_tables_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`studentCiNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignaturas` ADD CONSTRAINT `asignaturas_teacher_fkey` FOREIGN KEY (`teacher`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notas` ADD CONSTRAINT `notas_idStudent_fkey` FOREIGN KEY (`idStudent`) REFERENCES `students`(`studentCiNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notas` ADD CONSTRAINT `notas_asignatura_fkey` FOREIGN KEY (`asignatura`) REFERENCES `asignaturas`(`idAsignatura`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notas` ADD CONSTRAINT `notas_ageAcademicos_fkey` FOREIGN KEY (`ageAcademicos`) REFERENCES `periodo_academico`(`periodo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`idRol`) ON DELETE RESTRICT ON UPDATE CASCADE;
