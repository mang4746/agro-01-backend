import { Transform } from 'class-transformer';
import { IsDate } from 'class-validator';

const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

const toDate = (value: unknown): unknown => {
  if (value instanceof Date) {
    return value;
  }

  if (value === null) {
    return null;
  }

  if (
    typeof value === 'number' ||
    (typeof value === 'string' && /^-?\d+(\.\d+)?$/.test(value))
  ) {
    const date = new Date(Number(value));
    return Number.isNaN(date.getTime()) ? new Date(Number.NaN) : date;
  }

  if (typeof value !== 'string') {
    return value;
  }

  const dateOnlyMatch = DATE_ONLY_PATTERN.exec(value);
  if (dateOnlyMatch) {
    const year = Number(dateOnlyMatch[1]);
    const month = Number(dateOnlyMatch[2]);
    const day = Number(dateOnlyMatch[3]);
    const date = new Date(year, month - 1, day);

    if (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    ) {
      return date;
    }

    return new Date(Number.NaN);
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date(Number.NaN) : date;
};

export const FlexibleDate = (): PropertyDecorator => {
  return (target, propertyKey) => {
    Transform(({ value }) => toDate(value))(target, propertyKey);
    IsDate()(target, propertyKey);
  };
};