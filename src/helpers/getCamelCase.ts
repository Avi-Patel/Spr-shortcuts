export const getCamelCase = (s: string): string =>
  `${s.slice(0, 1).toLowerCase()}${s.slice(1)}`;
