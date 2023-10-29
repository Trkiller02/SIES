import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

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

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '12h',
    });

    return {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: rolePatcher,
      token: token,
    };
  }
}
