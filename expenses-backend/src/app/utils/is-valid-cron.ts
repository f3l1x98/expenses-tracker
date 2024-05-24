import { ValidationOptions, registerDecorator } from 'class-validator';
import cron from 'cron-validate';

export function IsValidCron(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value, validationArguments) {
          return typeof value === 'string' && cron(value).isValid();
        },
      },
    });
  };
}
