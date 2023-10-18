import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { unauth_err } from 'src/utils/handlerErrors';
import { messagesEnum } from 'src/utils/handlerMsg';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extratcTokenFromHeader(request);

    if (!token) {
      unauth_err(
        messagesEnum.unauth_err,
        'No esta autorizado para realizar la peticion.',
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      request.user = payload;
    } catch {
      unauth_err(
        messagesEnum.unauth_err,
        'No esta autorizado para realizar la peticion.',
      );
    }

    return true;
  }

  private extratcTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
