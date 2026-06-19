import { NextResponse } from "next/server";
import axios from "axios";
import { createOptions } from "@/lib/paymongo";
import { isDemo, demoCheckoutSession } from "@/lib/demo";

export async function POST(req: Request) {
  try {
    const { secretKey } = await req.json();

    // Demo mode: return a realistic mock session, no PayMongo account needed.
    if (isDemo(secretKey)) {
      return NextResponse.json(demoCheckoutSession);
    }

    const response = await axios.request(createOptions(secretKey));

    return NextResponse.json(response.data.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: "Unable to create PayMongo checkout session.",
          details: error.response?.data ?? error.message,
        },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json(
      { error: "Unexpected checkout-session error." },
      { status: 500 }
    );
  }
}
