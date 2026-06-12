import { create } from "zustand";
import {
  enableWebhook,
  disableWebhook,
  getWebhooks,
  WebhookData,
  CheckoutSession,
} from "@/lib/paymongo";

interface PaymongoStore {
  sendEnableWebhook: (id: string) => Promise<void>;
  sendDisableWebhook: (id: string) => Promise<void>;
  sendCreateWebhook: (url: string, events: string[]) => Promise<void>;
  sendCreateCheckoutSession: () => Promise<void>;
  sendGetWebhooks: () => Promise<void>;
  setSecretKey: (secretKey: string) => void;
  secretKey: string;
  checkoutSession?: CheckoutSession;
  webhooks: WebhookData[];
}
// Define your store
const usePaymongo = create<PaymongoStore>((set, get) => ({
  secretKey: "",
  checkoutSession: {} as CheckoutSession,
  sendEnableWebhook: async (id: string) => {
    const { secretKey, sendGetWebhooks } = get();
    await enableWebhook(id, secretKey);
    sendGetWebhooks();
  },

  sendDisableWebhook: async (id: string) => {
    const { secretKey, sendGetWebhooks } = get();
    await disableWebhook(id, secretKey);
    sendGetWebhooks();
  },

  sendGetWebhooks: async () => {
    const { secretKey } = get();
    if (!secretKey) return;
    const webhooks = await getWebhooks(secretKey);
    const data: WebhookData[] = webhooks.data;
    set({ webhooks: data });
  },

  sendCreateWebhook: async (url: string, events: string[]) => {},

  sendCreateCheckoutSession: async () => {
    const { secretKey } = get();
    if (!secretKey) return;
    const response = await fetch("/api/checkout-sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ secretKey }),
    });

    if (!response.ok) {
      console.error(await response.json());
      return;
    }

    const checkoutSession = (await response.json()) as CheckoutSession;
    set({ checkoutSession });
  },

  setSecretKey: (secretKey: string) => set({ secretKey }),

  webhooks: [] as WebhookData[],
}));

export default usePaymongo;
