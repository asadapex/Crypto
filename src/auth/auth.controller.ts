import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { ResendOtpAuthDto } from './dto/resend-otp';
import { Request } from 'express';
import { AuthGuard } from 'src/jwtauth/jwtauth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('verify')
  verify(@Body() data: VerifyAuthDto) {
    return this.authService.verify(data);
  }

  @Post('resend-otp')
  resendOtp(@Body() data: ResendOtpAuthDto) {
    return this.authService.resendOtp(data);
  }

  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  findMe(@Req() req: Request) {
    return this.authService.findMe(req);
  }
}
