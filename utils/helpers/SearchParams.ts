export const filteredParams = <T extends Record<string, any>>(params: T) => {
  return Object.fromEntries(
    Object.entries(params)
      .filter(
        ([, value]) =>
          value !== undefined &&
          value !== null &&
          !(typeof value === "string" && value.trim() === "")
      )
      .map(([key, value]) => [key, String(value)])
  ) as Record<string, string>;
};
