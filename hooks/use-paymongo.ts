import { create } from "zustand";
import {
  enableWebhook,
  disableWebhook,
  getWebhooks,
  WebhookData,
} from "@/lib/paymongo";

interface PaymongoStore {
  sendEnableWebhook: (id: string) => Promise<void>;
  sendDisableWebhook: (id: string) => Promise<void>;
  sendGetWebhooks: () => Promise<void>;
  setSecretKey: (secretKey: string) => void;
  secretKey: string;
  webhooks: WebhookData[];
}
// Define your store
const usePaymongo = create<PaymongoStore>((set, get) => ({
  secretKey: "",
  sendEnableWebhook: async (id: string) => {
    const { secretKey } = get();
    await enableWebhook(id, secretKey);
  },

  sendDisableWebhook: async (id: string) => {
    const { secretKey } = get();
    await disableWebhook(id, secretKey);
  },

  sendGetWebhooks: async () => {
    const { secretKey } = get();
    const webhooks = await getWebhooks(secretKey);
    const data: WebhookData[] = webhooks.data;
    set({ webhooks: data });
  },

  setSecretKey: (secretKey: string) => set({ secretKey }),

  webhooks: [] as WebhookData[],
}));

export default usePaymongo;
