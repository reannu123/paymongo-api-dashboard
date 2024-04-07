"use client";
import { useState } from "react";
import {
  getWebhooks,
  WebhookData,
  enableWebhook,
  disableWebhook,
} from "@/lib/paymongo";
import { DataTable } from "@/components/data-tables/data-table";
import { columns } from "../../../components/data-tables/webhooks/columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import usePaymongo from "@/hooks/use-paymongo";

export default function HomePage() {
  const paymongo = usePaymongo();
  const secretKey = usePaymongo((state) => state.secretKey);

  return (
    <div className="flex items-center justify-center pt-6">
      <div className=" w-3/4">
        <div className="flex space-x-2">
          <Input
            type="password"
            value={secretKey}
            onChange={(e) => paymongo.setSecretKey(e.target.value)}
            placeholder="Enter secret key"
          />
          <Button
            type="submit"
            variant={"default"}
            onClick={() => paymongo.sendGetWebhooks()}
          >
            Get Webhooks
          </Button>
        </div>
        <DataTable
          columns={columns}
          data={paymongo.webhooks}
          searchKey="id"
        />
      </div>
    </div>
  );
}
