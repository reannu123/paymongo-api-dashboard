"use client";
import { useState } from "react";
import { getWebhooks, WebhookData } from "@/lib/paymongo";
import { DataTable } from "@/components/data-tables/data-table";
import { columns } from "../../../components/data-tables/webhooks/columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [secretKey, setSecretKey] = useState("");
  const [webhooks, setWebhooks] = useState<WebhookData[]>([]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const webhooks = await getWebhooks(secretKey);
    const data: WebhookData[] = webhooks.data;
    setWebhooks(data);
  };

  return (
    <div className="flex items-center justify-center pt-6">
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-2">
            <Input
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="Enter secret key"
            />
            <Button
              type="submit"
              variant={"default"}
            >
              Submit
            </Button>
          </div>
        </form>
        <DataTable
          columns={columns}
          data={webhooks}
          searchKey="url"
        />
      </div>
    </div>
  );
}
