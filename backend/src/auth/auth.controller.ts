import { Controller, Post, Body, Get, Request, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RestorePasswordDto } from './dto/restore-password.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActiveUser } from './decorators/active_user.decorator';
import { Auth } from './decorators/auth.decorator';

@ApiTags('AUTH:')
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

  @Patch('forgot-password')
  forgotPassword(@Body() updatePassword: RestorePasswordDto) {
    return this.authService.restorePassword(updatePassword);
  }

  @ApiBearerAuth()
  @Auth()
  @Get('logout')
  logout(@ActiveUser() user: { sub: string }) {
    return this.authService.signOut(user);
  }
}
