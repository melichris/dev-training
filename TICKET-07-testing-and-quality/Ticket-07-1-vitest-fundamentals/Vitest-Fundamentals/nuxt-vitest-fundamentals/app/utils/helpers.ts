export function formatUsername(name: string): string {
  return name.trim().toLowerCase();
}

export function isValidId(id: number): boolean {
  return Number.isInteger(id) && id > 0;
}

export function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
