import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserModel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { conflict_err, not_found_err } from 'src/utils/handlerErrors';
import { messagesEnum } from 'src/utils/handlerMsg';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(userCreateData: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { ciNumber: { equals: userCreateData.ciNumber } },
          { email: { equals: userCreateData.email } },
        ],
      },
      select: {
        id: true,
      },
    });

    if (user)
      conflict_err(messagesEnum.conflict_err, 'El usuario ya está registrado.');

    const passHashed = await bcrypt.hash(userCreateData.password, 10);
    userCreateData.password = passHashed;

    return await this.prisma.user.create({
      data: {
        ...userCreateData,
        roleId: undefined,
      },
    });
  }

  async findAll(): Promise<UserModel[]> {
    const users = await this.prisma.user.findMany();

    if (users.length === 0) {
      not_found_err(messagesEnum.not_found, 'No existen usuarios.');
    }

    return users;
  }

  async findToAuth(ciNumber?: string, email?: string): Promise<UserModel> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ ciNumber: { equals: ciNumber } }, { email: { equals: email } }],
      },
    });

    if (!user) not_found_err(messagesEnum.not_found, 'Usuario no encontrado.');

    return user;
  }

  async findOne(id: string): Promise<UserModel> {
    const user = await this.prisma.user.findFirst({
      where: {
        ciNumber: id,
      },
      include: {
        role: true,
      },
    });

    if (!user) not_found_err(messagesEnum.not_found, 'Usuario no encontrado.');

    return user;
  }

  // ... ...
  async update(
    ciNumber: string,
    updateData: UpdateUserDto,
  ): Promise<UserModel> {
    const user = await this.findOne(ciNumber);

    /* 
    DESESTRUCTURAMOS EL OBJETO PARA ACTUALIZAR
    EN ESTE CASO NOS INTERESA POR SI HAY UNA CONTRASEÑA
    O UN TOKEN DE RESTAURACION
    */
    const { password, restoreToken } = updateData;

    // SI EXITEN VALORES PARA ESTAS VARIABLES
    // SE REALIZA LA ENCRIPTACION
    if (password) {
      /* 
      ENCRIPTAMOS LA NUEVA CONTRASEÑA 
      E INYECTAMOS LOS DATOS EN EL  OBJETO DE ACTUALIZACION
      */
      const passHashed = await bcrypt.hash(password, 10);
      updateData.password = passHashed;
    }

    if (restoreToken) {
      const rTokenHashed = await bcrypt.hash(restoreToken, 10);
      updateData.password = rTokenHashed;
    }

    // MANDAMOS EL OBJETO ACTUALIZADO
    return await this.prisma.user.update({
      where: user,
      data: updateData,
    });
  }
  // ... ...

  async remove(ciNumber: string) {
    const user = await this.findOne(ciNumber);

    return await this.prisma.user.delete({
      where: user,
    });
  }
}
