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
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          OR: [
            { ciNumber: { equals: userCreateData.ciNumber } },
            { email: { equals: userCreateData.email } },
          ],
        },
      });

      if (user) {
        throw new ConflictException('User already exists');
      }

      const passHashed = await bcrypt.hash(userCreateData.password, 10);
      userCreateData.password = passHashed;

      return await this.prisma.user.create({
        data: userCreateData,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<UserModel[] | Error> {
    try {
      const users = await this.prisma.user.findMany();

      if (users.length === 0) {
        throw new NotFoundException();
      }

      return users;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async findToAuth(ciNumber?: string, email?: string): Promise<UserModel> {
    try {
      const user = await this.prisma.user.findFirstOrThrow({
        where: {
          OR: [
            { ciNumber: { equals: ciNumber } },
            { email: { equals: email } },
          ],
        },
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string): Promise<UserModel | Error> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          ciNumber: id,
        },
        include: {
          role: true,
        },
      });
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(
    id: string,
    updateData: UpdateUserDto,
  ): Promise<UserModel | Error> {
    try {
      const { password } = updateData;
      if (password) {
        const passHashed = await bcrypt.hash(password, 10);
        updateData.password = passHashed;
      }

      const userUpdated = await this.prisma.user.update({
        where: { ciNumber: id },
        data: updateData,
      });
      return userUpdated;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
