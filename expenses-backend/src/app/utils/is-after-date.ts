import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function IsAfterDate(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsAfterDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value, validationArguments: ValidationArguments) {
          const [relatedPropertyName] = validationArguments.constraints;
          const relatedValue = (validationArguments.object as any)[
            relatedPropertyName
          ];
          if (value === undefined || relatedValue === undefined) {
            return true;
          }
          return (
            value instanceof Date &&
            relatedValue instanceof Date &&
            value.getTime() > relatedValue.getTime()
          );
        },
        defaultMessage: (validationArguments: ValidationArguments) => {
          const [relatedPropertyName] = validationArguments.constraints;
          return `${propertyName} must be after ${relatedPropertyName}`;
        },
      },
    });
  };
}
