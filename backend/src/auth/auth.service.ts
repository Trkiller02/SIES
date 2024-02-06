import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RestorePasswordDto } from './dto/restore-password.dto';
import { conflict_err, unauth_err } from 'src/utils/handlerErrors';
import { messagesEnum } from 'src/utils/handlerMsg';
import { UserService } from 'src/user/user.service';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerData: RegisterAuthDto) {
    return this.userService.create(registerData);
  }

  async signIn({ query, password }: LoginAuthDto) {
    const user = await this.userService.findToAuth(query);

    if (!user) {
      throw new UnauthorizedException('Crendenciales invalidas');
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid) {
      throw new UnauthorizedException('Contraseña invalida');
    }

    const payload = {
      sub: user.id,
      role: user.role_id instanceof Role ? user.role_id.id : user.role_id,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      name: user.name,
      lastName: user.lastname,
      ci_number: user.ci_number,
      email: user.email,
      role: user.role_id instanceof Role ? user.role_id.name : user.role_id,
      token: token,
    };
  }

  async restorePassword(updatePassword: RestorePasswordDto) {
    const user = await this.userService.findOne(updatePassword.ci_number);

    const { password, repeatPassword, restore_token } = updatePassword;

    if (!restore_token) {
      return unauth_err(
        messagesEnum.unauth_err,
        'Credenciales incorrectas. (Token)',
      );
    }

    const HashToken = await bcrypt.compare(restore_token, user.restore_token);

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
    const id = updatePassword.ci_number;

    delete updatePassword.repeatPassword;
    delete updatePassword.ci_number;
    delete updatePassword.restore_token;

    return await this.userService.update(id, updatePassword);
  }
}
