import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Role } from './enum/roles.enum';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: RegisterAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() createAuthDto: LoginAuthDto) {
    return this.authService.signIn(createAuthDto);
  }

  @Get('profile')
  @Auth([Role.EDITOR])
  profile(@Request() request) {
    return request.user;
  }
}
