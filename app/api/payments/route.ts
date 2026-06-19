import { NextResponse } from "next/server";
import axios from "axios";
import { isDemo, demoPayments, summarize, type DemoPayment } from "@/lib/demo";

// Payments + summary stats. Demo mode serves mock data; a real key proxies
// PayMongo's GET /v1/payments and maps it into the table shape.
export async function POST(req: Request) {
  const { secretKey } = await req.json().catch(() => ({ secretKey: "" }));

  if (isDemo(secretKey)) {
    return NextResponse.json({
      payments: demoPayments,
      summary: summarize(demoPayments),
      demo: true,
    });
  }

  try {
    const auth = Buffer.from(`${secretKey}:`).toString("base64");
    const res = await axios.get("https://api.paymongo.com/v1/payments?limit=20", {
      headers: { accept: "application/json", authorization: `Basic ${auth}` },
    });
    const payments: DemoPayment[] = (res.data?.data ?? []).map((p: any) => ({
      id: p.id,
      amount: p.attributes?.amount ?? 0,
      currency: p.attributes?.currency ?? "PHP",
      status:
        p.attributes?.status === "paid"
          ? "paid"
          : (p.attributes?.refunds?.length ?? 0) > 0
          ? "refunded"
          : "failed",
      method: p.attributes?.source?.type ?? "card",
      description: p.attributes?.description ?? "",
      customer: p.attributes?.billing?.email ?? "",
      created_at: p.attributes?.created_at ?? 0,
    }));
    return NextResponse.json({ payments, summary: summarize(payments), demo: false });
  } catch {
    return NextResponse.json(
      { error: "Unable to fetch payments from PayMongo.", payments: [], summary: summarize([]) },
      { status: 502 }
    );
  }
}
