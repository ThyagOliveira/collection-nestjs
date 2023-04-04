import { ApiProperty } from '@nestjs/swagger';
import { User, UserType } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false, nullable: true })
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  type: UserType;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
