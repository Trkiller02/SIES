import { Controller, Post, Body, Get, Request, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Role } from '../role/enum/roles.enum';
import { Auth } from './decorators/auth.decorator';
import { RestorePasswordDto } from './dto/restore-password.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('AUTH:')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthDto: RegisterAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginAuthDto) {
    return this.authService.signIn(loginDto);
  }

  @Get('profile')
  @Auth([Role.DOCENTES])
  profile(@Request() request) {
    return request.user;
  }

  @Put('forgot-password')
  forgotPassword(@Body() updatePassword: RestorePasswordDto) {
    return this.authService.restorePassword(updatePassword);
  }
}
