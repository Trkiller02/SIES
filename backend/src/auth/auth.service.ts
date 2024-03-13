import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RestorePasswordDto } from './dto/restore-password.dto';
import { bad_req_err, conflict_err, unauth_err } from 'src/utils/handlerErrors';
import { msgEnum } from 'src/utils/handlerMsg';
import { UserService } from 'src/user/user.service';
import { Role } from 'src/role/entities/role.entity';
import { StatusEnum } from 'src/user/enum/status.enum';

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

    if (user.status === StatusEnum.ACTIVE) {
      unauth_err(msgEnum.session_error, 'Ya existe un usuario activo.');
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

    await this.userService.update(user.id, { status: StatusEnum.ACTIVE });

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

  async signOut(user: { sub: string }) {
    try {
      await this.userService.update(user.sub, { status: StatusEnum.OFFLINE });
      return { message: 'Cierre de sesión con exito.' };
    } catch (error) {
      return bad_req_err(msgEnum.bad_req_err, (error as Error).message);
    }
  }
}
