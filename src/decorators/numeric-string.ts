import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPositiveNumericString(validationOptions?: ValidationOptions) {
    return function (object: unknown, propertyName: string) {
        registerDecorator({
            name: 'isNumericString',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: unknown) {
                    return typeof value === 'string' && /^[0-9]+$/.test(value);
                },
                defaultMessage: (value) => `${value.property} must be a numeric string`,
            },
        });
    };
}
