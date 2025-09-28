import { Prisma } from "@prisma/client";
import z from "zod";
export const getFlagEmoji = (countryCode: string): string => {
  if (!/^[A-Z]{2}$/i.test(countryCode)) {
    throw new Error("Invalid country code. Must be a 2-letter ISO code.");
  }

  return countryCode
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(0x1f1e6 - 65 + char.charCodeAt(0)))
    .join("");
};

export const formatCurrency = (value: number | string) => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  return num.toFixed(2);
};

export function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function mapZodError(error: z.ZodError) {
  return error.flatten().fieldErrors;
}

export function countryCodeToFlag(code: string) {
  if (!code || code.length !== 2) return "";
  const upperCode = code.toUpperCase();
  const flag = upperCode
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
  return flag;
}

export const getPrismaErrorMessage = (error: unknown): string => {
  // PrismaClientKnownRequestError
  if (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    (typeof error === "object" &&
      error !== null &&
      "name" in error &&
      (error as { name: string }).name === "PrismaClientKnownRequestError")
  ) {
    const e = error as Prisma.PrismaClientKnownRequestError;
    const model = e.meta?.modelName ? ` on ${e.meta.modelName}` : "";
    const cause = e.meta?.cause ? `: ${e.meta.cause}` : "";
    return `Prisma Error ${e.code}${model}${cause}`;
  }

  // PrismaClientValidationError
  if (
    error instanceof Prisma.PrismaClientValidationError ||
    (typeof error === "object" &&
      error !== null &&
      "name" in error &&
      (error as { name: string }).name === "PrismaClientValidationError")
  ) {
    return `Prisma Validation Error: ${
      (error as Prisma.PrismaClientValidationError).message
    }`;
  }

  // Unknown error fallback
  if (typeof error === "object" && error !== null && "message" in error) {
    return (error as { message: string }).message;
  }

  return "Unknown Prisma error";
};
