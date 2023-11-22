import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RestorePasswordDto } from './dto/restore-password.dto';
import { User as UserModel } from '@prisma/client';
import { conflict_err, unauth_err } from 'src/utils/handlerErrors';
import { messagesEnum } from 'src/utils/handlerMsg';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerData: RegisterAuthDto) {
    return this.UserService.create(registerData);
  }

  async signIn({ email, ciNumber, password }: LoginAuthDto) {
    const user = await this.UserService.findToAuth(ciNumber, email);
    let rolePatcher: string;

    if (!user) {
      throw new UnauthorizedException('Crendenciales invalidas');
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid) {
      throw new UnauthorizedException('Contraseña invalida');
    }

    const payload = {
      sub: user.id,
      role: user.roleId,
    };

    switch (user.roleId) {
      case 1:
        rolePatcher = 'ADMINISTRADOR';
        break;
      case 2:
        rolePatcher = 'EDITOR';
        break;
      case 1:
        rolePatcher = 'USUARIO';
        break;
      default:
        rolePatcher = 'USUARIO';
        break;
    }

    const token = await this.jwtService.signAsync(payload);

    return {
      name: user.name,
      lastName: user.lastName,
      ciNumber: user.ciNumber,
      email: user.email,
      role: rolePatcher,
      token: token,
    };
  }

  async restorePassword(updatePassword: RestorePasswordDto) {
    const user = await this.UserService.findOne(updatePassword.ciNumber);

    const { password, repeatPassword, restoreToken } = updatePassword;

    if (!restoreToken) {
      return unauth_err(
        messagesEnum.unauth_err,
        'Credenciales incorrectas. (Token)',
      );
    }

    const HashToken = await bcrypt.compare(restoreToken, user.restoreToken);

    if (!HashToken) {
      return unauth_err(
        messagesEnum.unauth_err,
        'Credenciales incorrectas. (Token compa)',
      );
    }

    if (password !== repeatPassword) {
      return conflict_err(
        messagesEnum.conflict_err,
        'Las contraseñas no coinciden.',
      );
    }
    const id = updatePassword.ciNumber;

    delete updatePassword.repeatPassword;
    delete updatePassword.ciNumber;
    delete updatePassword.restoreToken;

    return await this.UserService.update(id, updatePassword);
  }
}
