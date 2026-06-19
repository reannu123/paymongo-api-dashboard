"use client";
import { useEffect } from "react";
import Link from "next/link";
import { DataTable } from "@/components/data-tables/data-table";
import { columns } from "@/components/data-tables/webhooks/columns";
import { paymentColumns } from "@/components/data-tables/payments/columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import usePaymongo from "@/hooks/use-paymongo";
import { peso, pct } from "@/lib/format";
import { FlaskConical, Webhook, CreditCard, Receipt } from "lucide-react";

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
      {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

export default function HomePage() {
  const {
    secretKey,
    demoMode,
    isDemoData,
    payments,
    summary,
    webhooks,
    checkoutSession,
    setSecretKey,
    setDemoMode,
    sendCreateCheckoutSession,
    refreshAll,
  } = usePaymongo();

  const checkoutURL = checkoutSession?.attributes?.checkout_url || "";

  useEffect(() => {
    refreshAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 px-4 pt-6">
      <Heading
        title="PayMongo Operations Dashboard"
        description="Inspect payments, webhooks, and checkout sessions. Runs with demo data — no PayMongo account required."
      />

      {isDemoData && (
        <div className="flex items-center gap-2 rounded-lg border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm text-sky-700">
          <FlaskConical className="h-4 w-4" />
          <span>
            <strong>Demo mode.</strong> Showing realistic sample data. Toggle it off and paste a
            PayMongo secret key to use the live API.
          </span>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          variant={demoMode ? "default" : "outline"}
          onClick={() => setDemoMode(!demoMode)}
        >
          <FlaskConical className="mr-2 h-4 w-4" />
          Demo mode: {demoMode ? "ON" : "OFF"}
        </Button>
        <Input
          type="password"
          value={secretKey}
          disabled={demoMode}
          onChange={(e) => setSecretKey(e.target.value)}
          onBlur={() => !demoMode && refreshAll()}
          placeholder={demoMode ? "Demo mode — no key needed" : "Enter PayMongo secret key (sk_...)"}
          className="sm:w-1/2"
        />
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Gross volume" value={peso(summary.grossVolume)} sub={`${summary.paidCount} paid`} />
        <Stat label="Net volume" value={peso(summary.netVolume)} sub="after refunds" />
        <Stat label="Success rate" value={pct(summary.successRate)} sub="of attempts" />
        <Stat label="Payments" value={String(summary.totalCount)} sub="last 20" />
      </div>

      <Tabs defaultValue="payments" className="space-y-6">
        <TabsList>
          <TabsTrigger value="payments">
            <Receipt className="mr-1 h-4 w-4" /> Payments
          </TabsTrigger>
          <TabsTrigger value="webhooks">
            <Webhook className="mr-1 h-4 w-4" /> Webhooks
          </TabsTrigger>
          <TabsTrigger value="checkout-session">
            <CreditCard className="mr-1 h-4 w-4" /> Checkout
          </TabsTrigger>
        </TabsList>

        <TabsContent value="payments">
          <DataTable columns={paymentColumns} data={payments} searchKey="description" />
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Button variant="link" asChild className="px-0">
            <Link
              href="https://developers.paymongo.com/reference/webhook-resource"
              target="_blank"
              rel="noopener noreferrer"
            >
              Webhook API reference →
            </Link>
          </Button>
          <DataTable columns={columns} data={webhooks} searchKey="id" />
        </TabsContent>

        <TabsContent value="checkout-session" className="space-y-4">
          <Button variant="default" onClick={() => sendCreateCheckoutSession()}>
            Create checkout session
          </Button>
          {checkoutURL.length > 0 && (
            <div className="rounded-lg border bg-card p-4 text-sm">
              <div className="mb-1 text-muted-foreground">Checkout URL</div>
              <Link
                href={checkoutURL}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-sky-600 underline"
              >
                {checkoutURL}
              </Link>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
