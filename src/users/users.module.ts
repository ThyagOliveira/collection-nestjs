import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailValidator } from './validator/email.validator';

@Module({
  controllers: [UsersController],
  providers: [UsersService, EmailValidator],
  imports: [PrismaModule],
})
export class UsersModule {}
