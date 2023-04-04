import { ApiProperty } from '@nestjs/swagger';
import { User, UserType } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false, nullable: true })
  name: string | null;

  @ApiProperty()
  @Exclude()
  password: string;

  @ApiProperty()
  type: UserType;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
