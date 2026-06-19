import { describe, it, expect } from "vitest";
import { summarize, isDemo, demoPayments, type DemoPayment } from "./demo";

const p = (over: Partial<DemoPayment>): DemoPayment => ({
  id: "x",
  amount: 1000,
  currency: "PHP",
  status: "paid",
  method: "card",
  description: "",
  customer: "",
  created_at: 0,
  ...over,
});

describe("isDemo", () => {
  it("treats empty / whitespace / 'demo' as demo mode", () => {
    expect(isDemo("")).toBe(true);
    expect(isDemo("   ")).toBe(true);
    expect(isDemo("demo")).toBe(true);
    expect(isDemo(undefined)).toBe(true);
  });
  it("treats a real-looking key as live mode", () => {
    expect(isDemo("sk_test_abc123")).toBe(false);
  });
});

describe("summarize", () => {
  it("computes gross/net volume, counts, success rate, and per-method totals", () => {
    const s = summarize([
      p({ status: "paid", amount: 1000, method: "card" }),
      p({ status: "paid", amount: 500, method: "gcash" }),
      p({ status: "failed", amount: 1000, method: "card" }),
      p({ status: "refunded", amount: 1000, method: "card" }),
    ]);
    expect(s.grossVolume).toBe(1500); // paid only
    expect(s.netVolume).toBe(500); // gross - refunded
    expect(s.paidCount).toBe(2);
    expect(s.totalCount).toBe(4);
    expect(s.successRate).toBeCloseTo(2 / 3); // 2 paid of 3 non-refunded attempts
    expect(s.byMethod).toEqual({ card: 1000, gcash: 500 });
  });

  it("handles an empty list without dividing by zero", () => {
    const s = summarize([]);
    expect(s).toMatchObject({ grossVolume: 0, netVolume: 0, paidCount: 0, totalCount: 0, successRate: 0 });
  });

  it("summarizes the shipped demo dataset consistently", () => {
    const s = summarize(demoPayments);
    expect(s.totalCount).toBe(demoPayments.length);
    expect(s.netVolume).toBeLessThanOrEqual(s.grossVolume);
    expect(s.successRate).toBeGreaterThan(0);
    expect(s.successRate).toBeLessThanOrEqual(1);
  });
});
