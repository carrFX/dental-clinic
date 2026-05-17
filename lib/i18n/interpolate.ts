export function interpolate(
  template: string,
  vars?: Record<string, string | number>
): string {
  if (!vars) return template;
  return Object.entries(vars).reduce(
    (str, [key, value]) => str.replaceAll(`{${key}}`, String(value)),
    template
  );
}
