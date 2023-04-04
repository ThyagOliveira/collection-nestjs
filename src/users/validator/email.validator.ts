import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailValidator implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const user = await this.usersService.findOneByEmail(value);
    return !user;
  }
}

export const EmailUnique = (validationOptions: ValidationOptions) => {
  return (item: Object, property: string) => {
    registerDecorator({
      target: item.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: EmailValidator,
    });
  };
};
