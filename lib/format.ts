// Formatting helpers for money (PayMongo amounts are in centavos) and dates.
export const peso = (centavos: number) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(
    (centavos ?? 0) / 100
  );

export const pct = (ratio: number) => `${Math.round((ratio ?? 0) * 100)}%`;

export const shortDate = (epochSeconds: number) =>
  epochSeconds
    ? new Date(epochSeconds * 1000).toLocaleDateString("en-PH", {
        month: "short",
        day: "numeric",
      })
    : "—";
