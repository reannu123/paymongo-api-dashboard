"use client";
import { DataTable } from "@/components/data-tables/data-table";
import { columns } from "../../../components/data-tables/webhooks/columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import usePaymongo from "@/hooks/use-paymongo";
import { Heading } from "@/components/ui/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function HomePage() {
  const paymongo = usePaymongo();
  const secretKey = usePaymongo((state) => state.secretKey);
  const checkoutURL = usePaymongo(
    (state) => state.checkoutSession?.attributes?.checkout_url || ""
  );

  return (
    <div className="flex items-center justify-center pt-6">
      <div className="space-y-8 w-3/4">
        <Heading
          title="Paymongo Developer Tool"
          description="Tool for testing Paymongo Keys for payment gateway integration."
        />
        <div className="w-full flex items-center justify-center">
          <Input
            type="password"
            value={secretKey}
            onChange={(e) => paymongo.setSecretKey(e.target.value)}
            placeholder="Enter secret key"
            className="w-1/2"
          />
        </div>

        <Tabs
          defaultValue="webhooks"
          className="space-y-8"
        >
          <div className="flex flex-col items-center justify-center w-full">
            <TabsList>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              <TabsTrigger value="checkout-session">
                Checkout Session
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="webhooks"
            className="space-y-8"
          >
            <div className="space-x-4">
              <Button
                type="submit"
                variant={"default"}
                onClick={() => paymongo.sendGetWebhooks()}
              >
                Get Webhooks
              </Button>
              <Button
                type="submit"
                variant={"outline"}
                onClick={() => paymongo.sendGetWebhooks()}
              >
                Create Webhook
              </Button>
              <Button
                variant={"link"}
                asChild
              >
                <Link
                  href="https://developers.paymongo.com/reference/webhook-resource"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  API Reference
                </Link>
              </Button>
            </div>
            <DataTable
              columns={columns}
              data={paymongo.webhooks}
              searchKey="id"
            />
          </TabsContent>
          <TabsContent value="checkout-session">
            <div>
              <Button
                type="submit"
                variant={"default"}
                onClick={() => paymongo.sendCreateCheckoutSession()}
              >
                Test Checkout Session
              </Button>
              <div>
                {checkoutURL.length > 0 && (
                  <Button
                    variant={"link"}
                    asChild
                  >
                    <Link
                      href={checkoutURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {checkoutURL}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/*  */}
      </div>
    </div>
  );
}
