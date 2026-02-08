export function formatDisplay(raw: string): string {
  const n = parseFloat(raw);
  if (isNaN(n)) return "0.00";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
