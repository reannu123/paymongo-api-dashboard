import { create } from "zustand";
import {
  enableWebhook,
  disableWebhook,
  WebhookData,
  CheckoutSession,
} from "@/lib/paymongo";
import { summarize, type DemoPayment, type PaymentsSummary } from "@/lib/demo";

interface PaymongoStore {
  secretKey: string;
  demoMode: boolean;
  webhooks: WebhookData[];
  payments: DemoPayment[];
  summary: PaymentsSummary;
  checkoutSession?: CheckoutSession;
  isDemoData: boolean;
  loading: boolean;
  setSecretKey: (secretKey: string) => void;
  setDemoMode: (demoMode: boolean) => void;
  sendGetWebhooks: () => Promise<void>;
  sendGetPayments: () => Promise<void>;
  sendCreateCheckoutSession: () => Promise<void>;
  sendEnableWebhook: (id: string) => Promise<void>;
  sendDisableWebhook: (id: string) => Promise<void>;
  refreshAll: () => Promise<void>;
}

// The key the API routes see: empty (=> demo data) when demo mode is on.
function effectiveKey(state: { demoMode: boolean; secretKey: string }) {
  return state.demoMode ? "" : state.secretKey;
}

async function postJson(url: string, secretKey: string) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secretKey }),
  });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.json();
}

const usePaymongo = create<PaymongoStore>((set, get) => ({
  secretKey: "",
  demoMode: true,
  webhooks: [],
  payments: [],
  summary: summarize([]),
  checkoutSession: {} as CheckoutSession,
  isDemoData: true,
  loading: false,

  setSecretKey: (secretKey) => set({ secretKey }),
  setDemoMode: (demoMode) => {
    set({ demoMode });
    get().refreshAll();
  },

  sendGetWebhooks: async () => {
    try {
      const json = await postJson("/api/webhooks", effectiveKey(get()));
      set({ webhooks: json.data ?? [], isDemoData: !!json.demo });
    } catch (e) {
      console.error(e);
      set({ webhooks: [] });
    }
  },

  sendGetPayments: async () => {
    try {
      const json = await postJson("/api/payments", effectiveKey(get()));
      set({
        payments: json.payments ?? [],
        summary: json.summary ?? summarize([]),
        isDemoData: !!json.demo,
      });
    } catch (e) {
      console.error(e);
      set({ payments: [], summary: summarize([]) });
    }
  },

  sendCreateCheckoutSession: async () => {
    try {
      const checkoutSession = (await postJson(
        "/api/checkout-sessions",
        effectiveKey(get())
      )) as CheckoutSession;
      set({ checkoutSession });
    } catch (e) {
      console.error(e);
    }
  },

  sendEnableWebhook: async (id) => {
    const { demoMode, secretKey, sendGetWebhooks } = get();
    if (demoMode) return; // demo webhooks are read-only
    await enableWebhook(id, secretKey);
    sendGetWebhooks();
  },
  sendDisableWebhook: async (id) => {
    const { demoMode, secretKey, sendGetWebhooks } = get();
    if (demoMode) return;
    await disableWebhook(id, secretKey);
    sendGetWebhooks();
  },

  refreshAll: async () => {
    set({ loading: true });
    await Promise.all([get().sendGetWebhooks(), get().sendGetPayments()]);
    set({ loading: false });
  },
}));

export default usePaymongo;
