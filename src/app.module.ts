import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailerService } from './mailer/mailer.service';
import { StoreModule } from './store/store.module';
import { MiningModule } from './mining/mining.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    StoreModule,
    MiningModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, MailerService],
})
export class AppModule {}
