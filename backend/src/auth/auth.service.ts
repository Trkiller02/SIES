import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RestorePasswordDto } from './dto/restore-password.dto';
import { conflict_err, unauth_err } from 'src/utils/handlerErrors';
import { msgEnum } from 'src/utils/handlerMsg';
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
    const user = await this.userService.findToAuth(query, true);

    if (!user) {
      unauth_err(msgEnum.credential_err, 'Crendenciales invalidas');
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid) {
      unauth_err(msgEnum.credential_err, 'Crendenciales invalidas');
    }

    const payload = {
      sub: user.id,
      role: user.role_id instanceof Role ? user.role_id.id : user.role_id,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      name: user.name,
      lastname: user.lastname,
      ci_number: user.ci_number,
      email: user.email,
      role: (user.role_id as Role).name,
      token: token,
    };
  }

  async restorePassword(updatePassword: RestorePasswordDto) {
    const { password, repeatPassword, restore_token, ci_number } =
      updatePassword;

    if (!restore_token) {
      return unauth_err(msgEnum.credential_err, 'Credenciales incorrectas.');
    }

    if (password !== repeatPassword) {
      return conflict_err(
        msgEnum.conflict_err,
        'Las contraseñas no coinciden.',
      );
    }

    const user = await this.userService.findToAuth(ci_number);

    const isValidToken = await bcrypt.compare(
      restore_token,
      user.restore_token,
    );

    if (!isValidToken) {
      return unauth_err(msgEnum.unauth_err, 'Credenciales incorrectas.');
    }

    return await this.userService.update(ci_number, { password });
  }
}
