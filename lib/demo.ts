// Demo-mode data so the dashboard is fully explorable with NO PayMongo account
// or secret key. All values are static (fixed timestamps) for deterministic
// rendering. The API routes return this whenever demo mode is active.
import type { WebhookData, CheckoutSession } from "@/lib/paymongo";

// A secret key of "" or this sentinel means "use demo data".
export const DEMO_KEY = "demo";
export function isDemo(secretKey?: string): boolean {
  return !secretKey || secretKey.trim() === "" || secretKey.trim() === DEMO_KEY;
}

const HOUR = 3600;
const BASE = 1_718_000_000; // fixed epoch (June 2024) for stable demo output

export const demoWebhooks: WebhookData[] = [
  {
    id: "hook_demo_Aa1",
    type: "webhook",
    attributes: {
      type: "webhook",
      livemode: false,
      secret_key: "whsk_demo_••••3kZ",
      status: "enabled",
      url: "https://shop.example.com/api/paymongo/webhook",
      events: ["checkout_session.payment.paid", "payment.paid"],
      previous_data: null,
      created_at: BASE - 240 * HOUR,
      updated_at: BASE - 12 * HOUR,
    },
  },
  {
    id: "hook_demo_Bb2",
    type: "webhook",
    attributes: {
      type: "webhook",
      livemode: false,
      secret_key: "whsk_demo_••••9mQ",
      status: "enabled",
      url: "https://ops.example.com/hooks/refunds",
      events: ["payment.refunded", "payment.failed"],
      previous_data: null,
      created_at: BASE - 600 * HOUR,
      updated_at: BASE - 30 * HOUR,
    },
  },
  {
    id: "hook_demo_Cc3",
    type: "webhook",
    attributes: {
      type: "webhook",
      livemode: false,
      secret_key: "whsk_demo_••••1xT",
      status: "disabled",
      url: "https://staging.example.com/api/paymongo/webhook",
      events: ["checkout_session.payment.paid"],
      previous_data: null,
      created_at: BASE - 900 * HOUR,
      updated_at: BASE - 200 * HOUR,
    },
  },
];

export type DemoPayment = {
  id: string;
  amount: number; // in centavos
  currency: string;
  status: "paid" | "failed" | "refunded";
  method: "card" | "gcash" | "paymaya" | "grab_pay";
  description: string;
  customer: string;
  created_at: number;
};

export const demoPayments: DemoPayment[] = [
  { id: "pay_demo_9f2", amount: 249900, currency: "PHP", status: "paid", method: "card", description: "Annual Plan", customer: "ana@example.com", created_at: BASE - 2 * HOUR },
  { id: "pay_demo_7c1", amount: 49900, currency: "PHP", status: "paid", method: "gcash", description: "Monthly Plan", customer: "ben@example.com", created_at: BASE - 5 * HOUR },
  { id: "pay_demo_4a8", amount: 120000, currency: "PHP", status: "paid", method: "paymaya", description: "Top-up", customer: "cara@example.com", created_at: BASE - 9 * HOUR },
  { id: "pay_demo_3b7", amount: 49900, currency: "PHP", status: "failed", method: "card", description: "Monthly Plan", customer: "dom@example.com", created_at: BASE - 14 * HOUR },
  { id: "pay_demo_2d5", amount: 80000, currency: "PHP", status: "paid", method: "grab_pay", description: "Gift Card", customer: "evy@example.com", created_at: BASE - 26 * HOUR },
  { id: "pay_demo_1e3", amount: 249900, currency: "PHP", status: "refunded", method: "card", description: "Annual Plan", customer: "finn@example.com", created_at: BASE - 40 * HOUR },
  { id: "pay_demo_0f9", amount: 49900, currency: "PHP", status: "paid", method: "gcash", description: "Monthly Plan", customer: "gia@example.com", created_at: BASE - 52 * HOUR },
];

export type PaymentsSummary = {
  grossVolume: number; // centavos, paid only
  netVolume: number; // gross minus refunded
  paidCount: number;
  totalCount: number;
  successRate: number; // 0..1 over non-refunded attempts
  byMethod: Record<string, number>;
};

export function summarize(payments: DemoPayment[]): PaymentsSummary {
  const paid = payments.filter((p) => p.status === "paid");
  const refunded = payments.filter((p) => p.status === "refunded");
  const attempts = payments.filter((p) => p.status !== "refunded");
  const grossVolume = paid.reduce((s, p) => s + p.amount, 0);
  const netVolume = grossVolume - refunded.reduce((s, p) => s + p.amount, 0);
  const byMethod: Record<string, number> = {};
  for (const p of paid) byMethod[p.method] = (byMethod[p.method] ?? 0) + p.amount;
  return {
    grossVolume,
    netVolume,
    paidCount: paid.length,
    totalCount: payments.length,
    successRate: attempts.length ? paid.length / attempts.length : 0,
    byMethod,
  };
}

export const demoCheckoutSession: CheckoutSession = {
  id: "cs_demo_Ks7Qe2",
  type: "checkout_session",
  attributes: {
    checkout_url: "https://checkout.paymongo.com/demo/cs_demo_Ks7Qe2",
    client_key: "cs_demo_Ks7Qe2_client_••••",
    reference_number: "demo-0001",
    status: "active",
    livemode: false,
    description: "Demo checkout session",
    line_items: [
      { name: "Pro Plan", quantity: 1, amount: 249900, currency: "PHP", images: [] },
    ],
    payment_method_types: ["card", "gcash", "paymaya", "grab_pay"],
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel",
    send_email_receipt: true,
    show_description: true,
    show_line_items: true,
    created_at: BASE,
    updated_at: BASE,
  } as unknown as CheckoutSession["attributes"],
};
