import { NextResponse } from "next/server";
import { getWebhooks } from "@/lib/paymongo";
import { isDemo, demoWebhooks } from "@/lib/demo";

// Returns webhook list. Demo mode (no/empty/"demo" key) serves mock data so the
// dashboard works with no PayMongo account; a real key proxies the live API.
export async function POST(req: Request) {
  const { secretKey } = await req.json().catch(() => ({ secretKey: "" }));

  if (isDemo(secretKey)) {
    return NextResponse.json({ data: demoWebhooks, demo: true });
  }

  try {
    const res = await getWebhooks(secretKey);
    return NextResponse.json({ data: res?.data ?? [], demo: false });
  } catch {
    return NextResponse.json(
      { error: "Unable to fetch webhooks from PayMongo.", data: [] },
      { status: 502 }
    );
  }
}
