import { SetMetadata } from '@nestjs/common';
import { UserType } from '@prisma/client';

export const UserTypes = (...type: UserType[]) => SetMetadata('type', type);
