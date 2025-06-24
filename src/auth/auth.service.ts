import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { totp } from 'otplib';
import { MailerService } from 'src/mailer/mailer.service';
import { UserStatus } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ResendOtpAuthDto } from './dto/resend-otp';
import { Request } from 'express';

totp.options = {
  step: 120,
  digits: 5,
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailerService,
    private readonly jwt: JwtService,
  ) {}

  async findUser(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  generateOtpHtml(code: string): string {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #4CAF50; text-align: center;">🔐 Service</h2>
      <p style="font-size: 16px;">Assalomu alaykum,</p>
      <p style="font-size: 16px;">Sizning bir martalik parolingiz (OTP):</p>
      <div style="font-size: 30px; font-weight: bold; color: #333; text-align: center; margin: 20px 0;">
        ${code}
      </div>
      <p style="font-size: 14px; color: #555;">Kod 2 daqiqa davomida amal qiladi. Kodni hech kim bilan bo'lishmang.</p>
      <hr />
      <p style="font-size: 12px; color: #999;">Agar bu xabar siz kutmagan bo‘lsangiz, iltimos, e'tiborsiz qoldiring.</p>
    </div>
    `;
  }

  async create(data: CreateAuthDto) {
    const user = await this.findUser(data.email);
    if (user) {
      throw new BadRequestException({ message: 'User already exists' });
    }

    try {
      const hash = bcrypt.hashSync(data.password, 10);
      await this.prisma.user.create({
        data: { ...data, password: hash, status: UserStatus.PENDING },
      });

      const otp = totp.generate(data.email + 'apex');
      await this.mailService.sendMail(
        data.email,
        '🔐 Your OTP Code',
        this.generateOtpHtml(`${otp}`),
      );
      return { message: 'Verification code sent to your email' };
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error;
      }
      console.log(error);
    }
  }

  async verify(data: VerifyAuthDto) {
    try {
      const user = await this.findUser(data.email);
      if (!user) {
        throw new NotFoundException({ message: 'User not found' });
      }
      const match = totp.verify({
        token: data.otp,
        secret: data.email + 'apex',
      });
      if (!match) {
        throw new BadRequestException({ message: 'Wrong credentials' });
      }
      await this.prisma.user.update({
        where: { email: data.email },
        data: { status: UserStatus.ACTIVE },
      });
      return { message: 'Verified' };
    } catch (err) {
      if (err != InternalServerErrorException) {
        throw err;
      }
      console.log(err);
    }
  }

  async resendOtp(dto: ResendOtpAuthDto) {
    try {
      const user = await this.findUser(dto.email);
      if (!user) {
        throw new NotFoundException({ message: 'User not found' });
      }

      const otp = totp.generate(dto.email + 'apex');
      await this.mailService.sendMail(
        dto.email,
        '🔐 Your OTP Code',
        this.generateOtpHtml(`${otp}`),
      );

      return { message: 'Verification code sent to your email' };
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException({
        message: 'Something went wrong',
      });
    }
  }

  async login(data: CreateAuthDto) {
    const user = await this.findUser(data.email);
    if (!user) {
      throw new NotFoundException({ message: 'User not found' });
    }

    try {
      const match = bcrypt.compareSync(data.password, user.password);
      if (!match) {
        throw new BadRequestException({ message: 'Wrong credentials' });
      }
      if (user.status === UserStatus.PENDING) {
        throw new BadRequestException({ message: 'User has not verified' });
      }

      const token = this.jwt.sign({ id: user.id });
      return { token };
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error;
      }
      console.log(error);
    }
  }

  async findMe(req: Request) {
    const user = await this.prisma.user.findUnique({
      where: { id: req['user-id'] },
      include: {
        cards: true,
      },
    });

    if (!user) throw new NotFoundException({ message: 'User not found' });

    return {
      email: user.email,
      btc: user.btc,
      monthlyProfit: user.monthlyProfit,
      cards: user.cards.map((card) => ({
        type: card.type,
        createdAt: card.createdAt,
      })),
    };
  }
}
