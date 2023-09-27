import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserModel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

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
    });

    if (user) {
      throw new ConflictException('El usuario ya existe');
    }

    const passHashed = await bcrypt.hash(userCreateData.password, 10);
    userCreateData.password = passHashed;

    return await this.prisma.user.create({
      data: userCreateData,
    });
  }

  async findAll(): Promise<UserModel[]> {
    const users = await this.prisma.user.findMany();

    if (users.length === 0) {
      throw new NotFoundException('No existen usuarios');
    }

    return users;
  }

  async findToAuth(ciNumber?: string, email?: string): Promise<UserModel> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ ciNumber: { equals: ciNumber } }, { email: { equals: email } }],
      },
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');

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

    if (!user) throw new NotFoundException('Usuario no encontrado');

    return user;
  }

  async update(
    ciNumber: string,
    updateData: UpdateUserDto,
  ): Promise<UserModel> {
    const id = await this.prisma.user.findFirst({
      where: { ciNumber },
      select: { id: true },
    });

    if (!id) throw new NotFoundException('Usuario no encontrado');

    const { password } = updateData;
    if (password) {
      const passHashed = await bcrypt.hash(password, 10);
      updateData.password = passHashed;
    }

    return await this.prisma.user.update({
      where: id,
      data: updateData,
    });
  }

  async remove(ciNumber: string) {
    const id = await this.prisma.user.findFirst({
      where: { ciNumber: ciNumber },
      select: { id: true },
    });

    if (!id) throw new NotFoundException('Usuario no encontrado');

    return await this.prisma.user.delete({
      where: id,
    });
  }
}
