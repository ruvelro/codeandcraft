export function formatStars(value: number): string {
  return new Intl.NumberFormat('es-ES').format(value);
}
