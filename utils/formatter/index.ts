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
